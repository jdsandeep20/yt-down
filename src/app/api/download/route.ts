import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';

interface DownloadRequest {
  url: string;
  format?: {
    quality: string;
    format: string;
  };
}

// Simple filename sanitizer
const sanitizeFilename = (title: string): string => {
  return title
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .substring(0, 80)
    .replace(/\s+/g, '_');
};

// Convert Node stream to web stream
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

    // Validate YouTube URL
    if (!cleanUrl.includes('youtube.com/watch') && !cleanUrl.includes('youtu.be/')) {
      return NextResponse.json(
        { error: 'Please provide a valid YouTube URL' },
        { status: 400 }
      );
    }

    // Dynamic import of ytdl-core
    const ytdl = (await import('@distube/ytdl-core')).default;

    // Validate URL
    if (!ytdl.validateURL(cleanUrl)) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL format' },
        { status: 400 }
      );
    }

    console.log('Processing download request:', { url: cleanUrl, quality: format?.quality });

    // Get video info
    const videoInfo = await Promise.race([
      ytdl.getInfo(cleanUrl, {
        requestOptions: {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        }
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 25000)
      )
    ]) as any;

    const { videoDetails } = videoInfo;
    const safeTitle = sanitizeFilename(videoDetails.title);

    // Determine download options
    let downloadOptions: any;
    let fileExtension: string;
    let contentType: string;

    if (format?.quality === 'Audio Only') {
      downloadOptions = { quality: 'highestaudio' };
      fileExtension = 'mp3';
      contentType = 'audio/mpeg';
    } else {
      downloadOptions = { quality: 'highest' };
      fileExtension = 'mp4';
      contentType = 'video/mp4';
    }

    const filename = `${safeTitle}.${fileExtension}`;

    console.log('Download configuration:', {
      title: videoDetails.title,
      quality: format?.quality,
      options: downloadOptions
    });

    try {
      // Create download stream
      const videoStream = ytdl(cleanUrl, downloadOptions);

      // Convert to web stream
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
      console.error('Download failed:', downloadError);
      return NextResponse.json(
        { error: 'Unable to download this video. It may be restricted or unavailable.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Download API error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    if (errorMessage.includes('Video unavailable')) {
      return NextResponse.json(
        { error: 'This video is not available for download' },
        { status: 404 }
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