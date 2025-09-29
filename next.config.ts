import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
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
  // Optimize for Vercel deployment
  poweredByHeader: false,
  compress: true,
  // Fix workspace root warning
  outputFileTracingRoot: path.join(__dirname),
  // External packages for server components
  serverExternalPackages: ['@distube/ytdl-core', 'youtube-dl-exec', 'fluent-ffmpeg'],
};

export default nextConfig;
