'use client';

import IconButton from '@/components/ui/IconButton';
import { PlayIcon, PauseIcon, PrevIcon, NextIcon } from './PlayerIcons';

/**
 * PlayerControls - the shared transport cluster.
 *
 * prev / play / next with one visual language across all five radio
 * surfaces (widget, page, dock, mobile bar, mobile sheet). Play is
 * always the amber primary; neighbors are moss ghosts.
 *
 * Sizes:
 * - `sm`: 32px desktop chrome (homepage widget). Grows to 44px on touch.
 * - `md`: 44px (mobile bar, player page).
 * - `lg`: big 64px play with 44px neighbors (mobile sheet).
 */

interface PlayerControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: { neighbor: 'w-8 h-8 touch-target', play: 'w-8 h-8 touch-target' },
  md: { neighbor: 'w-11 h-11', play: 'w-11 h-11' },
  lg: { neighbor: 'w-12 h-12', play: 'w-16 h-16' },
} as const;

export default function PlayerControls({
  isPlaying,
  onTogglePlay,
  onPrev,
  onNext,
  size = 'sm',
  className = '',
}: PlayerControlsProps) {
  const sizes = sizeClasses[size];

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <IconButton
        variant="ghost"
        density="none"
        className={sizes.neighbor}
        onClick={onPrev}
        aria-label="Previous track"
      >
        <PrevIcon />
      </IconButton>
      <IconButton
        variant="primary"
        density="none"
        className={sizes.play}
        onClick={onTogglePlay}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </IconButton>
      <IconButton
        variant="ghost"
        density="none"
        className={sizes.neighbor}
        onClick={onNext}
        aria-label="Next track"
      >
        <NextIcon />
      </IconButton>
    </div>
  );
}
