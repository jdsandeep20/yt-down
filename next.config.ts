import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Optimize for production deployment on Railway with Docker
  output: 'standalone',

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Fix workspace root warning
  outputFileTracingRoot: path.join(__dirname),

  // Image optimization for YouTube thumbnails
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
    ],
  },

  // External packages for server components (Railway compatibility)
  serverExternalPackages: ['@distube/ytdl-core', 'youtube-dl-exec', 'fluent-ffmpeg'],

  // Webpack configuration for better compatibility
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Handle node modules for server-side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }

    return config;
  },

  // Experimental features for Railway optimization
  experimental: {
    // Server components external packages
    serverComponentsExternalPackages: ['@distube/ytdl-core'],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};

export default nextConfig;