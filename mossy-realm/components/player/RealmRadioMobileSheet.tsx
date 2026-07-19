'use client';

import { useState, useEffect } from 'react';
import IconButton from '@/components/ui/IconButton';
import TextLink from '@/components/ui/TextLink';
import { usePlayerStore } from '@/lib/player/store';
import { formatDuration } from '@/lib/tracks';
import { fallbackTracks, getFeaturedTrack } from '@/data/tracks';
import { Visualizer } from './Visualizer';
import PlayerControls from './PlayerControls';
import VolumeControl from './VolumeControl';
import {
  CollapseIcon,
  OpenIcon,
} from './PlayerIcons';

/**
 * RealmRadioMobileSheet - Expanded bottom sheet for mobile
 * Design A: Full Controls
 *
 * Slides up when user taps expand on mobile bar.
 * Behaves like a dialog: Escape closes, backdrop closes.
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

  // Escape closes the sheet
  useEffect(() => {
    if (!isMobileSheetOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobileSheet();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMobileSheetOpen, closeMobileSheet]);

  // use featured track for SSR, current track after hydration
  const displayTracks = mounted ? tracks : fallbackTracks;
  const track = mounted ? getCurrentTrack() : getFeaturedTrack(fallbackTracks);
  const activeTrackId = mounted ? currentTrackId : getFeaturedTrack(fallbackTracks).id;

  if (!isMobileSheetOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={closeMobileSheet}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Realm Radio full player"
        className="
          fixed bottom-0 left-0 right-0
          bg-surface-panel
          border-t-site border-border-structural
          rounded-t-2xl
          p-4
          shadow-lift
          z-40
          md:hidden
          animate-slide-up
          max-h-[85vh]
          overflow-y-auto
        "
      >
        {/* Handle */}
        <div className="w-10 h-1 bg-border-structural rounded-full mx-auto mb-4" aria-hidden="true" />

        {/* Close Button */}
        <IconButton
          variant="ghost"
          onClick={closeMobileSheet}
          aria-label="Close player"
          className="absolute top-4 right-4"
        >
          <CollapseIcon />
        </IconButton>

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="font-display text-xl text-fg-heading">
            * Realm Radio *
          </h2>
          <p className="text-fg-secondary text-xs mt-1">
            vishnu is listening to:
          </p>
        </div>

        {/* Cassette Window */}
        <div className="cassette-window p-2 mb-4">
          <Visualizer variant="compact" />
        </div>

        {/* Current Track */}
        <div className="text-center mb-5">
          <div className="font-accent text-fg-heading text-lg break-words">
            {track.title}
          </div>
        </div>

        {/* Main Controls */}
        <PlayerControls
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onPrev={prevTrack}
          onNext={nextTrack}
          size="lg"
          className="mb-5"
        />

        {/* Volume */}
        <VolumeControl
          volume={volume}
          isMuted={isMuted}
          onSetVolume={setVolume}
          onToggleMute={toggleMute}
          showMute
          className="mb-5 px-4"
        />

        {/* Playlist */}
        <div className="border-t-2 border-border-structural pt-4">
          <h3 className="text-border-structural text-xs uppercase tracking-wider mb-3 font-heading">
            playlist ({displayTracks.length} tracks)
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto scrollbox-content">
            {displayTracks.map((t) => {
              const isActive = activeTrackId === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setCurrentTrack(t.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`
                    w-full text-left
                    p-3
                    border transition-colors duration-fast
                    cursor-pointer
                    ${
                      isActive
                        ? 'bg-surface-panel-alt border-border-structural border-l-4 border-l-link'
                        : 'border-surface-panel-alt hover:bg-surface-panel-alt hover:border-border-structural'
                    }
                  `}
                >
                  <div className="text-sm text-fg-primary">{t.title}</div>
                  <div className="text-xs text-fg-secondary flex justify-between">
                    {t.artist && <span>by {t.artist}</span>}
                    {t.duration && <span>{formatDuration(t.duration)}</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Open Full Player */}
        <div className="mt-4 text-center">
          <TextLink
            href="/player"
            onClick={closeMobileSheet}
            underline={false}
            className="
              inline-flex items-center gap-2
              bg-surface-panel-alt
              border-panel border-border-structural
              px-4 py-2
              font-nav
              hover:bg-surface-strip hover:text-fg-inverse
              transition-colors duration-fast
            "
          >
            open full player <OpenIcon />
          </TextLink>
        </div>
      </div>
    </>
  );
}
