import { wikipediaFallbackSignals } from './local';
import type {
  WikipediaSignal,
  WikipediaSignalResponse,
} from './types';

const WIKIMEDIA_RANDOM_SUMMARY =
  'https://en.wikipedia.org/api/rest_v1/page/random/summary';

interface FetchWikipediaOptions {
  fetcher?: typeof fetch;
  timeoutMs?: number;
  random?: () => number;
}

function fallbackResponse(
  error: NonNullable<WikipediaSignalResponse['error']>,
  random: () => number,
): WikipediaSignalResponse {
  const index = Math.min(
    wikipediaFallbackSignals.length - 1,
    Math.floor(Math.max(0, random()) * wikipediaFallbackSignals.length),
  );
  return {
    signal: wikipediaFallbackSignals[index],
    source: 'fallback',
    error,
  };
}

function shortenExtract(extract: string, maxLength = 320): string {
  if (extract.length <= maxLength) return extract;
  const shortened = extract.slice(0, maxLength + 1);
  const boundary = shortened.lastIndexOf(' ');
  return `${shortened.slice(0, boundary > 220 ? boundary : maxLength).trim()}…`;
}

function parseSignal(payload: unknown): WikipediaSignal | null {
  if (!payload || typeof payload !== 'object') return null;

  const record = payload as Record<string, unknown>;
  const title = typeof record.title === 'string' ? record.title.trim() : '';
  const extract =
    typeof record.extract === 'string' ? record.extract.trim() : '';
  const contentUrls = record.content_urls;
  const desktop =
    contentUrls && typeof contentUrls === 'object'
      ? (contentUrls as Record<string, unknown>).desktop
      : null;
  const page =
    desktop && typeof desktop === 'object'
      ? (desktop as Record<string, unknown>).page
      : null;

  if (!title || typeof page !== 'string') return null;

  try {
    const url = new URL(page);
    const wikipediaHost =
      url.hostname === 'wikipedia.org' || url.hostname.endsWith('.wikipedia.org');
    if (url.protocol !== 'https:' || !wikipediaHost) return null;
  } catch {
    return null;
  }

  return {
    title,
    extract: extract
      ? shortenExtract(extract)
      : 'No short extract arrived with this transmission.',
    url: page,
  };
}

/**
 * Fetch a random summary from Wikimedia without exposing credentials.
 * Every failure resolves to a typed local signal, so callers always render.
 */
export async function fetchWikipediaSignal({
  fetcher = fetch,
  timeoutMs = 4500,
  random = Math.random,
}: FetchWikipediaOptions = {}): Promise<WikipediaSignalResponse> {
  const controller = new AbortController();
  let timedOut = false;
  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetcher(WIKIMEDIA_RANDOM_SUMMARY, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'Api-User-Agent': 'MossyRealm/1.0 (random knowledge signal)',
      },
    });

    if (!response.ok) {
      return fallbackResponse('upstream-failure', random);
    }

    const signal = parseSignal(await response.json());
    if (!signal) return fallbackResponse('invalid-response', random);

    return { signal, source: 'wikimedia' };
  } catch {
    return fallbackResponse(
      timedOut ? 'timeout' : 'upstream-failure',
      random,
    );
  } finally {
    clearTimeout(timeout);
  }
}
