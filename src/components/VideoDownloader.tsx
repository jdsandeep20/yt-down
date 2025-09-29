'use client';

import { useState, forwardRef, useImperativeHandle } from 'react';
import VideoPreview from './VideoPreview';
import DownloadOptions from './DownloadOptions';
import LoadingSpinner from './LoadingSpinner';
import DownloadNotification from './DownloadNotification';

interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  viewCount: string;
  formats: Array<{
    quality: string;
    format: string;
    size: string;
    url: string;
  }>;
}

interface VideoDownloaderRef {
  fetchVideoInfo: () => void;
}

const VideoDownloader = forwardRef<VideoDownloaderRef>((props, ref) => {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [downloadedFileName, setDownloadedFileName] = useState('');

  const isValidYouTubeUrl = (url: string) => {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}/;
    return pattern.test(url);
  };

  useImperativeHandle(ref, () => ({
    fetchVideoInfo
  }));

  const fetchVideoInfo = async () => {
    if (!url.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    if (!isValidYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    setLoading(true);
    setError('');
    setVideoInfo(null);

    try {
      const response = await fetch('/api/video-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch video information');
      }

      const data = await response.json();
      setVideoInfo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  interface DownloadFormat {
    quality: string;
    format: string;
    size: string;
    url: string;
    itag?: number;
    type?: string;
    hasAudio?: boolean;
  }

  const handleDownload = async (format: DownloadFormat) => {
    try {
      setError('');
      setDownloading(true);

      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, format }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Download failed');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const fileName = `${videoInfo?.title?.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_') || 'video'}.${format.format || 'mp4'}`;
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);

      // Show download notification
      setDownloadedFileName(fileName);
      setShowNotification(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div className="url-input-section">
          <div className="space-y-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube URL here..."
              className="input-animated"
              onKeyPress={(e) => e.key === 'Enter' && fetchVideoInfo()}
            />
            <button
              onClick={fetchVideoInfo}
              disabled={loading || !url.trim()}
              className="btn btn-primary w-full btn-pulse"
            >
              {loading ? 'Analyzing...' : 'Get Video'}
            </button>
          </div>

          {error && (
            <div className="mt-4 status-error">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        )}

        {videoInfo && !loading && (
          <div className="space-y-8">
            <VideoPreview videoInfo={videoInfo} />
            <DownloadOptions
              formats={videoInfo.formats}
              onDownload={handleDownload}
              downloading={downloading}
            />
          </div>
        )}
      </div>

      {/* Download Notification */}
      <DownloadNotification
        isVisible={showNotification}
        fileName={downloadedFileName}
        onClose={() => setShowNotification(false)}
      />
    </>
  );
});

VideoDownloader.displayName = 'VideoDownloader';

export default VideoDownloader;