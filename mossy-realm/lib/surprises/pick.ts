/** Pick from the full collection while excluding up to two recent keys. */
export function pickWithoutRecent<T>(
  items: readonly T[],
  recentKeys: readonly string[],
  getKey: (item: T) => string,
  random: () => number = Math.random,
): T {
  if (items.length === 0) {
    throw new Error('Cannot pick a surprise from an empty collection.');
  }

  const excluded = new Set(recentKeys.slice(-2));
  const fresh = items.filter((item) => !excluded.has(getKey(item)));
  const pool = fresh.length > 0 ? fresh : items;
  const roll = Math.max(0, Math.min(0.999999999, random()));
  return pool[Math.floor(roll * pool.length)];
}

/** Keep only the current and previous keys needed for the next pick. */
export function rememberPick(
  recentKeys: readonly string[],
  nextKey: string,
): string[] {
  return [...recentKeys, nextKey].slice(-2);
}
