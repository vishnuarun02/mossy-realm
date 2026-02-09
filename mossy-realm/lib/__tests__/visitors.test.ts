import { describe, expect, it } from 'vitest';
import { deriveVisitorId, hashVisitorId } from '@/lib/visitors';

describe('deriveVisitorId', () => {
  it('prefers ip+ua when ip is available', () => {
    const result = deriveVisitorId({
      ip: '1.2.3.4',
      userAgent: 'agent',
      acceptLanguage: 'en-US',
      existingCookieId: 'cookie',
    });
    expect(result.id).toBe('ip:1.2.3.4|ua:agent');
    expect(result.newCookieId).toBeUndefined();
  });

  it('uses cookie id when ip is missing and cookie exists', () => {
    const result = deriveVisitorId({
      ip: null,
      userAgent: 'agent',
      acceptLanguage: 'en-US',
      existingCookieId: 'cookie123',
    });
    expect(result.id).toBe('cookie:cookie123');
  });

  it('falls back to user agent + language when ip and cookie are missing', () => {
    const result = deriveVisitorId({
      ip: null,
      userAgent: 'agent',
      acceptLanguage: 'en-US',
      existingCookieId: null,
    });
    expect(result.id).toBe('ua:agent|en-US');
  });

  it('generates cookie id when no identity signals are available', () => {
    const result = deriveVisitorId({
      ip: null,
      userAgent: null,
      acceptLanguage: null,
      existingCookieId: null,
    });
    expect(result.id.startsWith('cookie:')).toBe(true);
    expect(result.newCookieId).toBeTruthy();
  });
});

describe('hashVisitorId', () => {
  it('returns a stable hash', () => {
    const hash1 = hashVisitorId('abc');
    const hash2 = hashVisitorId('abc');
    expect(hash1).toBe(hash2);
    expect(hash1.length).toBeGreaterThan(20);
  });
});
