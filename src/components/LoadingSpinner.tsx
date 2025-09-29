'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-10 h-10 rounded-full animate-spin"
           style={{
             background: `conic-gradient(from 0deg, var(--primary), var(--accent), var(--primary))`,
             padding: '2px'
           }}>
        <div className="w-full h-full rounded-full"
             style={{ background: 'var(--background)' }}>
        </div>
      </div>
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        Analyzing video...
      </p>
    </div>
  );
}