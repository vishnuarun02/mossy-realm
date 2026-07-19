'use client';

import { useEffect, useState } from 'react';
import { usePlayerStore } from '@/lib/player/store';
import { formatDuration } from '@/lib/tracks';
import { Visualizer } from '@/components/player/Visualizer';
import PlayerControls from '@/components/player/PlayerControls';
import TrackStatus from '@/components/player/TrackStatus';
import VolumeControl from '@/components/player/VolumeControl';
import Panel from '@/components/ui/Panel';
import EmptyState from '@/components/ui/EmptyState';

/**
 * PlayerDeck - the full cassette deck experience (/player page).
 *
 * The hero object: shell, window, label, transport, volume, and the
 * tape shelf (playlist). Audio behavior lives in the player store;
 * this component only renders state.
 */
export default function PlayerDeck() {
  const [mounted, setMounted] = useState(false);

  const {
    tracks,
    tracksLoaded,
    isPlaying,
    isMuted,
    volume,
    currentTrackId,
    currentTime,
    duration,
    togglePlay,
    toggleMute,
    setVolume,
    setCurrentTrack,
    nextTrack,
    prevTrack,
    getCurrentTrack,
  } = usePlayerStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTrack = getCurrentTrack();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* The deck */}
      <div className="cassette-shell p-4 relative">
        <div className="absolute top-3 left-3 cassette-led" aria-hidden="true" />
        <div className="absolute top-3 right-3 cassette-led" aria-hidden="true" />
        <div className="absolute bottom-3 left-3 cassette-led-amber" aria-hidden="true" />
        <div className="absolute bottom-3 right-3 cassette-led-amber" aria-hidden="true" />

        <TrackStatus isPlaying={mounted && isPlaying} className="mb-3" />

        <div className="cassette-window p-2">
          <Visualizer variant="full" />
        </div>

        <div className="cassette-label mt-3 px-3 py-2 text-center">
          <div className="text-fg-secondary text-micro uppercase tracking-wider">
            {mounted && isPlaying ? 'now playing' : 'paused'}
          </div>
          <div className="font-accent text-fg-heading text-base leading-tight break-words">
            {currentTrack.title}
          </div>
          {currentTrack.artist && (
            <div className="text-fg-secondary text-sm">
              {currentTrack.artist}
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="px-2 py-3">
          <div className="flex items-center gap-2 text-xs text-fg-secondary font-mono">
            <span>{mounted ? formatTime(currentTime) : '0:00'}</span>
            <div
              className="flex-1 h-2 bg-surface-panel-alt border-hairline border-border-structural relative"
              role="progressbar"
              aria-label="Track progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <div
                className="h-full bg-gradient-to-r from-link to-accent"
                style={{ width: `${mounted ? progress : 0}%` }}
              />
            </div>
            <span>{formatTime(duration || currentTrack.duration || 0)}</span>
          </div>
        </div>

        <PlayerControls
          isPlaying={mounted && isPlaying}
          onTogglePlay={togglePlay}
          onPrev={prevTrack}
          onNext={nextTrack}
          size="lg"
          className="px-2 pb-3"
        />

        <VolumeControl
          volume={mounted ? volume : 0.7}
          isMuted={mounted && isMuted}
          onSetVolume={setVolume}
          onToggleMute={toggleMute}
          showMute
          className="px-2 pb-2"
        />
      </div>

      {/* The tape shelf */}
      <Panel
        title={`playlist (${tracks.length} tracks)`}
        titleRight={!tracksLoaded ? 'loading…' : undefined}
        padding="none"
        className="mt-4"
      >
        <div className="max-h-64 overflow-y-auto scrollbox-content">
          {tracks.length === 0 && tracksLoaded ? (
            <EmptyState
              title="~ empty shelf ~"
              message="no tapes on the shelf yet. drop mp3s in the bucket and they appear here."
            />
          ) : (
            tracks.map((track, index) => {
              const isActive = mounted && currentTrackId === track.id;
              return (
                <button
                  key={track.id}
                  onClick={() => setCurrentTrack(track.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`
                    w-full text-left px-3 py-2.5
                    border-b-hairline border-surface-panel-alt
                    transition-colors duration-fast
                    flex items-center gap-2
                    cursor-pointer
                    ${isActive
                      ? 'bg-surface-panel-alt text-fg-heading'
                      : 'hover:bg-surface-panel-alt text-fg-primary'
                    }
                  `}
                >
                  <span className="text-fg-secondary text-xs w-5" aria-hidden="true">
                    {isActive && isPlaying ? '▶' : `${index + 1}.`}
                  </span>
                  <span className="flex-1 truncate text-sm">{track.title}</span>
                  <span className="text-fg-secondary text-xs">
                    {track.duration ? formatDuration(track.duration) : ''}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </Panel>
    </>
  );
}
