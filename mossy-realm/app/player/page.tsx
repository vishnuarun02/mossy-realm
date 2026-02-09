'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePlayerStore } from '@/lib/player/store';
import { formatDuration } from '@/lib/tracks';
import { Visualizer } from '@/components/player/Visualizer';
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
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-xl">
          <div className="cassette-shell p-4 relative">
            <div className="absolute top-3 left-3 cassette-led" />
            <div className="absolute top-3 right-3 cassette-led" />
            <div className="absolute bottom-3 left-3 cassette-led-amber" />
            <div className="absolute bottom-3 right-3 cassette-led-amber" />

            <div className="flex items-center justify-center gap-2 text-[0.7rem] uppercase tracking-wider text-mossy-text-muted mb-3">
              <span className={`cassette-led ${mounted && isPlaying ? 'cassette-led-blink' : ''}`} />
              <span>{mounted && isPlaying ? 'listening' : 'paused'}</span>
              <span className={`cassette-led ${mounted && isPlaying ? 'cassette-led-blink' : ''}`} />
            </div>

            <div className="cassette-window p-2">
              <Visualizer variant="full" />
            </div>

            <div className="cassette-label mt-3 px-3 py-2 text-center">
              <div className="text-mossy-text-muted text-[0.7rem] uppercase tracking-wider">
                {mounted && isPlaying ? 'now playing' : 'paused'}
              </div>
              <div className="font-accent text-mossy-header text-base leading-tight break-words">
                {currentTrack.title}
              </div>
              {currentTrack.artist && (
                <div className="text-mossy-text-muted text-sm">
                  {currentTrack.artist}
                </div>
              )}
            </div>

            <div className="px-2 py-3">
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

            <div className="grid grid-cols-3 gap-2 px-2 pb-3">
              <button
                onClick={prevTrack}
                className="h-12 bg-mossy-bg-box-alt border-2 border-mossy-border text-mossy-border hover:bg-mossy-border hover:text-mossy-bg-box transition-colors flex items-center justify-center"
                aria-label="Previous"
              >
                <PrevIcon />
              </button>
              <button
                onClick={togglePlay}
                className="h-12 bg-mossy-border border-2 border-mossy-border-glow text-mossy-bg-box hover:bg-mossy-border-glow transition-colors flex items-center justify-center"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {mounted && isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button
                onClick={nextTrack}
                className="h-12 bg-mossy-bg-box-alt border-2 border-mossy-border text-mossy-border hover:bg-mossy-border hover:text-mossy-bg-box transition-colors flex items-center justify-center"
                aria-label="Next"
              >
                <NextIcon />
              </button>
            </div>

            <div className="flex items-center gap-3 px-2 pb-4 overflow-hidden">
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
                className="cassette-slider flex-1 min-w-0 cursor-pointer w-full"
              />
            </div>
          </div>

          <div className="bg-mossy-bg-box border-2 border-mossy-border mt-4">
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
      </div>
    </>
  );
}
