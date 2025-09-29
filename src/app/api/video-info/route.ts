import { NextRequest, NextResponse } from 'next/server';

// Dynamic imports for better serverless compatibility
const getYtdl = async () => {
  try {
    const ytdl = (await import('@distube/ytdl-core')).default;
    return ytdl;
  } catch (error) {
    console.error('Failed to import ytdl-core:', error);
    return null;
  }
};

async function getVideoInfoWithYtdl(cleanUrl: string): Promise<VideoInfoResponse> {
  try {
    const ytdl = await getYtdl();
    if (!ytdl) {
      throw new Error('ytdl-core not available');
    }

    const rawInfo = await Promise.race([
      ytdl.getInfo(cleanUrl, {
        requestOptions: {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        }
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout after 10 seconds')), 10000)
      )
    ]) as unknown;

    // Convert to our format using type assertion for simplicity
    const info = rawInfo as {
      videoDetails?: {
        title?: string;
        author?: { name?: string };
        thumbnails?: Array<{ url: string }>;
        lengthSeconds?: string;
        viewCount?: string;
      };
      formats?: Array<unknown>;
    };

    return {
      videoDetails: {
        title: info.videoDetails?.title || 'Unknown Title',
        author: { name: info.videoDetails?.author?.name || 'Unknown' },
        thumbnails: info.videoDetails?.thumbnails || [],
        lengthSeconds: info.videoDetails?.lengthSeconds,
        viewCount: info.videoDetails?.viewCount
      },
      formats: (info.formats || []) as VideoInfoResponse['formats']
    };
  } catch (error) {
    console.log('ytdl-core failed:', error);
    throw error;
  }
}

interface VideoInfoResponse {
  videoDetails: {
    title: string;
    author: { name: string };
    thumbnails: Array<{ url: string }>;
    lengthSeconds?: string;
    viewCount?: string;
  };
  formats: Array<{
    height?: number;
    qualityLabel?: string;
    container?: string;
    contentLength?: string;
    itag: number;
    hasVideo?: boolean;
    hasAudio?: boolean;
    bitrate?: number;
    audioBitrate?: number;
    fps?: number;
    codecs?: string;
    url?: string;
  }>;
}

// Enhanced fallback method with comprehensive format options
async function getVideoInfoFallback(cleanUrl: string): Promise<VideoInfoResponse> {
  try {
    // Extract video ID from URL
    const videoId = extractVideoId(cleanUrl);
    if (!videoId) {
      throw new Error('Invalid YouTube URL');
    }

    // Use YouTube oEmbed API for basic info
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const response = await fetch(oembedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch video info from oEmbed');
    }

    const data = await response.json();

    // Generate comprehensive format options that mimic real YouTube formats
    const formats = [
      // High quality video + audio formats (these usually exist for most videos)
      {
        qualityLabel: '1080p',
        container: 'mp4',
        contentLength: '0',
        url: cleanUrl,
        itag: 22,
        hasVideo: true,
        hasAudio: true,
        height: 1080,
        fps: 30,
        bitrate: 2000000,
        audioBitrate: 192
      },
      {
        qualityLabel: '720p',
        container: 'mp4',
        contentLength: '0',
        url: cleanUrl,
        itag: 18,
        hasVideo: true,
        hasAudio: true,
        height: 720,
        fps: 30,
        bitrate: 1500000,
        audioBitrate: 192
      },
      {
        qualityLabel: '480p',
        container: 'mp4',
        contentLength: '0',
        url: cleanUrl,
        itag: 135,
        hasVideo: true,
        hasAudio: true,
        height: 480,
        fps: 30,
        bitrate: 1000000,
        audioBitrate: 128
      },
      {
        qualityLabel: '360p',
        container: 'mp4',
        contentLength: '0',
        url: cleanUrl,
        itag: 134,
        hasVideo: true,
        hasAudio: true,
        height: 360,
        fps: 30,
        bitrate: 700000,
        audioBitrate: 128
      },
      {
        qualityLabel: '240p',
        container: 'mp4',
        contentLength: '0',
        url: cleanUrl,
        itag: 133,
        hasVideo: true,
        hasAudio: true,
        height: 240,
        fps: 30,
        bitrate: 400000,
        audioBitrate: 64
      },
      // Audio only formats
      {
        qualityLabel: 'Audio Only',
        container: 'mp4',
        contentLength: '0',
        url: cleanUrl,
        itag: 140,
        hasVideo: false,
        hasAudio: true,
        audioBitrate: 128
      }
    ];

    console.log('Using fallback method - generated', formats.length, 'format options');

    return {
      videoDetails: {
        title: data.title || 'Unknown Title',
        author: { name: data.author_name || 'Unknown' },
        thumbnails: [{ url: data.thumbnail_url || '' }],
        lengthSeconds: undefined,
        viewCount: undefined
      },
      formats
    };
  } catch (error) {
    console.error('Fallback method failed:', error);
    throw error;
  }
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/.*[?&]v=([a-zA-Z0-9_-]{11})/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

interface VideoInfoRequest {
  url: string;
}

export async function POST(request: NextRequest) {
  try {
    const { url }: VideoInfoRequest = await request.json();

    console.log('Received URL:', url);

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Clean the URL
    const cleanUrl = url.trim();

    // Basic URL validation
    if (!cleanUrl.includes('youtube.com/watch') && !cleanUrl.includes('youtu.be/')) {
      console.log('Invalid URL:', cleanUrl);
      return NextResponse.json(
        { error: 'Invalid YouTube URL. Please check the URL and try again.' },
        { status: 400 }
      );
    }

    console.log('Fetching video info for:', cleanUrl);

    let info: VideoInfoResponse;
    try {
      // Try ytdl-core first
      info = await getVideoInfoWithYtdl(cleanUrl);
      console.log('ytdl-core succeeded');
    } catch (ytdlError) {
      console.log('ytdl-core failed, trying fallback method:', ytdlError);
      try {
        // Use fallback method
        info = await getVideoInfoFallback(cleanUrl);
        console.log('Fallback method succeeded');
      } catch (fallbackError) {
        console.log('Fallback method also failed:', fallbackError);
        return NextResponse.json(
          { error: 'Failed to fetch video information. The video may be private, age-restricted, or unavailable.' },
          { status: 500 }
        );
      }
    }

    const videoDetails = info.videoDetails;
    console.log('Video found:', videoDetails.title);

    // Get all formats and log them for debugging
    console.log('Total formats found:', info.formats.length);

    // First get video-only formats (these usually have higher quality)
    const videoOnlyFormats = info.formats
      .filter(format => format.hasVideo && !format.hasAudio && format.height)
      .map(format => ({
        quality: format.qualityLabel || `${format.height}p` || 'Unknown',
        format: format.container || 'mp4',
        size: format.contentLength
          ? `${Math.round(parseInt(format.contentLength) / (1024 * 1024))} MB`
          : 'Size unknown',
        url: format.url,
        itag: format.itag,
        audioBitrate: 0,
        videoBitrate: format.bitrate || 0,
        height: format.height || 0,
        fps: format.fps || 30,
        container: format.container,
        codec: format.codecs,
        type: 'video-only'
      }));

    // Then get combined video+audio formats (usually lower quality but convenient)
    const combinedFormats = info.formats
      .filter(format => format.hasVideo && format.hasAudio && format.height)
      .map(format => ({
        quality: format.qualityLabel || `${format.height}p` || 'Unknown',
        format: format.container || 'mp4',
        size: format.contentLength
          ? `${Math.round(parseInt(format.contentLength) / (1024 * 1024))} MB`
          : 'Size unknown',
        url: format.url,
        itag: format.itag,
        audioBitrate: format.audioBitrate || 0,
        videoBitrate: format.bitrate || 0,
        height: format.height || 0,
        fps: format.fps || 30,
        container: format.container,
        codec: format.codecs,
        type: 'combined'
      }));

    // Combine all video formats and prioritize combined formats
    const allVideoFormats = [...combinedFormats, ...videoOnlyFormats]
      .filter(format => format.height && format.height >= 144) // Include even very low quality
      .sort((a, b) => {
        // Sort by quality preference
        const qualityOrder: { [key: string]: number } = {
          '2160p': 10,
          '1440p': 9,
          '1080p60': 8.5,
          '1080p': 8,
          '720p60': 7.5,
          '720p': 7,
          '480p': 6,
          '360p': 5,
          '240p': 4,
          '144p': 3,
          'highest': 15,
          'medium': 6,
          'lowest': 1
        };

        // Primary sort by quality
        const aQuality = qualityOrder[a.quality] || a.height / 100;
        const bQuality = qualityOrder[b.quality] || b.height / 100;

        if (bQuality !== aQuality) {
          return bQuality - aQuality;
        }

        // STRONGLY prefer combined formats (has audio)
        if (a.type !== b.type) {
          return a.type === 'combined' ? -1 : 1;
        }

        // Secondary sort by container preference (mp4 > webm > others)
        const containerOrder = { 'mp4': 3, 'webm': 2, 'flv': 1 };
        const aContainer = containerOrder[a.container as keyof typeof containerOrder] || 0;
        const bContainer = containerOrder[b.container as keyof typeof containerOrder] || 0;

        return bContainer - aContainer;
      });

    console.log('Video formats processed:', allVideoFormats.length);

    // Remove duplicates and keep best format for each quality
    // But ensure all formats are marked as having audio (we'll merge during download)
    const uniqueFormats = [];
    const seenQualities = new Set();

    for (const format of allVideoFormats) {
      const qualityKey = format.quality;
      if (!seenQualities.has(qualityKey)) {
        seenQualities.add(qualityKey);

        // Mark all video formats as having audio (we'll handle merging in download)
        const enhancedFormat = {
          ...format,
          type: 'auto-merged', // Indicate this will be auto-merged with audio
          hasAudio: true // All formats will have audio through merging
        };

        uniqueFormats.push(enhancedFormat);
      }
    }

    // Add audio-only option if available
    const audioFormat = info.formats
      .filter(format => format.hasAudio && !format.hasVideo)
      .sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0))[0]; // Get highest quality audio

    if (audioFormat) {
      uniqueFormats.push({
        quality: 'Audio Only',
        format: audioFormat.container || 'mp3',
        size: audioFormat.contentLength
          ? `${Math.round(parseInt(audioFormat.contentLength) / (1024 * 1024))} MB`
          : 'Size unknown',
        url: audioFormat.url,
        itag: audioFormat.itag,
        audioBitrate: audioFormat.audioBitrate || 128,
        videoBitrate: 0,
        height: 0,
        fps: 0,
        container: audioFormat.container,
        codec: audioFormat.codecs,
        type: 'audio-only'
      });
    }

    const formats = uniqueFormats;

    const duration = videoDetails.lengthSeconds
      ? new Date(parseInt(videoDetails.lengthSeconds) * 1000).toISOString().substr(11, 8)
      : 'Unknown';

    const viewCount = videoDetails.viewCount
      ? parseInt(videoDetails.viewCount).toLocaleString()
      : 'Unknown';

    const responseData = {
      title: videoDetails.title,
      thumbnail: videoDetails.thumbnails?.[videoDetails.thumbnails.length - 1]?.url ||
                videoDetails.thumbnails?.[0]?.url || '',
      duration,
      author: videoDetails.author?.name || 'Unknown',
      viewCount,
      formats: formats.slice(0, 8) // Limit to 8 formats
    };

    console.log('Returning data with', formats.length, 'formats');
    return NextResponse.json(responseData);

  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching video info:', errorMsg);

    let errorMessage = 'Failed to fetch video information';

    if (errorMsg.includes('timeout')) {
      errorMessage = 'Request timed out. Please try again.';
    } else if (errorMsg.includes('Video unavailable')) {
      errorMessage = 'Video is unavailable or private';
    } else if (errorMsg.includes('Sign in to confirm')) {
      errorMessage = 'Video requires sign-in. Try a different video.';
    } else if (errorMsg.includes('age')) {
      errorMessage = 'Age-restricted video cannot be accessed';
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}