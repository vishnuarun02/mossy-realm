'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePlayerStore } from './store';
import {
  createHowl,
  getHowl,
  getCurrentTrackUrl,
  playGlobal,
  pauseGlobal,
  setVolumeGlobal,
  seekGlobal,
} from './globalAudio';

/**
 * AudioEngine - Syncs React state with global audio singleton
 *
 * The actual Howl instance lives outside React (in globalAudio.ts)
 * This component just syncs the Zustand store with that global instance
 */
export function AudioEngine() {
  const rafRef = useRef<number | null>(null);
  const lastTrackUrlRef = useRef<string | null>(null);

  const {
    tracks,
    tracksLoaded,
    loadTracks,
    isPlaying,
    isMuted,
    volume,
    currentTrackId,
    setCurrentTime,
    setDuration,
    nextTrack,
  } = usePlayerStore();

  // Load tracks from API on mount
  useEffect(() => {
    if (!tracksLoaded) {
      loadTracks();
    }
  }, [tracksLoaded, loadTracks]);

  // Get current track URL from store tracks
  const currentTrack = tracks.find((t) => t.id === currentTrackId);
  const trackUrl = currentTrack?.url || '';

  // Update playback position
  const updateTime = useCallback(() => {
    const seek = seekGlobal();
    setCurrentTime(seek);

    if (getHowl()?.playing()) {
      rafRef.current = requestAnimationFrame(updateTime);
    }
  }, [setCurrentTime]);

  // Initialize or switch tracks
  useEffect(() => {
    if (!trackUrl) return;

    // Only create new Howl if track changed
    if (trackUrl !== getCurrentTrackUrl()) {
      const wasPlaying = isPlaying;

      createHowl(trackUrl, {
        volume: isMuted ? 0 : volume,
        onload: () => {
          const howl = getHowl();
          if (howl) {
            setDuration(howl.duration());
          }
        },
        onend: () => {
          nextTrack();
        },
        onplay: () => {
          rafRef.current = requestAnimationFrame(updateTime);
        },
        onpause: () => {
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
          }
        },
      });

      lastTrackUrlRef.current = trackUrl;

      // Auto-play if we should be playing
      if (wasPlaying) {
        setTimeout(() => playGlobal(), 100);
      }
    }
  }, [trackUrl, isMuted, volume, isPlaying, setDuration, nextTrack, updateTime]);

  // Sync play/pause state
  useEffect(() => {
    if (isPlaying) {
      playGlobal();
      rafRef.current = requestAnimationFrame(updateTime);
    } else {
      pauseGlobal();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    }
  }, [isPlaying, updateTime]);

  // Sync volume
  useEffect(() => {
    setVolumeGlobal(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  // Cleanup RAF on unmount (but NOT the Howl instance!)
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return null;
}
