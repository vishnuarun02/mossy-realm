'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePlayerStore } from '@/lib/player/store';
import { formatDuration } from '@/lib/tracks';
import { Visualizer } from '@/components/player/Visualizer';
import { AudioEngine } from '@/lib/player/AudioEngine';
import {
  PlayIcon,
  PauseIcon,
  PrevIcon,
  NextIcon,
  VolumeHighIcon,
  VolumeMutedIcon,
  VolumeLowIcon,
} from '@/components/player/PlayerIcons';

export default function PlayerPage() {
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
      {/* Audio Engine - needed on this page since it's excluded from provider */}
      <AudioEngine />

      <div className="min-h-screen flex items-center justify-center p-4">
        <div
          className="
            w-full max-w-md
            bg-mossy-bg-box
            border-4 border-mossy-border
            shadow-[8px_8px_0_rgba(0,0,0,0.3)]
          "
          style={{
            boxShadow: `
              inset 2px 2px 0 rgba(255,255,255,0.1),
              inset -2px -2px 0 rgba(0,0,0,0.2),
              8px 8px 0 rgba(0,0,0,0.3)
            `,
          }}
        >
          {/* Header */}
          <div
            className="
              bg-gradient-to-r from-mossy-border to-mossy-accent
              px-3 py-2
              flex items-center justify-between
            "
          >
            <span className="font-heading text-mossy-bg-box text-sm tracking-wider">
              ♪ REALM RADIO v2.0
            </span>
            <Link
              href="/"
              className="text-mossy-bg-box hover:text-white text-xs"
            >
              [×]
            </Link>
          </div>

          {/* Visualizer */}
          <div className="p-4 pb-2">
            <Visualizer />
          </div>

          {/* Now Playing */}
          <div className="px-4 text-center">
            <div className="text-mossy-text-muted text-xs uppercase tracking-wider mb-1">
              {mounted && isPlaying ? '▶ Now Playing' : '❚❚ Paused'}
            </div>
            <div className="font-accent text-mossy-header text-xl mb-1 truncate">
              {currentTrack.title}
            </div>
            {currentTrack.artist && (
              <div className="text-mossy-text-muted text-sm">
                {currentTrack.artist}
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="px-4 py-3">
            <div className="flex items-center gap-2 text-xs text-mossy-text-muted font-mono">
              <span>{mounted ? formatTime(currentTime) : '0:00'}</span>
              <div className="flex-1 h-2 bg-mossy-bg-box-alt border border-mossy-border relative">
                <div
                  className="h-full bg-gradient-to-r from-mossy-link to-mossy-accent"
                  style={{ width: `${mounted ? progress : 0}%` }}
                />
              </div>
              <span>{formatTime(duration || currentTrack.duration || 0)}</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex justify-center items-center gap-3 px-4 pb-4">
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
                text-lg
              "
              aria-label="Previous"
            >
              <PrevIcon />
            </button>
            <button
              onClick={togglePlay}
              className="
                w-16 h-16
                bg-mossy-border
                border-2 border-mossy-accent
                text-mossy-bg-box
                hover:bg-mossy-accent
                transition-colors
                flex items-center justify-center
                text-2xl
                shadow-[2px_2px_0_rgba(0,0,0,0.3)]
              "
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {mounted && isPlaying ? <PauseIcon /> : <PlayIcon />}
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
                text-lg
              "
              aria-label="Next"
            >
              <NextIcon />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3 px-4 pb-4">
            <button
              onClick={toggleMute}
              className="text-mossy-border w-6"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {mounted && isMuted ? (
                <VolumeMutedIcon />
              ) : mounted && volume < 0.5 ? (
                <VolumeLowIcon />
              ) : (
                <VolumeHighIcon />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={mounted ? volume * 100 : 70}
              onChange={(e) => setVolume(Number(e.target.value) / 100)}
              className="flex-1 h-2 accent-mossy-border cursor-pointer"
            />
          </div>

          {/* Playlist */}
          <div className="border-t-2 border-mossy-border">
            <div className="bg-mossy-bg-box-alt px-3 py-2 text-xs text-mossy-border uppercase tracking-wider font-heading">
              Playlist ({tracks.length} tracks)
              {!tracksLoaded && ' · loading...'}
            </div>
            <div className="max-h-48 overflow-y-auto">
              {tracks.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => setCurrentTrack(track.id)}
                  className={`
                    w-full text-left px-3 py-2
                    border-b border-mossy-bg-box-alt
                    transition-colors
                    flex items-center gap-2
                    ${mounted && currentTrackId === track.id
                      ? 'bg-mossy-bg-box-alt text-mossy-header'
                      : 'hover:bg-mossy-bg-box-alt text-mossy-text'
                    }
                  `}
                >
                  <span className="text-mossy-text-muted text-xs w-5">
                    {mounted && currentTrackId === track.id && isPlaying
                      ? '▶'
                      : `${index + 1}.`}
                  </span>
                  <span className="flex-1 truncate text-sm">{track.title}</span>
                  <span className="text-mossy-text-muted text-xs">
                    {track.duration ? formatDuration(track.duration) : ''}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-mossy-bg-box-alt px-3 py-2 text-center">
            <Link
              href="/"
              className="text-mossy-link hover:text-mossy-link-hover text-xs font-nav"
            >
              ← back to realm
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
