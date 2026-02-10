'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import RetroBox from '@/components/RetroBox';
import { usePlayerStore } from '@/lib/player/store';
import { fallbackTracks, getFeaturedTrack } from '@/data/tracks';
import { Visualizer } from './Visualizer';
import {
  PlayIcon,
  PauseIcon,
  PrevIcon,
  NextIcon,
  VolumeHighIcon,
  VolumeMutedIcon,
  OpenIcon,
} from './PlayerIcons';

/**
 * RealmRadioWidget - Homepage sidebar player (Cassette Deck)
 */
export function RealmRadioWidget() {
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

  const track = mounted ? getCurrentTrack() : getFeaturedTrack(fallbackTracks);

  return (
    <RetroBox title="-= realm radio =-">
      <div className="cassette-shell p-2 relative">
        <div className="absolute top-2 left-2 cassette-led" />
        <div className="absolute top-2 right-2 cassette-led" />
        <div className="absolute bottom-2 left-2 cassette-led-amber" />
        <div className="absolute bottom-2 right-2 cassette-led-amber" />

        <div className="flex items-center justify-center gap-2 text-[0.62rem] uppercase tracking-wider text-mossy-text-muted mb-2">
          <span className={mounted && isPlaying ? 'cassette-led' : 'cassette-led-amber cassette-led-blink'} />
          <span>{mounted && isPlaying ? 'listening' : 'paused'}</span>
          <span className={mounted && isPlaying ? 'cassette-led' : 'cassette-led-amber cassette-led-blink'} />
        </div>

        <div className="cassette-window p-2">
          <Visualizer variant="compact" />
        </div>

        <div className="cassette-label mt-2 px-2 py-2 text-center">
          <div className="font-accent text-mossy-header text-[0.7rem] leading-tight break-words">
            {track.title}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-2">
          <button
            onClick={prevTrack}
            className="h-8 bg-mossy-bg-box-alt border-2 border-mossy-border text-mossy-border hover:bg-mossy-border hover:text-mossy-bg-box transition-colors flex items-center justify-center"
            aria-label="Previous track"
          >
            <PrevIcon />
          </button>
          <button
            onClick={togglePlay}
            className="h-8 bg-mossy-border border-2 border-mossy-border-glow text-mossy-bg-box hover:bg-mossy-border-glow transition-colors flex items-center justify-center"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            onClick={nextTrack}
            className="h-8 bg-mossy-bg-box-alt border-2 border-mossy-border text-mossy-border hover:bg-mossy-border hover:text-mossy-bg-box transition-colors flex items-center justify-center"
            aria-label="Next track"
          >
            <NextIcon />
          </button>
          <button
            onClick={toggleMute}
            className="h-8 bg-mossy-bg-box-alt border-2 border-mossy-border text-mossy-border hover:bg-mossy-border hover:text-mossy-bg-box transition-colors flex items-center justify-center"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeMutedIcon /> : <VolumeHighIcon />}
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs mt-2 overflow-hidden">
          <span className="text-mossy-text-muted font-nav">Vol</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={(e) => setVolume(Number(e.target.value) / 100)}
            className="cassette-slider flex-1 min-w-0 cursor-pointer w-full"
          />
        </div>

        <div className="mt-2 text-center">
          <Link
            href="/player"
            className="text-xs font-nav text-mossy-link hover:text-mossy-link-hover inline-flex items-center gap-1 justify-center w-full"
          >
            open player <OpenIcon className="inline-block" />
          </Link>
        </div>
      </div>
    </RetroBox>
  );
}
