'use client';

import VideoDownloader from './VideoDownloader';

export default function SEOContent() {
  return (
    <section className="py-24" style={{ backgroundColor: 'var(--background)' }} id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* URL Input Section - Above White Heading */}
        <div className="max-w-4xl mx-auto mb-16 flex justify-center">
          <div className="w-full max-w-3xl">
            <VideoDownloader />
          </div>
        </div>

        {/* Main SEO Content */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold" style={{ color: 'var(--text)', letterSpacing: '0.04em', wordSpacing: '0.2em' }}>
            Key Features of Our YouTube Video Converter
          </h2>
          <div className="max-w-none space-y-8">
            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
              Easily <strong style={{ color: 'var(--text)' }}>download YouTube videos</strong> in high quality with our free online YouTube video downloader.
              Whether you need <strong style={{ color: 'var(--text)' }}>MP4, MP3, HD, or 4K formats</strong>, our tool lets you save videos quickly and
              safely with no registration required. Just paste your YouTube URL and click &quot;Download&quot; — it&apos;s that simple.
            </p>
            <p className="text-base mb-12" style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              <strong style={{ color: 'var(--accent)' }}>No ads, no watermarks, no limits.</strong> 100% secure and mobile-friendly.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="text-center card">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3"
                 style={{ background: 'var(--primary-bg)', width: '32px', height: '32px' }}>
              <svg className="w-4 h-4" style={{ color: 'var(--primary)', width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v11.586l2.707 2.707A1 1 0 0120 18v-3a1 1 0 00-1-1h-1V4a1 1 0 00-1-1H7a1 1 0 00-1 1v10H5a1 1 0 00-1 1v3a1 1 0 00.293.707L7 21.414V10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
              Multiple Video Resolutions
            </h3>
            <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
              Download YouTube videos in various qualities - from space-saving 360p to crystal-clear 4K Ultra HD. Our video grabber automatically detects all available resolutions.
            </p>
          </div>

          <div className="text-center card">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3"
                 style={{ backgroundColor: 'rgba(0, 212, 170, 0.1)', width: '32px', height: '32px' }}>
              <svg className="w-4 h-4" style={{ color: 'var(--accent)', width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
              Audio Extraction & MP3 Conversion
            </h3>
            <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
              Extract audio tracks from music videos, podcasts, interviews, and lectures. Convert YouTube to MP3 in high-quality 320kbps bitrate.
            </p>
          </div>

          <div className="text-center card">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3"
                 style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', width: '32px', height: '32px' }}>
              <svg className="w-4 h-4" style={{ color: 'var(--warning)', width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
              Playlist & Channel Downloads
            </h3>
            <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
              Save entire YouTube playlists and channels with our batch download feature. Download multiple videos simultaneously.
            </p>
          </div>

          <div className="text-center card">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3"
                 style={{ backgroundColor: 'rgba(91, 141, 239, 0.1)', width: '32px', height: '32px' }}>
              <svg className="w-4 h-4" style={{ color: 'var(--primary)', width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
              No Registration Required
            </h3>
            <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
              Start downloading immediately - no account creation, no email verification, no personal data collection. Your privacy matters to us.
            </p>
          </div>

          <div className="text-center card">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3"
                 style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', width: '32px', height: '32px' }}>
              <svg className="w-4 h-4" style={{ color: 'var(--success)', width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
              Lightning-Fast Processing
            </h3>
            <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
              Our optimized servers and content delivery network ensure rapid video processing. Download speeds depend on your internet connection.
            </p>
          </div>

          <div className="text-center card">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3"
                 style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', width: '32px', height: '32px' }}>
              <svg className="w-4 h-4" style={{ color: 'var(--error)', width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
              Safe & Secure Downloads
            </h3>
            <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
              SSL-encrypted connections protect your data. No malware, adware, or hidden software bundles. Regular security audits and updates.
            </p>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="card-elevated">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              Why Choose Our YouTube Downloader?
            </h3>
            <p className="max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              Start downloading now and enjoy your favorite videos anytime, anywhere.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2"
                   style={{ background: 'var(--gradient-primary)', width: '32px', height: '32px' }}>
                <span className="text-white font-bold text-xs">4K</span>
              </div>
              <h4 className="font-semibold mb-1 text-sm" style={{ color: 'var(--text)' }}>Ultra HD Quality</h4>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Download in 4K, 1080p, 720p</p>
            </div>

            <div className="text-center">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2"
                   style={{ backgroundColor: 'var(--accent)', width: '32px', height: '32px' }}>
                <svg className="w-4 h-4 text-white" style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-1 text-sm" style={{ color: 'var(--text)' }}>Lightning Fast</h4>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>No watermark YouTube download</p>
            </div>

            <div className="text-center">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2"
                   style={{ backgroundColor: 'var(--error)', width: '32px', height: '32px' }}>
                <svg className="w-4 h-4 text-white" style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-1 text-sm" style={{ color: 'var(--text)' }}>100% Secure</h4>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Free online video downloader</p>
            </div>

            <div className="text-center">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2"
                   style={{ backgroundColor: 'var(--primary)', width: '32px', height: '32px' }}>
                <svg className="w-4 h-4 text-white" style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h4 className="font-semibold mb-1 text-sm" style={{ color: 'var(--text)' }}>Completely Free</h4>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>YouTube to MP3 HD converter</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="download-section text-center mt-20">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: 'var(--text)', letterSpacing: '0.02em' }}>
            Ready to Download?
          </h2>
          <p className="subtitle" style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Start downloading your favorite YouTube videos now with our fast and secure downloader.
          </p>
          <a href="#home" className="cta-btn btn btn-primary inline-flex items-center">
            Get Started Now
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}