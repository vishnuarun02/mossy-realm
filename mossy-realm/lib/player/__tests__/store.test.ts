import { beforeEach, describe, expect, it, vi } from 'vitest';
import { usePlayerStore } from '@/lib/player/store';
import { fallbackTracks } from '@/data/tracks';
import type { Track } from '@/lib/tracks';
import { fetchTracks } from '@/lib/tracks';

vi.mock('@/lib/tracks', async () => {
  const actual = await vi.importActual<typeof import('@/lib/tracks')>('@/lib/tracks');
  return {
    ...actual,
    fetchTracks: vi.fn(),
  };
});

const mockFetchTracks = fetchTracks as unknown as ReturnType<typeof vi.fn>;

beforeEach(() => {
  usePlayerStore.setState({
    tracks: fallbackTracks,
    tracksLoaded: false,
    tracksLoading: false,
    loadError: null,
    nextRetryAt: null,
    isPlaying: false,
    isMuted: false,
    volume: 0.7,
    currentTrackId: fallbackTracks[0]?.id || '',
    currentTime: 0,
    duration: 0,
    isMobileSheetOpen: false,
  });
  vi.clearAllMocks();
});

describe('usePlayerStore.loadTracks', () => {
  it('loads tracks successfully and clears errors', async () => {
    const tracks: Track[] = [
      { id: 'a', title: 'A', url: 'https://example.com/a.mp3' },
    ];
    mockFetchTracks.mockResolvedValue(tracks);

    await usePlayerStore.getState().loadTracks();

    const state = usePlayerStore.getState();
    expect(state.tracksLoaded).toBe(true);
    expect(state.tracksLoading).toBe(false);
    expect(state.loadError).toBeNull();
    expect(state.tracks).toEqual(tracks);
  });

  it('sets backoff on error and skips retries until forced', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-02-09T00:00:00Z'));

    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockFetchTracks.mockRejectedValue(new Error('boom'));

    await usePlayerStore.getState().loadTracks();

    const stateAfterError = usePlayerStore.getState();
    expect(stateAfterError.tracksLoaded).toBe(false);
    expect(stateAfterError.tracksLoading).toBe(false);
    expect(stateAfterError.loadError).toBe('boom');
    expect(stateAfterError.nextRetryAt).toBeGreaterThan(Date.now());
    expect(mockFetchTracks).toHaveBeenCalledTimes(1);

    // Backoff should prevent immediate retry
    await usePlayerStore.getState().loadTracks();
    expect(mockFetchTracks).toHaveBeenCalledTimes(1);

    // Force should bypass backoff
    mockFetchTracks.mockRejectedValueOnce(new Error('boom again'));
    await usePlayerStore.getState().loadTracks(true);
    expect(mockFetchTracks).toHaveBeenCalledTimes(2);

    consoleError.mockRestore();
    vi.useRealTimers();
  });
});
