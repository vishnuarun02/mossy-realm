import { NextResponse } from 'next/server';
import { fetchWikipediaSignal } from '@/lib/surprises/wikipedia';

/** A brief shared cache keeps the remote signal useful without going stale. */
export const revalidate = 300;

export async function GET() {
  const result = await fetchWikipediaSignal();
  const maxAge = result.source === 'wikimedia' ? 300 : 60;

  return NextResponse.json(result, {
    headers: {
      'Cache-Control': `public, s-maxage=${maxAge}, stale-while-revalidate=900`,
      'X-Mossy-Signal-Source': result.source,
    },
  });
}
