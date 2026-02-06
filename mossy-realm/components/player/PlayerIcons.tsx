'use client';

/**
 * 90s-style ASCII/Unicode icons for the player
 * No modern emojis - only characters that could exist in the 90s
 */

export function PlayIcon({ className = '' }: { className?: string }) {
  return (
    <span className={className} aria-label="Play">
      ▶
    </span>
  );
}

export function PauseIcon({ className = '' }: { className?: string }) {
  return (
    <span className={className} aria-label="Pause">
      ❚❚
    </span>
  );
}

export function StopIcon({ className = '' }: { className?: string }) {
  return (
    <span className={className} aria-label="Stop">
      ■
    </span>
  );
}

export function PrevIcon({ className = '' }: { className?: string }) {
  return (
    <span className={className} aria-label="Previous">
      ◀◀
    </span>
  );
}

export function NextIcon({ className = '' }: { className?: string }) {
  return (
    <span className={className} aria-label="Next">
      ▶▶
    </span>
  );
}

export function VolumeHighIcon({ className = '' }: { className?: string }) {
  return (
    <span className={className} aria-label="Volume" style={{ fontFamily: 'monospace', letterSpacing: '-2px' }}>
      ◀)))
    </span>
  );
}

export function VolumeMutedIcon({ className = '' }: { className?: string }) {
  return (
    <span className={className} aria-label="Muted" style={{ fontFamily: 'monospace' }}>
      ◀ ×
    </span>
  );
}

export function VolumeLowIcon({ className = '' }: { className?: string }) {
  return (
    <span className={className} aria-label="Volume Low" style={{ fontFamily: 'monospace', letterSpacing: '-2px' }}>
      ◀)
    </span>
  );
}

export function ExpandIcon({ className = '' }: { className?: string }) {
  return (
    <span className={className} aria-label="Expand">
      ↑
    </span>
  );
}

export function CollapseIcon({ className = '' }: { className?: string }) {
  return (
    <span className={className} aria-label="Collapse">
      ↓
    </span>
  );
}

export function OpenIcon({ className = '' }: { className?: string }) {
  return (
    <span className={className} aria-label="Open">
      ↗
    </span>
  );
}

export function MusicNoteIcon({ className = '' }: { className?: string }) {
  return (
    <span className={className} aria-label="Music">
      ♪
    </span>
  );
}

export function StatusDot({ 
  isPlaying, 
  className = '' 
}: { 
  isPlaying: boolean; 
  className?: string;
}) {
  return (
    <span 
      className={`
        inline-block w-2 h-2 rounded-full
        ${isPlaying 
          ? 'bg-mossy-link shadow-[0_0_6px_var(--mossy-link)] animate-pulse' 
          : 'bg-mossy-text-muted'
        }
        ${className}
      `}
      aria-label={isPlaying ? 'Playing' : 'Paused'}
    />
  );
}

