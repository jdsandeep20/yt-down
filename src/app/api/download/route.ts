import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';

// Import ytdl-core types properly
import type { videoInfo, downloadOptions, videoFormat } from '@distube/ytdl-core';

interface DownloadRequest {
  url: string;
  format?: {
    quality: string;
    format: string;
    itag?: number;
    type?: string;
  };
}

// Dynamic import for Railway compatibility
const getYtdl = async () => {
  try {
    const { default: ytdl } = await import('@distube/ytdl-core');
    return ytdl;
  } catch (error) {
    console.error('Failed to import ytdl-core:', error);
    return null;
  }
};

// Helper to sanitize filename
const sanitizeFilename = (title: string): string => {
  return title
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .substring(0, 80)
    .replace(/\s+/g, '_');
};

// Helper to choose the best format for video+audio
const chooseBestFormat = async (info: videoInfo, requestedQuality?: string): Promise<videoFormat | null> => {
  const ytdl = await getYtdl();
  if (!ytdl) return null;

  try {
    // For audio only requests
    if (requestedQuality === 'Audio Only') {
      return ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
    }

    // If specific quality requested, try to match it
    if (requestedQuality && requestedQuality !== 'Audio Only') {
      const qualityNumber = parseInt(requestedQuality.replace('p', ''));

      // Find formats with both video and audio
      const combinedFormats = info.formats.filter(format =>
        format.hasVideo &&
        format.hasAudio &&
        format.height
      );

      if (combinedFormats.length > 0) {
        // Try to find exact quality match
        const exactMatch = combinedFormats.find(format =>
          format.height === qualityNumber
        );

        if (exactMatch) return exactMatch;

        // Otherwise get closest quality
        const closest = combinedFormats.reduce((prev, curr) => {
          const prevDiff = Math.abs((prev.height || 0) - qualityNumber);
          const currDiff = Math.abs((curr.height || 0) - qualityNumber);
          return currDiff < prevDiff ? curr : prev;
        });

        return closest;
      }
    }

    // Default: try to get highest quality with video+audio
    const combined = ytdl.chooseFormat(info.formats, {
      quality: 'highest',
      filter: 'audioandvideo'
    });

    if (combined) return combined;

    // Fallback: get highest video quality
    return ytdl.chooseFormat(info.formats, { quality: 'highest' });

  } catch (error) {
    console.error('Error choosing format:', error);
    // Final fallback - return first available format
    return info.formats && info.formats.length > 0 ? info.formats[0] : null;
  }
};

// Convert Node.js stream to web-compatible ReadableStream
const nodeStreamToWebStream = (nodeStream: Readable): ReadableStream<Uint8Array> => {
  return new ReadableStream({
    start(controller) {
      nodeStream.on('data', (chunk: Buffer) => {
        controller.enqueue(new Uint8Array(chunk));
      });

      nodeStream.on('end', () => {
        controller.close();
      });

      nodeStream.on('error', (error) => {
        console.error('Stream error:', error);
        controller.error(error);
      });
    },
    cancel() {
      nodeStream.destroy();
    }
  });
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: DownloadRequest = await request.json();
    const { url, format } = body;

    // Validate input
    if (!url) {
      return NextResponse.json(
        { error: 'YouTube URL is required' },
        { status: 400 }
      );
    }

    const cleanUrl = url.trim();

    // Validate YouTube URL format
    if (!cleanUrl.includes('youtube.com/watch') && !cleanUrl.includes('youtu.be/')) {
      return NextResponse.json(
        { error: 'Please provide a valid YouTube URL' },
        { status: 400 }
      );
    }

    // Get ytdl-core dynamically
    const ytdl = await getYtdl();
    if (!ytdl) {
      return NextResponse.json(
        { error: 'Video download service is temporarily unavailable' },
        { status: 503 }
      );
    }

    // Validate URL with ytdl-core
    if (!ytdl.validateURL(cleanUrl)) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL format' },
        { status: 400 }
      );
    }

    console.log('Processing download request:', { url: cleanUrl, quality: format?.quality });

    // Get video information with timeout
    let videoInfo: videoInfo;
    try {
      videoInfo = await Promise.race([
        ytdl.getInfo(cleanUrl, {
          requestOptions: {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
          }
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 25000)
        )
      ]);
    } catch (error) {
      console.error('Failed to get video info:', error);
      return NextResponse.json(
        { error: 'Failed to fetch video information. Video may be private, restricted, or unavailable.' },
        { status: 500 }
      );
    }

    const { videoDetails } = videoInfo;
    const safeTitle = sanitizeFilename(videoDetails.title);

    // Choose the best format using ytdl.chooseFormat
    const selectedFormat = await chooseBestFormat(videoInfo, format?.quality);

    if (!selectedFormat) {
      return NextResponse.json(
        { error: 'No suitable video format found for download' },
        { status: 500 }
      );
    }

    console.log('Selected format:', {
      itag: selectedFormat.itag,
      quality: selectedFormat.qualityLabel,
      hasVideo: selectedFormat.hasVideo,
      hasAudio: selectedFormat.hasAudio,
      container: selectedFormat.container
    });

    // Determine file extension and content type
    const isAudioOnly = !selectedFormat.hasVideo && selectedFormat.hasAudio;
    const fileExtension = isAudioOnly ? 'mp3' : (selectedFormat.container || 'mp4');
    const contentType = isAudioOnly ? 'audio/mpeg' : `video/${selectedFormat.container || 'mp4'}`;
    const filename = `${safeTitle}.${fileExtension}`;

    // Create download options using the selected format - PROPERLY TYPED
    const downloadOptions: downloadOptions = {
      format: selectedFormat, // This is now properly typed as videoFormat
      requestOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      }
    };

    try {
      // Create the download stream
      const videoStream = ytdl(cleanUrl, downloadOptions);

      // Convert to web-compatible stream
      const webStream = nodeStreamToWebStream(videoStream);

      // Return streaming response with proper headers
      return new NextResponse(webStream, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'X-Content-Type-Options': 'nosniff',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });

    } catch (downloadError) {
      console.error('Download failed:', downloadError);

      // Try fallback with different options
      try {
        console.log('Attempting fallback download...');

        const fallbackFormat = ytdl.chooseFormat(videoInfo.formats, {
          quality: 'highest',
          filter: format?.quality === 'Audio Only' ? 'audioonly' : undefined
        });

        // Create properly typed fallback options
        const fallbackOptions: downloadOptions = {
          format: fallbackFormat, // This is properly typed as videoFormat
          requestOptions: {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          }
        };

        const fallbackStream = ytdl(cleanUrl, fallbackOptions);
        const webStream = nodeStreamToWebStream(fallbackStream);

        return new NextResponse(webStream, {
          status: 200,
          headers: {
            'Content-Type': contentType,
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'X-Content-Type-Options': 'nosniff'
          }
        });

      } catch (fallbackError) {
        console.error('Fallback download also failed:', fallbackError);
        return NextResponse.json(
          { error: 'Unable to download this video. It may be restricted or unavailable.' },
          { status: 500 }
        );
      }
    }

  } catch (error) {
    console.error('Download API error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Handle specific error types
    if (errorMessage.includes('Video unavailable')) {
      return NextResponse.json(
        { error: 'This video is not available for download' },
        { status: 404 }
      );
    }

    if (errorMessage.includes('age') || errorMessage.includes('restricted')) {
      return NextResponse.json(
        { error: 'This video is age-restricted and cannot be downloaded' },
        { status: 403 }
      );
    }

    if (errorMessage.includes('timeout')) {
      return NextResponse.json(
        { error: 'Request timed out. Please try again.' },
        { status: 408 }
      );
    }

    return NextResponse.json(
      { error: 'Download failed. Please try again with a different video.' },
      { status: 500 }
    );
  }
}