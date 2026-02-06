'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Howl } from 'howler';
import { usePlayerStore } from './store';
import { tracks } from '@/data/tracks';

/**
 * AudioEngine - Global audio controller
 * 
 * This component manages the Howler.js instance and syncs it with the Zustand store.
 * Mount this ONCE in the root layout to persist audio across navigation.
 */
export function AudioEngine() {
  const howlRef = useRef<Howl | null>(null);
  const rafRef = useRef<number | null>(null);
  const initializedRef = useRef(false);

  const {
    isPlaying,
    isMuted,
    volume,
    currentTrackId,
    setCurrentTime,
    setDuration,
    nextTrack,
  } = usePlayerStore();

  // Get current track URL
  const currentTrack = tracks.find((t) => t.id === currentTrackId);
  const trackUrl = currentTrack?.url || '';

  // Update playback position
  const updateTime = useCallback(() => {
    if (howlRef.current && howlRef.current.playing()) {
      const seek = howlRef.current.seek();
      if (typeof seek === 'number') {
        setCurrentTime(seek);
      }
      rafRef.current = requestAnimationFrame(updateTime);
    }
  }, [setCurrentTime]);

  // Initialize or switch tracks
  useEffect(() => {
    // Cleanup previous howl
    if (howlRef.current) {
      howlRef.current.unload();
    }

    if (!trackUrl) return;

    const shouldAutoPlay = isPlaying;

    const howl = new Howl({
      src: [trackUrl],
      html5: true,
      volume: isMuted ? 0 : volume,
      onload: () => {
        setDuration(howl.duration());
        // Auto-play on load if we should be playing
        if (shouldAutoPlay && !howl.playing()) {
          howl.play();
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
      onstop: () => {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
      },
    });

    howlRef.current = howl;
    initializedRef.current = true;

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [trackUrl, isMuted, volume, isPlaying, setDuration, nextTrack, updateTime]);

  // Handle play/pause changes
  useEffect(() => {
    if (!howlRef.current || !initializedRef.current) return;

    if (isPlaying && !howlRef.current.playing()) {
      howlRef.current.play();
    } else if (!isPlaying && howlRef.current.playing()) {
      howlRef.current.pause();
    }
  }, [isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (!howlRef.current) return;
    howlRef.current.volume(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (howlRef.current) {
        howlRef.current.unload();
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return null;
}
