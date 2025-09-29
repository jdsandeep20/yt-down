'use client';

import Image from 'next/image';

interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  viewCount: string;
}

interface VideoPreviewProps {
  videoInfo: VideoInfo;
}

export default function VideoPreview({ videoInfo }: VideoPreviewProps) {
  return (
    <div className="card">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-full md:w-64 h-36 rounded-lg overflow-hidden">
          <Image
            src={videoInfo.thumbnail}
            alt={videoInfo.title}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 rounded text-xs">
            {videoInfo.duration}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2 line-clamp-2">
            {videoInfo.title}
          </h3>

          <div className="space-y-2 text-sm">
            <p><strong>Channel:</strong> {videoInfo.author}</p>
            <p><strong>Views:</strong> {videoInfo.viewCount}</p>
          </div>

          <div className="flex gap-2 mt-4">
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded status-success">
              ✓ Ready to Download
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}