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

    const howl = new Howl({
      src: [trackUrl],
      html5: true, // Enable streaming for large files
      volume: isMuted ? 0 : volume,
      onload: () => {
        setDuration(howl.duration());
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

    // If we were playing before track change, start playing new track
    if (isPlaying) {
      howl.play();
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [trackUrl]); // Only re-run when track URL changes

  // Handle play/pause
  useEffect(() => {
    if (!howlRef.current) return;

    if (isPlaying) {
      howlRef.current.play();
    } else {
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

  // This component doesn't render anything
  return null;
}

