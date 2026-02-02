'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { tracks, Track, getFeaturedTrack } from '@/data/tracks';

interface PlayerState {
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
            // Initial state - paused and muted by default (autoplay rules)
            isPlaying: false,
            isMuted: true,
            volume: 0.7,
            currentTrackId: getFeaturedTrack().id,
            currentTime: 0,
            duration: 0,
            isMobileSheetOpen: false,

            // Actions
            play: () => set({ isPlaying: true }),
            pause: () => set({ isPlaying: false }),
            togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
            toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
            setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
            setCurrentTrack: (trackId) => {
                const track = tracks.find((t) => t.id === trackId);
                if (track) {
                    set({ currentTrackId: trackId, currentTime: 0 });
                }
            },
            setCurrentTime: (time) => set({ currentTime: time }),
            setDuration: (duration) => set({ duration }),

            nextTrack: () => {
                const currentIndex = tracks.findIndex((t) => t.id === get().currentTrackId);
                const nextIndex = (currentIndex + 1) % tracks.length;
                set({ currentTrackId: tracks[nextIndex].id, currentTime: 0 });
            },

            prevTrack: () => {
                const currentIndex = tracks.findIndex((t) => t.id === get().currentTrackId);
                const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
                set({ currentTrackId: tracks[prevIndex].id, currentTime: 0 });
            },

            openMobileSheet: () => set({ isMobileSheetOpen: true }),
            closeMobileSheet: () => set({ isMobileSheetOpen: false }),
            toggleMobileSheet: () => set((state) => ({ isMobileSheetOpen: !state.isMobileSheetOpen })),

            getCurrentTrack: () => {
                const track = tracks.find((t) => t.id === get().currentTrackId);
                return track || getFeaturedTrack();
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

