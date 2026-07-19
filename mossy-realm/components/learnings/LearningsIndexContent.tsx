'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import RetroBox from '@/components/RetroBox';
import {
  type LearningSummary,
  type LearningTopic,
  getCategoryLabel,
} from '@/lib/learnings-types';

type TopicFilterId = LearningTopic | 'all';

interface TopicCount {
  id: LearningTopic;
  label: string;
  count: number;
}

interface LearningsIndexContentProps {
  posts: LearningSummary[];
  topics: TopicCount[];
}

export default function LearningsIndexContent({
  posts,
  topics,
}: LearningsIndexContentProps) {
  const [activeTopic, setActiveTopic] = useState<TopicFilterId>('all');

  const filteredPosts = useMemo(() => {
    if (activeTopic === 'all') return posts;
    return posts.filter((post) => post.topic === activeTopic);
  }, [posts, activeTopic]);

  return (
    <div className="grid gap-4 lg:grid-cols-[160px_1fr_160px] md:grid-cols-[160px_1fr]">
      <aside className="flex flex-col gap-4 order-2 md:order-1">
        <RetroBox title="[ why share this? ]">
          <div className="text-sm leading-relaxed">
            <p>
              Building a personal site is a journey of trial and error.
              I&apos;m documenting my mistakes so other retro web builders
              don&apos;t have to repeat them.
            </p>
            <p className="mt-3 italic text-fg-secondary text-center">
              &quot;The best design is the one you don&apos;t notice.&quot;
            </p>
          </div>
        </RetroBox>

        <RetroBox title="[ topics ]">
          <ul className="volumes-filter space-y-1 font-nav text-sm">
            <li>
              <label
                className={`volumes-filter-label flex items-center gap-2 cursor-pointer ${
                  activeTopic === 'all' ? 'text-fg-heading' : 'text-fg-secondary'
                }`}
              >
                <input
                  type="radio"
                  name="learning-topic"
                  checked={activeTopic === 'all'}
                  onChange={() => setActiveTopic('all')}
                  className="accent-border-structural"
                />
                <span>all topics ({posts.length})</span>
              </label>
            </li>
            {topics.map((topic) => {
              const isActive = activeTopic === topic.id;
              return (
                <li key={topic.id}>
                  <label
                    className={`volumes-filter-label flex items-center gap-2 cursor-pointer ${
                      isActive ? 'text-fg-heading' : 'text-fg-secondary'
                    }`}
                  >
                    <input
                      type="radio"
                      name="learning-topic"
                      checked={isActive}
                      onChange={() => setActiveTopic(topic.id)}
                      className="accent-border-structural"
                    />
                    <span>
                      {topic.label} ({topic.count})
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </RetroBox>
      </aside>

      <main className="order-1 md:order-2">
        <RetroBox title="{ learnings }" variant="alt">
          <div className="study-log-header study-log-header--compact">
            <p className="study-log-label">[ study log ]</p>
            <h2 className="study-log-title">Learnings from the field</h2>
            <p className="study-log-deck">
              Observations, technical breakthroughs, and philosophical musings
              gathered while building this realm.
            </p>
          </div>

          <div className="study-log-timeline" aria-live="polite">
            {filteredPosts.length === 0 ? (
              <p className="study-log-empty text-fg-secondary italic text-center py-6">
                No entries match this topic yet.
              </p>
            ) : (
              filteredPosts.map((post, index) => (
                <TimelineEntry
                  key={post.slug}
                  post={post}
                  side={index % 2 === 0 ? 'right' : 'left'}
                />
              ))
            )}
          </div>
        </RetroBox>
      </main>

      <aside className="hidden lg:flex flex-col gap-4 order-3">
        <RetroBox title="[ key insight ]">
          <div className="text-sm text-center space-y-2">
            <p className="text-fg-heading italic">
              90s sites had complex layouts but simple interactions.
            </p>
            <p className="text-fg-secondary">
              Modern sites flip this. Minimal layouts, fancy animations.
            </p>
            <p className="text-accent font-semibold">
              You can&apos;t max out both.
            </p>
          </div>
        </RetroBox>
      </aside>
    </div>
  );
}

function TimelineEntry({
  post,
  side,
}: {
  post: LearningSummary;
  side: 'left' | 'right';
}) {
  const href = `/fieldwork/learnings/${post.slug}`;
  const isLeft = side === 'left';
  const expedition = `Expedition #${String(post.expedition).padStart(2, '0')}`;

  return (
    <article className={`study-log-entry study-log-entry--${side}`}>
      <div className="study-log-spine-node" aria-hidden="true" />

      <div className="study-log-entry-wrap">
        <div className={`study-log-meta ${isLeft ? 'study-log-meta--left' : ''}`}>
          {isLeft ? (
            <>
              <span className="study-log-meta-exp">{expedition}</span>
              <span className="study-log-meta-date">{post.formattedDate}</span>
              <span className="study-log-meta-pill">{getCategoryLabel(post.category)}</span>
            </>
          ) : (
            <>
              <span className="study-log-meta-pill">{getCategoryLabel(post.category)}</span>
              <span className="study-log-meta-date">{post.formattedDate}</span>
              <span className="study-log-meta-exp">{expedition}</span>
            </>
          )}
        </div>

        <div className="study-log-card study-log-card--compact">
          <Link href={href} className="study-log-card-title-link">
            <h3 className={`study-log-card-title ${isLeft ? 'study-log-card-title--left' : ''}`}>
              {post.title}
            </h3>
          </Link>

          <div className="study-log-takeaway study-log-takeaway--compact">
            <strong>Key takeaway</strong>
            <span className="study-log-takeaway-text">{post.keyTakeaway}</span>
          </div>

          <Link href={href} className="study-log-read-hint">
            read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
