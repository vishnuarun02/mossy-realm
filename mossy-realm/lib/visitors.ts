import crypto from 'crypto';

export const VISITOR_COOKIE = 'mossyrealm_vid';
export const VISITOR_TTL_SECONDS = 60 * 60 * 12; // 12 hours

export function hashVisitorId(raw: string): string {
  return crypto.createHash('sha256').update(raw).digest('hex');
}

export function deriveVisitorId(params: {
  ip: string | null;
  userAgent: string | null;
  acceptLanguage: string | null;
  existingCookieId?: string | null;
}): { id: string; newCookieId?: string } {
  const { ip, userAgent, acceptLanguage, existingCookieId } = params;

  if (ip) {
    const ua = userAgent || 'unknown';
    return { id: `ip:${ip}|ua:${ua}` };
  }

  if (existingCookieId) {
    return { id: `cookie:${existingCookieId}` };
  }

  const fallbackBits = [userAgent, acceptLanguage].filter(Boolean).join('|');
  if (fallbackBits) {
    return { id: `ua:${fallbackBits}` };
  }

  const newCookieId = crypto.randomUUID();
  return { id: `cookie:${newCookieId}`, newCookieId };
}
