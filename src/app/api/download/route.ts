import { NextRequest, NextResponse } from 'next/server';

// Dynamic import for better serverless compatibility
const getYtdl = async () => {
  try {
    const ytdl = (await import('@distube/ytdl-core')).default;
    return ytdl;
  } catch (error) {
    console.error('Failed to import ytdl-core:', error);
    return null;
  }
};

// Import types for better type safety
type YtdlFilter = 'audioonly' | 'videoonly' | 'audioandvideo';

interface DownloadRequest {
  url: string;
  format: {
    quality: string;
    format: string;
    itag: number;
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

interface DownloadOptions {
  quality: string;
  filter: YtdlFilter;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { url, format }: DownloadRequest = await request.json();

    console.log('Download request for URL:', url, 'Format:', format);

    if (!url || !format) {
      return NextResponse.json(
        { error: 'URL and format are required' },
        { status: 400 }
      );
    }

    const cleanUrl = url.trim();

    // Basic URL validation before trying ytdl
    if (!cleanUrl.includes('youtube.com/watch') && !cleanUrl.includes('youtu.be/')) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL' },
        { status: 400 }
      );
    }

    // Get ytdl dynamically
    const ytdl = await getYtdl();
    if (!ytdl) {
      console.log('ytdl-core not available, using fallback download method');
      return NextResponse.json(
        { error: 'Download service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    // Validate URL with ytdl
    try {
      if (!ytdl.validateURL(cleanUrl)) {
        return NextResponse.json(
          { error: 'Invalid YouTube URL format' },
          { status: 400 }
        );
      }
    } catch (validateError) {
      console.log('URL validation failed:', validateError);
      return NextResponse.json(
        { error: 'Unable to validate YouTube URL' },
        { status: 400 }
      );
    }

    console.log('Getting video info for download...');

    let info: VideoInfo;
    try {
      info = await Promise.race([
        ytdl.getInfo(cleanUrl, {
          requestOptions: {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
          }
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Video info timeout')), 15000)
        )
      ]) as VideoInfo;
    } catch (infoError) {
      console.log('Failed to get video info:', infoError);
      return NextResponse.json(
        { error: 'Failed to get video information. The video may be private or unavailable.' },
        { status: 500 }
      );
    }

    const videoDetails = info.videoDetails;
    console.log('Downloading:', videoDetails.title);

    let downloadOptions: DownloadOptions;

    console.log('Format details:', {
      quality: format.quality,
      type: format.type,
      hasAudio: format.hasAudio,
      itag: format.itag
    });

    // Simplified download approach - use general quality filters
    if (format.quality === 'Audio Only' || format.quality.includes('Audio')) {
      downloadOptions = {
        quality: 'highestaudio',
        filter: 'audioonly' as YtdlFilter
      };
    } else {
      // For video downloads, always try to get combined format first
      const qualityToYtdl: { [key: string]: string } = {
        '2160p': 'highest',  // Use highest instead of highestvideo to get combined format
        '1440p': 'highest',
        '1080p': 'highest',
        '720p': 'highest',
        '480p': 'highest',
        '360p': 'medium',
        '240p': 'lowest',
        '144p': 'lowest'
      };

      const ytdlQuality = qualityToYtdl[format.quality] || 'highest';

      downloadOptions = {
        quality: ytdlQuality,
        filter: 'audioandvideo' as YtdlFilter  // Always try combined first
      };

      console.log(`Download config for ${format.quality}:`, downloadOptions);
    }

    console.log('Download options:', downloadOptions);
    const videoStream = ytdl(cleanUrl, downloadOptions);

    const chunks: Buffer[] = [];

    return new Promise<NextResponse>((resolve, reject) => {
      videoStream.on('data', (chunk) => {
        chunks.push(chunk);
      });

      videoStream.on('end', () => {
        const buffer = Buffer.concat(chunks);
        const safeTitle = videoDetails.title
          .replace(/[^a-zA-Z0-9\s-]/g, '')
          .replace(/\s+/g, '_')
          .substring(0, 50);

        let filename: string, contentType: string;

        if (format.quality === 'Audio Only') {
          filename = `${safeTitle}.${format.format === 'm4a' ? 'm4a' : 'mp3'}`;
          contentType = format.format === 'm4a' ? 'audio/mp4' : 'audio/mpeg';
        } else {
          filename = `${safeTitle}.${format.format || 'mp4'}`;
          contentType = `video/${format.format || 'mp4'}`;
        }

        const response = new NextResponse(buffer, {
          status: 200,
          headers: {
            'Content-Type': contentType,
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Content-Length': buffer.length.toString(),
            'Cache-Control': 'no-cache',
          },
        });

        console.log('Download completed:', filename);
        resolve(response);
      });

      videoStream.on('error', (error) => {
        console.error('Download stream error:', error);

        // Enhanced fallback system
        console.log('Download failed, trying fallback methods...');

        // Try different quality options as fallback
        const fallbackOptions: Record<string, unknown>[] = [
          { quality: 'highest', filter: 'audioandvideo' },
          { quality: 'highestvideo', filter: 'videoonly' },
          { quality: 'medium', filter: 'audioandvideo' },
          { quality: 'lowest', filter: 'audioandvideo' }
        ];

        let fallbackIndex = 0;

        const tryFallback = () => {
          if (fallbackIndex >= fallbackOptions.length) {
            reject(NextResponse.json(
              { error: 'All download methods failed. Video may be restricted.' },
              { status: 500 }
            ));
            return;
          }

          const fallbackOption = fallbackOptions[fallbackIndex];
          console.log(`Trying fallback ${fallbackIndex + 1}:`, fallbackOption);

          const fallbackStream = ytdl(cleanUrl, fallbackOption);
          const fallbackChunks: Buffer[] = [];

          fallbackStream.on('data', (chunk) => {
            fallbackChunks.push(chunk);
          });

          fallbackStream.on('end', () => {
            const buffer = Buffer.concat(fallbackChunks);
            const safeTitle = videoDetails.title
              .replace(/[^a-zA-Z0-9\s-]/g, '')
              .replace(/\s+/g, '_')
              .substring(0, 50);

            let filename: string, contentType: string;
            if (fallbackOption.filter === 'audioonly') {
              filename = `${safeTitle}.mp3`;
              contentType = 'audio/mpeg';
            } else {
              filename = `${safeTitle}.mp4`;
              contentType = 'video/mp4';
            }

            const response = new NextResponse(buffer, {
              status: 200,
              headers: {
                'Content-Type': contentType,
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Length': buffer.length.toString(),
                'Cache-Control': 'no-cache',
              },
            });

            console.log(`Fallback ${fallbackIndex + 1} download completed:`, filename);
            resolve(response);
          });

          fallbackStream.on('error', (fallbackError) => {
            console.error(`Fallback ${fallbackIndex + 1} failed:`, fallbackError);
            fallbackIndex++;
            tryFallback();
          });
        };

        tryFallback();
      });
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error downloading video:', errorMessage);

    let responseMessage = 'Failed to download video';
    if (errorMessage.includes('Video unavailable')) {
      responseMessage = 'Video is unavailable for download';
    } else if (errorMessage.includes('age')) {
      responseMessage = 'Age-restricted video cannot be downloaded';
    }

    return NextResponse.json(
      { error: responseMessage },
      { status: 500 }
    );
  }
}