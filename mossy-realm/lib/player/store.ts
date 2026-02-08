'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Track, fetchTracks } from '@/lib/tracks';
import { fallbackTracks, getFeaturedTrack } from '@/data/tracks';

interface PlayerState {
  // Track list (dynamic from API)
  tracks: Track[];
  tracksLoaded: boolean;

  // Playback state
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTrackId: string;
  currentTime: number;
  duration: number;

  // UI state
  isMobileSheetOpen: boolean;

  // Actions
  loadTracks: () => Promise<void>;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  setCurrentTrack: (trackId: string) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  openMobileSheet: () => void;
  closeMobileSheet: () => void;
  toggleMobileSheet: () => void;

  // Getters
  getCurrentTrack: () => Track;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      // Initial state
      tracks: fallbackTracks,
      tracksLoaded: false,
      isPlaying: false,
      isMuted: false,
      volume: 0.7,
      currentTrackId: fallbackTracks[0]?.id || '',
      currentTime: 0,
      duration: 0,
      isMobileSheetOpen: false,

      // Load tracks from API
      loadTracks: async () => {
        if (get().tracksLoaded) return; // Already loaded

        try {
          const tracks = await fetchTracks();
          if (tracks.length > 0) {
            const currentId = get().currentTrackId;
            const trackExists = tracks.some((t) => t.id === currentId);

            set({
              tracks,
              tracksLoaded: true,
              // If current track doesn't exist in new list, use featured
              currentTrackId: trackExists ? currentId : getFeaturedTrack(tracks).id,
            });
          } else {
            // API returned empty, use fallbacks
            set({ tracksLoaded: true });
          }
        } catch (error) {
          console.error('Failed to load tracks:', error);
          set({ tracksLoaded: true }); // Mark as loaded to prevent retries
        }
      },

      // Actions
      play: () => set({ isPlaying: true }),
      pause: () => set({ isPlaying: false }),
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
      setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),

      setCurrentTrack: (trackId) => {
        const { tracks } = get();
        const track = tracks.find((t) => t.id === trackId);
        if (track) {
          set({ currentTrackId: trackId, currentTime: 0 });
        }
      },

      setCurrentTime: (time) => set({ currentTime: time }),
      setDuration: (duration) => set({ duration }),

      nextTrack: () => {
        const { tracks, currentTrackId } = get();
        if (tracks.length === 0) return;
        const currentIndex = tracks.findIndex((t) => t.id === currentTrackId);
        const nextIndex = (currentIndex + 1) % tracks.length;
        set({ currentTrackId: tracks[nextIndex].id, currentTime: 0 });
      },

      prevTrack: () => {
        const { tracks, currentTrackId } = get();
        if (tracks.length === 0) return;
        const currentIndex = tracks.findIndex((t) => t.id === currentTrackId);
        const prevIndex = currentIndex <= 0 ? tracks.length - 1 : currentIndex - 1;
        set({ currentTrackId: tracks[prevIndex].id, currentTime: 0 });
      },

      openMobileSheet: () => set({ isMobileSheetOpen: true }),
      closeMobileSheet: () => set({ isMobileSheetOpen: false }),
      toggleMobileSheet: () =>
        set((state) => ({ isMobileSheetOpen: !state.isMobileSheetOpen })),

      getCurrentTrack: () => {
        const { tracks, currentTrackId } = get();
        const track = tracks.find((t) => t.id === currentTrackId);
        return track || getFeaturedTrack(tracks);
      },
    }),
    {
      name: 'realm-radio-storage',
      partialize: (state) => ({
        volume: state.volume,
        isMuted: state.isMuted,
        currentTrackId: state.currentTrackId,
      }),
    }
  )
);
