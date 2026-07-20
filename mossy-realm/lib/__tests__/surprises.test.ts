import { describe, expect, it, vi } from 'vitest';
import { oldWebDestinations } from '@/data/old-web-destinations';
import {
  pickAlternateFooterMessage,
  pickCabinSurprise,
} from '@/lib/surprises/local';
import { pickWithoutRecent, rememberPick } from '@/lib/surprises/pick';
import { fetchWikipediaSignal } from '@/lib/surprises/wikipedia';

describe('curated old-web roads', () => {
  it('keeps a typed, unique collection of at least 30 destinations', () => {
    expect(oldWebDestinations.length).toBeGreaterThanOrEqual(30);
    expect(new Set(oldWebDestinations.map((item) => item.id)).size).toBe(
      oldWebDestinations.length,
    );
    expect(new Set(oldWebDestinations.map((item) => item.url)).size).toBe(
      oldWebDestinations.length,
    );

    for (const destination of oldWebDestinations) {
      expect(() => new URL(destination.url)).not.toThrow();
      expect(destination.description.length).toBeGreaterThan(20);
      expect(destination.external).toBe(true);
      expect(typeof destination.safe).toBe('boolean');
    }
  });

  it('does not immediately repeat the current or previous road', () => {
    const items = oldWebDestinations.slice(0, 5);
    let history: string[] = [items[0].id, items[1].id];

    const next = pickWithoutRecent(items, history, (item) => item.id, () => 0);
    expect(next.id).not.toBe(history[0]);
    expect(next.id).not.toBe(history[1]);

    history = rememberPick(history, next.id);
    expect(history).toEqual([items[1].id, next.id]);
  });
});

describe('local surprise helpers', () => {
  it('supports rare frog and low-probability footer outcomes', () => {
    expect(pickCabinSurprise([], () => 0).kind).toBe('frog-message');
    expect(pickCabinSurprise([], () => 0.5).kind).not.toBe('frog-message');
    expect(pickAlternateFooterMessage(() => 0.9)).toBeNull();

    const rolls = [0.01, 0];
    expect(pickAlternateFooterMessage(() => rolls.shift() ?? 0)?.kind).toBe(
      'footer-message',
    );
  });
});

describe('Wikimedia signal', () => {
  it('returns a validated random-page summary', async () => {
    const fetcher = vi.fn(async () =>
      new Response(
        JSON.stringify({
          title: 'Moss',
          extract: 'Mosses are small, non-vascular flowerless plants.',
          content_urls: {
            desktop: { page: 'https://en.wikipedia.org/wiki/Moss' },
          },
        }),
        { status: 200 },
      ),
    ) as unknown as typeof fetch;

    const result = await fetchWikipediaSignal({ fetcher, timeoutMs: 100 });

    expect(result).toEqual({
      source: 'wikimedia',
      signal: {
        title: 'Moss',
        extract: 'Mosses are small, non-vascular flowerless plants.',
        url: 'https://en.wikipedia.org/wiki/Moss',
      },
    });
  });

  it('falls back when Wikimedia returns invalid data', async () => {
    const fetcher = vi.fn(async () =>
      new Response(JSON.stringify({ title: 'missing a safe URL' }), {
        status: 200,
      }),
    ) as unknown as typeof fetch;

    const result = await fetchWikipediaSignal({
      fetcher,
      timeoutMs: 100,
      random: () => 0,
    });

    expect(result.source).toBe('fallback');
    expect(result.error).toBe('invalid-response');
    expect(result.signal.url).toMatch(/^https:\/\/en\.wikipedia\.org\//);
  });

  it('times out into a static fallback', async () => {
    const fetcher = vi.fn(
      (_input: RequestInfo | URL, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => {
            reject(new DOMException('aborted', 'AbortError'));
          });
        }),
    ) as unknown as typeof fetch;

    const result = await fetchWikipediaSignal({
      fetcher,
      timeoutMs: 1,
      random: () => 0,
    });

    expect(result.source).toBe('fallback');
    expect(result.error).toBe('timeout');
  });
});
