/**
 * Static track data - fallbacks and constants
 * Dynamic tracks are fetched from /api/tracks
 */

import { Track } from '@/lib/tracks';

// Fallback tracks if API fails or during initial load
export const fallbackTracks: Track[] = [
  {
    id: 'undertale-main-theme-toby-fox',
    title: 'Undertale Main Theme Toby Fox',
    url: 'https://media.mossyrealm.space/music/undertale-main-theme-toby-fox.mp3',
    artist: 'Toby Fox',
  },
];

// Featured track ID - defaults to first track if not found
export const featuredTrackId = 'undertale-main-theme-toby-fox';

/**
 * Get featured track from a list, fallback to first track
 */
export function getFeaturedTrack(tracks: Track[]): Track {
  if (!tracks.length) return fallbackTracks[0];
  return tracks.find((t) => t.id === featuredTrackId) || tracks[0];
}

/**
 * Get track by ID from a list
 */
export function getTrackById(tracks: Track[], id: string): Track | undefined {
  return tracks.find((t) => t.id === id);
}

// Re-export types and utils from lib
export { formatDuration } from '@/lib/tracks';
export type { Track } from '@/lib/tracks';
