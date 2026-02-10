'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePlayerStore } from '@/lib/player/store';
import { formatDuration } from '@/lib/tracks';
import { fallbackTracks, getFeaturedTrack } from '@/data/tracks';
import { Visualizer } from './Visualizer';
import {
  PlayIcon,
  PauseIcon,
  PrevIcon,
  NextIcon,
  VolumeHighIcon,
  VolumeMutedIcon,
  VolumeLowIcon,
  CollapseIcon,
  OpenIcon,
} from './PlayerIcons';

/**
 * RealmRadioMobileSheet - Expanded bottom sheet for mobile
 * Design A: Full Controls
 *
 * Slides up when user taps expand on mobile bar
 */
export function RealmRadioMobileSheet() {
  const [mounted, setMounted] = useState(false);

  const {
    tracks,
    isPlaying,
    isMuted,
    volume,
    currentTrackId,
    togglePlay,
    toggleMute,
    setVolume,
    setCurrentTrack,
    nextTrack,
    prevTrack,
    closeMobileSheet,
    isMobileSheetOpen,
    getCurrentTrack,
  } = usePlayerStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // use featured track for SSR, current track after hydration
  const displayTracks = mounted ? tracks : fallbackTracks;
  const track = mounted ? getCurrentTrack() : getFeaturedTrack(fallbackTracks);
  const activeTrackId = mounted ? currentTrackId : getFeaturedTrack(fallbackTracks).id;

  if (!isMobileSheetOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 md:hidden"
        onClick={closeMobileSheet}
      />

      {/* Sheet */}
      <div
        className="
          fixed bottom-0 left-0 right-0
          bg-mossy-bg-box
          border-t-4 border-mossy-border
          rounded-t-2xl
          p-4
          shadow-[0_-10px_40px_rgba(0,0,0,0.5)]
          z-50
          md:hidden
          animate-slide-up
          max-h-[85vh]
          overflow-y-auto
        "
      >
        {/* Handle */}
        <div className="w-10 h-1 bg-mossy-border rounded-full mx-auto mb-4" />

        {/* Close Button */}
        <button
          onClick={closeMobileSheet}
          className="
            absolute top-4 right-4
            w-8 h-8
            bg-mossy-bg-box-alt
            border-2 border-mossy-border
            text-mossy-border
            flex items-center justify-center
            hover:bg-mossy-border hover:text-mossy-bg-box
            transition-colors
          "
          aria-label="Close"
        >
          <CollapseIcon />
        </button>

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="font-display text-xl text-mossy-header">
            * Realm Radio *
          </h2>
          <p className="text-mossy-text-muted text-xs mt-1">
            vishnu is listening to:
          </p>
        </div>

        {/* Cassette Window */}
        <div className="cassette-window p-2 mb-4">
          <Visualizer variant="compact" />
        </div>

        {/* Current Track */}
        <div className="text-center mb-5">
          <div className="font-accent text-mossy-header text-lg">
            {track.title}
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex justify-center items-center gap-4 mb-5">
          <button
            onClick={prevTrack}
            className="
              w-12 h-12
              bg-mossy-bg-box-alt
              border-2 border-mossy-border
              text-mossy-border
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
              w-16 h-16
              bg-mossy-border
              border-2 border-mossy-border-glow
              text-mossy-bg-box
              text-xl font-bold
              hover:bg-mossy-border-glow
              hover:shadow-[0_0_15px_var(--mossy-border-glow)]
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
              w-12 h-12
              bg-mossy-bg-box-alt
              border-2 border-mossy-border
              text-mossy-border
              hover:bg-mossy-border hover:text-mossy-bg-box
              transition-colors
              flex items-center justify-center
            "
            aria-label="Next track"
          >
            <NextIcon />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3 mb-5 px-4">
          <button
            onClick={toggleMute}
            className="text-mossy-border"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeMutedIcon /> : <VolumeLowIcon />}
          </button>
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
          />
          <span className="text-mossy-border">
            <VolumeHighIcon />
          </span>
        </div>

        {/* Playlist */}
        <div className="border-t-2 border-mossy-border pt-4">
          <h4 className="text-mossy-border text-xs uppercase tracking-wider mb-3 font-heading">
            playlist ({displayTracks.length} tracks)
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto scrollbox-content">
            {displayTracks.map((t) => (
              <button
                key={t.id}
                onClick={() => setCurrentTrack(t.id)}
                className={`
                  w-full text-left
                  p-3
                  border transition-colors
                  ${
                    activeTrackId === t.id
                      ? 'bg-mossy-bg-box-alt border-mossy-border border-l-4 border-l-mossy-link'
                      : 'border-mossy-bg-box-alt hover:bg-mossy-bg-box-alt hover:border-mossy-border'
                  }
                `}
              >
                <div className="text-sm text-mossy-text">{t.title}</div>
                <div className="text-xs text-mossy-text-muted flex justify-between">
                  {t.artist && <span>by {t.artist}</span>}
                  {t.duration && <span>{formatDuration(t.duration)}</span>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Open Full Player */}
        <div className="mt-4 text-center">
          <Link
            href="/player"
            onClick={closeMobileSheet}
            className="
              inline-flex items-center gap-2
              bg-mossy-bg-box-alt
              border-2 border-mossy-border
              text-mossy-link
              px-4 py-2
              font-nav
              hover:bg-mossy-border hover:text-mossy-bg-box
              transition-colors
            "
          >
            open full player <OpenIcon />
          </Link>
        </div>
      </div>
    </>
  );
}
