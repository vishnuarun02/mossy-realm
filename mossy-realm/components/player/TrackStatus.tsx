'use client';

/**
 * TrackStatus - the LED status row.
 *
 * Green steady LED while playing, amber blinking LED while paused.
 * Text announces state so it never depends on LED color alone.
 * Blinking stops under prefers-reduced-motion (global rule).
 */

interface TrackStatusProps {
  isPlaying: boolean;
  className?: string;
}

export default function TrackStatus({ isPlaying, className = '' }: TrackStatusProps) {
  return (
    <div
      className={`
        flex items-center justify-center gap-2
        text-micro uppercase tracking-wider text-fg-secondary
        ${className}
      `}
    >
      <span
        aria-hidden="true"
        className={isPlaying ? 'cassette-led' : 'cassette-led-amber cassette-led-blink'}
      />
      <span aria-live="polite">{isPlaying ? 'listening' : 'paused'}</span>
      <span
        aria-hidden="true"
        className={isPlaying ? 'cassette-led' : 'cassette-led-amber cassette-led-blink'}
      />
    </div>
  );
}
