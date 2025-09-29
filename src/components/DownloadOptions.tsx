'use client';

interface Format {
  quality: string;
  format: string;
  size: string;
  url: string;
  fps?: number;
  type?: string;
  hasAudio?: boolean;
}

interface DownloadOptionsProps {
  formats: Format[];
  onDownload: (format: Format) => void;
  downloading?: boolean;
}

export default function DownloadOptions({ formats, onDownload, downloading = false }: DownloadOptionsProps) {
  if (!formats || formats.length === 0) {
    return (
      <div className="card p-8">
        <h3 className="heading-h3 text-2xl mb-6">Download Options</h3>
        <div className="text-center py-12">
          <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--surface)' }}>
            <svg className="w-6 h-6" style={{ color: 'var(--text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="body-medium mb-2" style={{ color: 'var(--text-secondary)' }}>No download formats available</p>
          <p className="body-small" style={{ color: 'var(--text-tertiary)' }}>This video may be restricted or unavailable for download.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
             style={{ backgroundColor: 'var(--accent)', width: '32px', height: '32px' }}>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v11.586l2.707 2.707A1 1 0 0120 18v-3a1 1 0 00-1-1h-1V4a1 1 0 00-1-1H7a1 1 0 00-1 1v10H5a1 1 0 00-1 1v3a1 1 0 00.293.707L7 21.414V10" />
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
        <h3 className="text-lg font-bold">Download Options</h3>
      </div>

      <div className="space-y-3">
        {formats.map((format, index) => {
          const getBadgeClass = (quality: string) => {
            if (quality.includes('2160') || quality.includes('4K')) return 'badge-4k';
            if (quality.includes('1080')) return 'badge-1080p';
            if (quality.includes('720')) return 'badge-720p';
            if (quality.includes('480')) return 'badge-480p';
            if (quality.includes('360')) return 'badge-360p';
            if (quality.includes('Audio')) return 'badge-audio';
            return 'badge-1080p';
          };

          return (
            <div
              key={index}
              className="card flex items-center justify-between p-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`badge ${getBadgeClass(format.quality)}`}>
                    {format.quality}
                  </span>
                  <span className="text-sm text-muted">
                    {format.format.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <span>{format.size}</span>
                  {format.fps && format.fps > 30 && (
                    <span>{format.fps}fps</span>
                  )}
                  {format.type === 'auto-merged' || format.hasAudio ? (
                    <span style={{ color: 'var(--success)' }}>✓ With Audio</span>
                  ) : format.type === 'video-only' ? (
                    <span style={{ color: 'var(--warning)' }}>⚠ Video Only</span>
                  ) : (
                    <span style={{ color: 'var(--success)' }}>✓ With Audio</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => onDownload(format)}
                disabled={downloading}
                className="btn btn-accent ml-4 flex items-center gap-2"
              >
                {downloading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Exporting...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}