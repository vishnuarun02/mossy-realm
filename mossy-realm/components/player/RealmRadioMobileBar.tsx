'use client';

import { useState, useEffect } from 'react';
import IconButton from '@/components/ui/IconButton';
import { usePlayerStore } from '@/lib/player/store';
import { fallbackTracks, getFeaturedTrack } from '@/data/tracks';
import {
  PlayIcon,
  PauseIcon,
  VolumeHighIcon,
  VolumeMutedIcon,
  StatusDot,
  ExpandIcon,
  MusicNoteIcon
} from './PlayerIcons';

/**
 * RealmRadioMobileBar - Bottom sticky bar for mobile
 * Design A: Standard mobile bar
 *
 * Fixed position bottom, always visible on mobile
 */
export function RealmRadioMobileBar() {
  const [mounted, setMounted] = useState(false);

  const {
    isPlaying,
    isMuted,
    togglePlay,
    toggleMute,
    openMobileSheet,
    getCurrentTrack,
  } = usePlayerStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // use featured track for SSR, current track after hydration
  const track = mounted ? getCurrentTrack() : getFeaturedTrack(fallbackTracks);

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0
        h-15
        bg-surface-panel
        border-t-frame border-border-structural
        flex items-center
        px-3 gap-3
        z-40
        md:hidden
      "
    >
      {/* Music Icon */}
      <span className="text-2xl text-border-structural" aria-hidden="true">
        <MusicNoteIcon />
      </span>

      {/* Track Info - tap opens the full sheet */}
      <button
        onClick={openMobileSheet}
        className="flex-1 min-w-0 text-left cursor-pointer"
        aria-label="Open full player"
      >
        <div className="font-accent text-fg-heading text-sm truncate">
          {track.title}
        </div>
        <div className="flex items-center gap-1.5 text-fg-secondary text-xs">
          <StatusDot isPlaying={mounted && isPlaying} />
          <span>{mounted && isPlaying ? 'playing' : 'paused'}</span>
        </div>
      </button>

      {/* Controls */}
      <div className="flex gap-2">
        <IconButton
          variant="primary"
          density="regular"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </IconButton>
        <IconButton
          variant="ghost"
          density="regular"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          aria-pressed={isMuted}
        >
          {isMuted ? <VolumeMutedIcon /> : <VolumeHighIcon />}
        </IconButton>
        <IconButton
          variant="ghost"
          density="regular"
          onClick={openMobileSheet}
          aria-label="Expand player"
        >
          <ExpandIcon />
        </IconButton>
      </div>
    </div>
  );
}
