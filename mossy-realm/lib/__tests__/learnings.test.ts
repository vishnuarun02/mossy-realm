import { describe, it, expect } from 'vitest';
import {
  getAllLearnings,
  getLearningBySlug,
  getCategoryVolumes,
  getAdjacentLearnings,
} from '@/lib/learnings.server';

describe('learnings', () => {
  it('loads all markdown posts', () => {
    const posts = getAllLearnings();
    expect(posts.length).toBe(5);
  });

  it('assigns expedition numbers newest-first', () => {
    const posts = getAllLearnings();
    expect(posts[0].slug).toBe('audio-player-refactor');
    expect(posts[0].expedition).toBe(5);
    expect(posts[posts.length - 1].expedition).toBe(1);
  });

  it('finds post by slug with rendered html', () => {
    const post = getLearningBySlug('audio-player-refactor');
    expect(post?.title).toBe('Audio Player Refactor');
    expect(post?.contentHtml).toContain('Howler.js');
  });

  it('builds category volumes', () => {
    const volumes = getCategoryVolumes();
    expect(volumes[0]).toMatchObject({ id: 'all', count: 5 });
    expect(volumes.find((v) => v.id === 'frontend')?.count).toBe(1);
    expect(volumes.find((v) => v.id === 'design')?.count).toBe(3);
    expect(volumes.find((v) => v.id === 'infra')?.count).toBe(1);
  });

  it('returns adjacent posts in study-log order (newer above, older below)', () => {
    const { prev, next } = getAdjacentLearnings('cursors-and-effects');
    expect(next?.slug).toBe('site-wiring');
    expect(prev?.slug).toBe('color-palette');
  });
});
