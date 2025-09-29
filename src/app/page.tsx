'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOContent from '@/components/SEOContent';
import VideoDownloader from '@/components/VideoDownloader';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <Header />

      {/* Hero Section with URL Input at Top */}
      <main className="relative" id="home">
        <div className="container mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center max-w-5xl mx-auto">
            {/* Main Heading */}
            <h1 className="title" style={{ fontSize: '28px', letterSpacing: '0.025em', wordSpacing: '0.12em', lineHeight: '1.35' }}>
              Download YouTube Videos in HD Quality - Fast, Free & Secure
            </h1>

            {/* Subheading */}
            <p className="subtitle max-w-3xl mx-auto" style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Transform your favorite YouTube content into downloadable files with our powerful online video downloader. No software installation required - simply paste your video URL and download instantly in multiple formats including MP4, MP3, WebM, and more.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto mb-12">
              <div className="text-center mb-6">
                <div className="text-2xl font-bold mb-3">4K</div>
                <div className="text-sm">Ultra HD</div>
              </div>
              <div className="text-center mb-6">
                <div className="text-2xl font-bold mb-3" style={{ color: 'var(--success)' }}>Free</div>
                <div className="text-sm">No Cost</div>
              </div>
              <div className="text-center mb-6">
                <div className="text-2xl font-bold mb-3" style={{ color: 'var(--accent)' }}>Fast</div>
                <div className="text-sm">Instant</div>
              </div>
              <div className="text-center mb-6">
                <div className="text-2xl font-bold mb-3">Safe</div>
                <div className="text-sm">Secure</div>
              </div>
            </div>

            {/* Video Downloader Component */}
            <div className="mt-16">
              <VideoDownloader />
            </div>

          </div>
        </div>
      </main>

      {/* How It Works Section */}
      <section className="py-24" style={{ background: 'var(--gradient-dark)' }} id="how-it-works">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: 'var(--text)', letterSpacing: '0.04em', wordSpacing: '0.2em' }}>How to Download YouTube Videos</h2>
            <p className="subtitle max-w-2xl mx-auto" style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Our YouTube downloader makes saving videos simple in four easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center card-elevated">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                   style={{ background: 'var(--gradient-primary)', width: '48px', height: '48px' }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3">1. Copy URL</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                Copy the YouTube URL from your browser&apos;s address bar or mobile app
              </p>
            </div>

            <div className="text-center card-elevated">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                   style={{ backgroundColor: 'var(--accent)', width: '48px', height: '48px' }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3">2. Paste Link</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                Paste the video link into our download box above
              </p>
            </div>

            <div className="text-center card-elevated">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                   style={{ backgroundColor: 'var(--warning)', width: '48px', height: '48px' }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v11.586l2.707 2.707A1 1 0 0120 18v-3a1 1 0 00-1-1h-1V4a1 1 0 00-1-1H7a1 1 0 00-1 1v10H5a1 1 0 00-1 1v3a1 1 0 00.293.707L7 21.414V10" />
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3">3. Choose Format</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                Select preferred format - 1080p, 720p, 480p, or audio-only MP3
              </p>
            </div>

            <div className="text-center card-elevated">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                   style={{ backgroundColor: 'var(--primary)', width: '48px', height: '48px' }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3">4. Download</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                Click Download to save the video file to your device
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-sm mb-8" style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Works seamlessly across Windows, Mac, Linux, Android, and iOS devices.
            </p>
          </div>

        </div>
      </section>

      {/* SEO Content */}
      <SEOContent />

      {/* FAQ Section */}
      <section className="faq-section py-24" style={{ backgroundColor: 'var(--background)' }} id="faq">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold" style={{ color: 'var(--text)', letterSpacing: '0.04em', wordSpacing: '0.2em' }}>
              Frequently Asked Questions
            </h2>
            <p className="subtitle" style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Everything you need to know about our YouTube downloader
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="card mb-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>
                Is it legal to download YouTube videos?
              </h3>
              <p className="mb-6" style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Downloading videos for personal, non-commercial use typically falls under fair use. Always respect copyright laws and creator rights. Check YouTube&apos;s Terms of Service and your local regulations.
              </p>
            </div>

            <div className="card mb-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>
                Why isn&apos;t the download working?
              </h3>
              <p className="mb-6" style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Common issues include: Private or age-restricted videos, regional content blocks, outdated browser cache (try clearing cookies), or temporary YouTube API changes.
              </p>
            </div>

            <div className="card mb-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>
                Can I download videos in 4K or 8K?
              </h3>
              <p className="mb-6" style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Yes, if the original YouTube upload supports these resolutions. Our downloader preserves the maximum available quality from the source video.
              </p>
            </div>

            <div className="card mb-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>
                Does it work with YouTube Premium content?
              </h3>
              <p className="mb-6" style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Our tool only accesses publicly available videos. Premium-exclusive content, movies, and TV shows cannot be downloaded.
              </p>
            </div>

            <div className="card mb-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>
                What formats and quality options are supported?
              </h3>
              <div style={{ color: 'var(--text-muted)' }}>
                <p className="mb-6" style={{ lineHeight: '1.6' }}>We support multiple formats and quality options:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-6">
                  <div className="mb-6">
                    <strong className="block mb-3" style={{ color: 'var(--text)' }}>Video Formats:</strong>
                    <p className="mb-3" style={{ lineHeight: '1.6' }}>MP4 (H.264), WebM, 3GP, FLV</p>
                  </div>
                  <div className="mb-6">
                    <strong className="block mb-3" style={{ color: 'var(--text)' }}>Audio Formats:</strong>
                    <p className="mb-3" style={{ lineHeight: '1.6' }}>MP3 (up to 320kbps), M4A, WAV, AAC</p>
                  </div>
                  <div className="mb-6">
                    <strong className="block mb-3" style={{ color: 'var(--text)' }}>Quality Options:</strong>
                    <p className="mb-3" style={{ lineHeight: '1.6' }}>144p - 8K, 60fps support, HDR videos</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>
                Is this YouTube downloader free to use?
              </h3>
              <p className="mb-6" style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Yes, our YouTube video downloader is completely free. No hidden fees, no registration required, and no download limits. No watermarks, no quality loss, no hidden fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
