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
  OpenIcon,
} from './PlayerIcons';

/**
 * RealmRadioDock - Floating mini panel for non-homepage routes
 */
export function RealmRadioDock() {
  const [mounted, setMounted] = useState(false);

  const {
    isPlaying,
    isMuted,
    togglePlay,
    toggleMute,
    getCurrentTrack,
  } = usePlayerStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const track = mounted ? getCurrentTrack() : getFeaturedTrack(fallbackTracks);

  return (
    <div
      className="
        fixed bottom-5 right-5
        bg-surface-panel
        border-frame border-border-structural
        shadow-lift
        p-2 min-w-40
        z-40
        hidden md:flex flex-col gap-1.5
      "
    >
      <div className="flex items-center gap-1.5 text-fg-secondary text-micro uppercase tracking-wider">
        <StatusDot isPlaying={mounted && isPlaying} />
        <span>realm radio</span>
      </div>

      <div className="font-accent text-fg-heading text-sm truncate max-w-32">
        {track.title}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <IconButton
            variant="primary"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </IconButton>
          <IconButton
            variant="ghost"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            aria-pressed={isMuted}
          >
            {isMuted ? <VolumeMutedIcon /> : <VolumeHighIcon />}
          </IconButton>
        </div>
        <IconButton variant="ghost" href="/player" aria-label="Open full player">
          <OpenIcon />
        </IconButton>
      </div>
    </div>
  );
}
