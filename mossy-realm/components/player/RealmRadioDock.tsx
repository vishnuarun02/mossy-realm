'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePlayerStore } from '@/lib/player/store';
import { fallbackTracks, getFeaturedTrack } from '@/data/tracks';
import { 
  PlayIcon, 
  PauseIcon, 
  VolumeHighIcon, 
  VolumeMutedIcon,
  StatusDot,
  OpenIcon
} from './PlayerIcons';

/**
 * RealmRadioDock - Floating mini panel for non-homepage routes
 * Design B: Mini Panel (desktop only)
 * 
 * Fixed position bottom-right
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

  // use featured track for SSR, current track after hydration
  const track = mounted ? getCurrentTrack() : getFeaturedTrack(fallbackTracks);

  return (
    <div
      className="
        fixed bottom-5 right-5
        bg-mossy-bg-box
        border-3 border-mossy-border
        shadow-[0_4px_20px_rgba(0,0,0,0.5)]
        p-2 min-w-40
        z-50
        hidden md:flex flex-col gap-1.5
      "
    >
      {/* Header with status */}
      <div className="flex items-center gap-1.5 text-mossy-text-muted text-[0.7rem] uppercase tracking-wider">
        <StatusDot isPlaying={mounted && isPlaying} />
        <span>realm radio</span>
      </div>

      {/* Track title */}
      <div className="font-accent text-mossy-header text-sm truncate max-w-32">
        {track.title}
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <button
            onClick={togglePlay}
            className="
              w-8 h-8
              bg-mossy-border
              border-2 border-mossy-border-glow
              text-mossy-bg-box
              text-xs font-bold
              hover:bg-mossy-border-glow
              transition-colors
              flex items-center justify-center
            "
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            onClick={toggleMute}
            className="
              w-8 h-8
              bg-mossy-bg-box-alt
              border-2 border-mossy-border
              text-mossy-border
              text-xs
              hover:bg-mossy-border hover:text-mossy-bg-box
              transition-colors
              flex items-center justify-center
            "
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeMutedIcon /> : <VolumeHighIcon />}
          </button>
        </div>
        <Link
          href="/player"
          className="
            bg-mossy-bg-box-alt
            border-2 border-mossy-border
            text-mossy-link
            px-2 py-1
            text-xs font-nav
            hover:bg-mossy-border hover:text-mossy-bg-box
            transition-colors
            flex items-center gap-1
          "
        >
          <OpenIcon />
        </Link>
      </div>
    </div>
  );
}
