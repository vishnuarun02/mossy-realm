'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import RetroBox from '@/components/RetroBox';
import { usePlayerStore } from '@/lib/player/store';
import { getFeaturedTrack } from '@/data/tracks';
import { Visualizer } from './Visualizer';
import { 
  PlayIcon, 
  PauseIcon, 
  PrevIcon, 
  NextIcon, 
  VolumeHighIcon, 
  VolumeMutedIcon,
  StatusDot,
  OpenIcon
} from './PlayerIcons';

/**
 * RealmRadioWidget - Homepage sidebar player
 * Design A (Winamp visualizer) + Design C (status dot)
 * 
 * Fits in 190px sidebar
 */
export function RealmRadioWidget() {
  // use static default for SSR, then hydrate with store value
  const [mounted, setMounted] = useState(false);
  
  const {
    isPlaying,
    isMuted,
    volume,
    togglePlay,
    toggleMute,
    setVolume,
    nextTrack,
    prevTrack,
    getCurrentTrack,
  } = usePlayerStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // use featured track for SSR, current track after hydration
  const track = mounted ? getCurrentTrack() : getFeaturedTrack();

  return (
    <RetroBox title="-= realm radio =-">
      <div 
        className="text-center"
        style={{
          background: 'linear-gradient(180deg, var(--mossy-bg-box-alt) 0%, var(--mossy-bg-box) 100%)',
          margin: '-12px',
          padding: '12px',
        }}
      >
        {/* Visualizer */}
        <Visualizer />

        {/* Track Info with Status Dot */}
        <div className="mb-3">
          <div className="flex items-center justify-center gap-2 text-mossy-text-muted text-xs uppercase tracking-wider">
            <StatusDot isPlaying={mounted && isPlaying} />
            <span>{mounted && isPlaying ? 'listening' : 'paused'}</span>
          </div>
          <div className="font-accent text-mossy-header text-base mt-1 truncate">
            {track.title}
          </div>
        </div>

        {/* Transport Controls */}
        <div className="flex justify-center gap-2 mb-3">
          <button
            onClick={prevTrack}
            className="
              w-9 h-9
              bg-mossy-bg-box-alt
              border-2 border-mossy-border
              text-mossy-border
              text-xs
              hover:bg-mossy-border hover:text-mossy-bg-box
              transition-colors
              flex items-center justify-center
            "
            aria-label="Previous track"
          >
            <PrevIcon />
          </button>
          <button
            onClick={togglePlay}
            className="
              w-9 h-9
              bg-mossy-border
              border-2 border-mossy-border-glow
              text-mossy-bg-box
              text-sm font-bold
              hover:bg-mossy-border-glow
              hover:shadow-[0_0_10px_var(--mossy-border-glow)]
              transition-all
              flex items-center justify-center
            "
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            onClick={nextTrack}
            className="
              w-9 h-9
              bg-mossy-bg-box-alt
              border-2 border-mossy-border
              text-mossy-border
              text-xs
              hover:bg-mossy-border hover:text-mossy-bg-box
              transition-colors
              flex items-center justify-center
            "
            aria-label="Next track"
          >
            <NextIcon />
          </button>
          <button
            onClick={toggleMute}
            className="
              w-9 h-9
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

        {/* Volume Slider */}
        <div className="flex items-center gap-2 text-xs mb-3">
          <span className="text-mossy-text-muted font-nav">Vol</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={(e) => setVolume(Number(e.target.value) / 100)}
            className="
              flex-1 h-2
              bg-mossy-bg-box
              border-2 border-mossy-border
              cursor-pointer
              accent-mossy-border
            "
            style={{
              WebkitAppearance: 'none',
              appearance: 'none',
            }}
          />
        </div>

        {/* Open Player Link */}
        <Link 
          href="/player"
          className="
            text-xs font-nav
            text-mossy-link hover:text-mossy-link-hover
            inline-flex items-center gap-1
          "
        >
          open player <OpenIcon />
        </Link>
      </div>
    </RetroBox>
  );
}
