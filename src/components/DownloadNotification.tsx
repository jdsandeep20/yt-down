'use client';

import { useEffect } from 'react';

interface DownloadNotificationProps {
  isVisible: boolean;
  fileName: string;
  onClose: () => void;
}

export default function DownloadNotification({ isVisible, fileName, onClose }: DownloadNotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto close after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-notification-slide-in">
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Download Complete!</p>
            <p className="text-xs text-green-100 mt-1">
              <strong>{fileName}</strong> has been exported to your downloads folder.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-green-200 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress bar animation */}
        <div className="mt-3 bg-green-400 h-1 rounded-full overflow-hidden">
          <div className="h-full bg-white animate-progress-bar"></div>
        </div>
      </div>
    </div>
  );
}