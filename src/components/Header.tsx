'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b"
            style={{
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)'
            }}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="logo">
              <Image
                src="/logo.png"
                alt="YouTube Video Downloader"
                width={40}
                height={40}
                style={{
                  height: '40px',
                  width: 'auto',
                  maxWidth: '100%',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold" style={{ color: '#ffffff' }}>YTubeDown</span>
              <span className="tagline text-xs" style={{ color: '#a0a0a0' }}>Fast & Secure</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-sm hover:text-accent transition-colors">Home</a>
            <a href="#how-it-works" className="text-sm hover:text-accent transition-colors">How It Works</a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <nav className="space-y-2">
              <a href="#home" className="block py-2 text-sm" onClick={() => setIsMenuOpen(false)}>Home</a>
              <a href="#how-it-works" className="block py-2 text-sm" onClick={() => setIsMenuOpen(false)}>How It Works</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}