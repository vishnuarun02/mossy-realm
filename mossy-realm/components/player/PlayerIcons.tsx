'use client';

/**
 * Player icons - 90s transport shapes (triangles/squares)
 */

function IconBase({
  children,
  className = '',
  label,
  size = 16,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
  size?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-label={label}
      role="img"
    >
      {children}
    </svg>
  );
}

export function PlayIcon({ className = '' }: { className?: string }) {
  return (
    <IconBase className={className} label="Play">
      <polygon points="5,3 13,8 5,13" />
    </IconBase>
  );
}

export function PauseIcon({ className = '' }: { className?: string }) {
  return (
    <IconBase className={className} label="Pause">
      <rect x="4" y="3" width="3" height="10" />
      <rect x="9" y="3" width="3" height="10" />
    </IconBase>
  );
}

export function StopIcon({ className = '' }: { className?: string }) {
  return (
    <IconBase className={className} label="Stop">
      <rect x="4" y="4" width="8" height="8" />
    </IconBase>
  );
}

export function PrevIcon({ className = '' }: { className?: string }) {
  return (
    <IconBase className={className} label="Previous">
      <polygon points="11,3 5,8 11,13" />
      <polygon points="8,3 2,8 8,13" />
    </IconBase>
  );
}

export function NextIcon({ className = '' }: { className?: string }) {
  return (
    <IconBase className={className} label="Next">
      <polygon points="5,3 11,8 5,13" />
      <polygon points="8,3 14,8 8,13" />
    </IconBase>
  );
}

export function VolumeHighIcon({ className = '' }: { className?: string }) {
  return (
    <IconBase className={className} label="Volume">
      <polygon points="2,6 6,6 9,3 9,13 6,10 2,10" />
      <path d="M11 5 C12.5 6, 12.5 10, 11 11" stroke="currentColor" fill="none" strokeWidth="1.2" />
      <path d="M12.5 3.5 C15 5.5, 15 10.5, 12.5 12.5" stroke="currentColor" fill="none" strokeWidth="1.2" />
    </IconBase>
  );
}

export function VolumeMutedIcon({ className = '' }: { className?: string }) {
  return (
    <IconBase className={className} label="Muted">
      <polygon points="2,6 6,6 9,3 9,13 6,10 2,10" />
      <line x1="11" y1="5" x2="14" y2="11" stroke="currentColor" strokeWidth="1.4" />
      <line x1="14" y1="5" x2="11" y2="11" stroke="currentColor" strokeWidth="1.4" />
    </IconBase>
  );
}

export function VolumeLowIcon({ className = '' }: { className?: string }) {
  return (
    <IconBase className={className} label="Volume Low">
      <polygon points="2,6 6,6 9,3 9,13 6,10 2,10" />
      <path d="M11 6 C12 7, 12 9, 11 10" stroke="currentColor" fill="none" strokeWidth="1.2" />
    </IconBase>
  );
}

export function ExpandIcon({ className = '' }: { className?: string }) {
  return (
    <IconBase className={className} label="Expand">
      <polygon points="8,3 13,8 3,8" />
    </IconBase>
  );
}

export function CollapseIcon({ className = '' }: { className?: string }) {
  return (
    <IconBase className={className} label="Collapse">
      <polygon points="3,8 13,8 8,13" />
    </IconBase>
  );
}

export function OpenIcon({ className = '' }: { className?: string }) {
  return (
    <IconBase className={className} label="Open">
      <polyline points="6,2 14,2 14,10" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <line x1="14" y1="2" x2="5" y2="11" stroke="currentColor" strokeWidth="1.4" />
      <rect x="2" y="6" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </IconBase>
  );
}

export function MusicNoteIcon({ className = '' }: { className?: string }) {
  return (
    <IconBase className={className} label="Music">
      <path d="M10 3v7.5a2 2 0 1 1-1-.2V5.5l-4 .8V12a2 2 0 1 1-1-.2V6l6-1.2V3z" />
    </IconBase>
  );
}

export function StatusDot({
  isPlaying,
  className = '',
}: {
  isPlaying: boolean;
  className?: string;
}) {
  return (
    <span
      className={`
        inline-block w-2 h-2 rounded-full
        ${isPlaying
          ? 'bg-mossy-link shadow-[0_0_6px_var(--mossy-link)]'
          : 'bg-mossy-accent shadow-[0_0_8px_var(--mossy-accent)]'
        }
        ${className}
      `}
      style={{
        animation: isPlaying
          ? 'pulse 1.2s ease-in-out infinite'
          : 'blink 1s ease-in-out infinite',
      }}
      aria-label={isPlaying ? 'Playing' : 'Click to play'}
    />
  );
}
