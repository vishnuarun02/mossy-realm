'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePlayerStore } from './store';
import {
  createHowl,
  getHowl,
  getCurrentTrackUrl,
  getAudioElement,
  playGlobal,
  pauseGlobal,
  setVolumeGlobal,
  seekGlobal,
} from './globalAudio';
import { connectSource, resumeAudioContext } from './audioContext';

/**
 * AudioEngine - Syncs React state with global audio singleton
 *
 * The actual Howl instance lives outside React (in globalAudio.ts)
 * This component just syncs the Zustand store with that global instance
 */
export function AudioEngine() {
  const rafRef = useRef<number | null>(null);

  const {
    tracks,
    tracksLoaded,
    tracksLoading,
    nextRetryAt,
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

  // Retry track loading after backoff
  useEffect(() => {
    if (tracksLoaded || tracksLoading || !nextRetryAt) return;
    const delay = Math.max(0, nextRetryAt - Date.now());
    const timeoutId = setTimeout(() => {
      loadTracks(true);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [tracksLoaded, tracksLoading, nextRetryAt, loadTracks]);

  // Get current track URL from store tracks
  const currentTrack = tracks.find((t) => t.id === currentTrackId);
  const trackUrl = currentTrack?.url || '';

  // Update playback position
  const updateTime = useCallback(function tick() {
    const seek = seekGlobal();
    setCurrentTime(seek);

    if (getHowl()?.playing()) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = null;
    }
  }, [setCurrentTime]);

  const startRaf = useCallback(() => {
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(updateTime);
    }
  }, [updateTime]);

  const stopRaf = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

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
          // TODO: Re-enable once CORS headers are set on R2 audio files
          // Connecting to Web Audio API without CORS causes audio to be muted
          // const audioElement = getAudioElement();
          // if (audioElement) {
          //   connectSource(audioElement);
          // }
        },
        onend: () => {
          nextTrack();
        },
        onplay: () => {
          startRaf();
        },
        onpause: () => {
          stopRaf();
        },
      });

      // Auto-play if we should be playing
      if (wasPlaying) {
        setTimeout(() => playGlobal(), 100);
      }
    }
  }, [trackUrl, isMuted, volume, isPlaying, setDuration, nextTrack, startRaf, stopRaf]);

  // Sync play/pause state
  useEffect(() => {
    if (isPlaying) {
      playGlobal();
      resumeAudioContext().catch(() => {});
      startRaf();
    } else {
      pauseGlobal();
      stopRaf();
    }
  }, [isPlaying, startRaf, stopRaf]);

  // Sync volume
  useEffect(() => {
    setVolumeGlobal(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  // Cleanup RAF on unmount (but NOT the Howl instance!)
  useEffect(() => {
    return () => {
      stopRaf();
    };
  }, [stopRaf]);

  return null;
}
