import { describe, it, expect } from 'vitest';
import { getWeightedRandomItem } from '@/lib/vault';

describe('getWeightedRandomItem', () => {
  it('returns null for empty weights', () => {
    expect(getWeightedRandomItem({})).toBeNull();
  });

  it('returns null when total weight is zero', () => {
    expect(getWeightedRandomItem({ oddity: 0, whisper: 0 })).toBeNull();
  });

  it('returns an item for valid weights', () => {
    const item = getWeightedRandomItem({ oddity: 1 });
    expect(item).not.toBeNull();
    expect(item?.type).toBe('oddity');
  });
});
