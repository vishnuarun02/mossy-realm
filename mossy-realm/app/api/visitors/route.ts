import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';
import { deriveVisitorId, hashVisitorId, VISITOR_COOKIE, VISITOR_TTL_SECONDS } from '@/lib/visitors';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

function getClientIp(headers: Headers): string | null {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    return first || null;
  }
  return headers.get('x-real-ip');
}

export async function GET() {
  try {
    const count = (await redis.get<number>('visitor_count')) || 0;
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    return NextResponse.json({ count: 0 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const countOnly = process.env.NODE_ENV === 'development';
    if (countOnly) {
      const count = (await redis.get<number>('visitor_count')) || 0;
      return NextResponse.json({ count, skipped: true });
    }

    const headers = request.headers;
    const ip = getClientIp(headers);
    const userAgent = headers.get('user-agent');
    const acceptLanguage = headers.get('accept-language');
    const existingCookieId = request.cookies.get(VISITOR_COOKIE)?.value || null;

    const { id, newCookieId } = deriveVisitorId({
      ip,
      userAgent,
      acceptLanguage,
      existingCookieId,
    });

    const visitorKey = `visitor:${hashVisitorId(id)}`;
    const wasNew = await redis.set(visitorKey, '1', {
      ex: VISITOR_TTL_SECONDS,
      nx: true,
    });

    const count = wasNew
      ? await redis.incr('visitor_count')
      : (await redis.get<number>('visitor_count')) || 0;

    const response = NextResponse.json({ count });
    if (newCookieId) {
      response.cookies.set({
        name: VISITOR_COOKIE,
        value: newCookieId,
        httpOnly: true,
        sameSite: 'lax',
        maxAge: VISITOR_TTL_SECONDS,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      });
    }
    return response;
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
    return NextResponse.json({ count: 0 });
  }
}
