/**
 * Track types and client-side fetcher
 */

export interface Track {
  id: string;
  title: string;
  url: string;
  // Optional fields from API
  format?: string;
  size?: number;
  lastModified?: string;
  // Manual overrides (for fallback tracks)
  artist?: string;
  duration?: number;
}

export interface TracksResponse {
  tracks: Track[];
  count: number;
  error?: string;
}

/**
 * Fetch tracks from the API (client-side)
 * Uses browser caching via Cache-Control headers from the API
 */
export async function fetchTracks(): Promise<Track[]> {
  try {
    const res = await fetch('/api/tracks');
    if (!res.ok) {
      throw new Error(`Failed to fetch tracks: ${res.status}`);
    }
    const data: TracksResponse = await res.json();
    return data.tracks || [];
  } catch (error) {
    console.error('Failed to fetch tracks:', error);
    return [];
  }
}

/**
 * Format duration in seconds to mm:ss
 */
export function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

