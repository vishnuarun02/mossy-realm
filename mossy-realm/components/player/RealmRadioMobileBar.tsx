'use client';

import { useState, useEffect } from 'react';
import { usePlayerStore } from '@/lib/player/store';
import { getFeaturedTrack } from '@/data/tracks';
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
  const track = mounted ? getCurrentTrack() : getFeaturedTrack();

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0
        h-15
        bg-mossy-bg-box
        border-t-3 border-mossy-border
        flex items-center
        px-3 gap-3
        z-50
        md:hidden
      "
    >
      {/* Music Icon */}
      <span className="text-2xl text-mossy-border">
        <MusicNoteIcon />
      </span>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <div className="font-accent text-mossy-header text-sm truncate">
          {track.title}
        </div>
        <div className="flex items-center gap-1.5 text-mossy-text-muted text-xs">
          <StatusDot isPlaying={mounted && isPlaying} />
          <span>{mounted && isPlaying ? 'playing' : 'paused'}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={togglePlay}
          className="
            w-11 h-11
            bg-mossy-border
            border-2 border-mossy-border-glow
            text-mossy-bg-box
            text-sm font-bold
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
            w-11 h-11
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
        <button
          onClick={openMobileSheet}
          className="
            w-11 h-11
            bg-mossy-bg-box-alt
            border-2 border-mossy-border
            text-mossy-border
            text-sm
            hover:bg-mossy-border hover:text-mossy-bg-box
            transition-colors
            flex items-center justify-center
          "
          aria-label="Expand player"
        >
          <ExpandIcon />
        </button>
      </div>
    </div>
  );
}
