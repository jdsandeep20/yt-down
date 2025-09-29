import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';

// Types for ytdl-core to ensure proper compatibility
interface YtdlDownloadOptions {
  quality?: string | number;
  filter?: 'audioonly' | 'videoonly' | 'audioandvideo';
  format?: string;
  requestOptions?: {
    headers?: Record<string, string>;
  };
}

interface DownloadRequest {
  url: string;
  format: {
    quality: string;
    format: string;
    itag?: number;
    type: string;
    hasAudio?: boolean;
  };
}

interface VideoDetails {
  title: string;
  author?: {
    name: string;
  };
  lengthSeconds?: string;
  videoId: string;
}

interface VideoInfo {
  videoDetails: VideoDetails;
  formats?: unknown[];
}

// Dynamic import for serverless compatibility
const getYtdl = async () => {
  try {
    const { default: ytdl } = await import('@distube/ytdl-core');
    return ytdl;
  } catch (error) {
    console.error('Failed to import ytdl-core:', error);
    return null;
  }
};

// Helper function to create safe filename
const sanitizeFilename = (title: string): string => {
  return title
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .substring(0, 100)
    .replace(/\s+/g, '_');
};

// Helper function to determine optimal download options
const getDownloadOptions = (requestedQuality: string): YtdlDownloadOptions => {
  // For audio-only requests
  if (requestedQuality === 'Audio Only' || requestedQuality.toLowerCase().includes('audio')) {
    return {
      quality: 'highestaudio',
      filter: 'audioonly'
    };
  }

  // For video requests - prioritize combined audio+video formats
  const qualityMap: Record<string, string> = {
    '2160p': 'highest',
    '1440p': 'highest',
    '1080p': 'highest',
    '720p': 'highest',
    '480p': 'highest',
    '360p': 'highestaudio',
    '240p': 'lowest',
    '144p': 'lowest'
  };

  const quality = qualityMap[requestedQuality] || 'highest';

  return {
    quality,
    filter: 'audioandvideo'
  };
};

// Convert stream to web-compatible ReadableStream
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
        controller.error(error);
      });
    }
  });
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { url, format }: DownloadRequest = await request.json();

    // Validate input
    if (!url || !format) {
      return NextResponse.json(
        { error: 'URL and format are required' },
        { status: 400 }
      );
    }

    const cleanUrl = url.trim();

    // Validate YouTube URL
    if (!cleanUrl.includes('youtube.com/watch') && !cleanUrl.includes('youtu.be/')) {
      return NextResponse.json(
        { error: 'Please provide a valid YouTube URL' },
        { status: 400 }
      );
    }

    // Get ytdl-core module
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

    console.log('Processing download request:', { url: cleanUrl, quality: format.quality });

    // Get video information with timeout
    let videoInfo: VideoInfo;
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
          setTimeout(() => reject(new Error('Request timeout')), 20000)
        )
      ]) as VideoInfo;
    } catch (error) {
      console.error('Failed to get video info:', error);
      return NextResponse.json(
        { error: 'Failed to fetch video information. Video may be private, restricted, or unavailable.' },
        { status: 500 }
      );
    }

    const { videoDetails } = videoInfo;
    const safeTitle = sanitizeFilename(videoDetails.title);

    // Determine download options
    const downloadOptions = getDownloadOptions(format.quality);

    console.log('Download configuration:', {
      title: videoDetails.title,
      quality: format.quality,
      options: downloadOptions
    });

    // Set filename and content type
    const isAudioOnly = downloadOptions.filter === 'audioonly';
    const fileExtension = isAudioOnly ? 'mp3' : 'mp4';
    const contentType = isAudioOnly ? 'audio/mpeg' : 'video/mp4';
    const filename = `${safeTitle}.${fileExtension}`;

    try {
      // Create download stream
      const videoStream = ytdl(cleanUrl, downloadOptions);

      // Convert to web-compatible stream for Railway
      const webStream = nodeStreamToWebStream(videoStream);

      // Return streaming response
      return new NextResponse(webStream, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'X-Content-Type-Options': 'nosniff'
        }
      });

    } catch (downloadError) {
      console.error('Download failed, trying fallback:', downloadError);

      // Fallback: try with different options
      const fallbackOptions: YtdlDownloadOptions = {
        quality: 'highest',
        filter: isAudioOnly ? 'audioonly' : 'audioandvideo'
      };

      try {
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
          { error: 'Unable to download this video. It may be restricted or unavailable in the requested format.' },
          { status: 500 }
        );
      }
    }

  } catch (error) {
    console.error('Download API error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

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

    return NextResponse.json(
      { error: 'Download failed. Please try again or use a different video.' },
      { status: 500 }
    );
  }
}