import Link from 'next/link';
import RetroBox from '@/components/RetroBox';
import {
  type LearningPost,
  type LearningSummary,
  getCategoryLabel,
} from '@/lib/learnings-types';
import LearningMarkdown from './LearningMarkdown';
import LearningTag from './LearningTag';

interface LearningPostContentProps {
  post: LearningPost;
  prev: LearningSummary | null;
  related: LearningSummary[];
}

export default function LearningPostContent({
  post,
  prev,
  related,
}: LearningPostContentProps) {
  const expedition = `Expedition #${String(post.expedition).padStart(2, '0')}`;

  return (
    <div className="grid gap-4 lg:grid-cols-[160px_1fr_160px] md:grid-cols-[160px_1fr]">
      <aside className="flex flex-col gap-4 order-2 md:order-1">
        <RetroBox title="[ on this page ]">
          <p className="text-sm text-fg-secondary font-nav">
            Scroll through the dossier below, or return to the full study log.
          </p>
          <p className="mt-3 text-sm">
            <Link href="/fieldwork/learnings" className="text-link hover:hover:text-link-hover">
              ← all learnings
            </Link>
          </p>
        </RetroBox>
      </aside>

      <main className="order-1 md:order-2">
        <RetroBox title="{ expedition dossier }" variant="alt">
          <nav className="learning-breadcrumb font-nav text-sm text-fg-secondary mb-4" aria-label="Breadcrumb">
            <Link href="/fieldwork/learnings" className="text-link hover:hover:text-link-hover">
              Fieldwork
            </Link>
            <span className="mx-2 opacity-60">/</span>
            <Link href="/fieldwork/learnings" className="text-link hover:hover:text-link-hover">
              Learnings
            </Link>
            <span className="mx-2 opacity-60">/</span>
            <span>{post.title}</span>
          </nav>

          <div className="learning-post-meta">
            <span className="study-log-meta-pill">{getCategoryLabel(post.category)}</span>
            <span className="study-log-meta-date">{post.formattedDate}</span>
            <span className="study-log-meta-exp">{expedition}</span>
          </div>

          <h1 className="learning-post-title">{post.title}</h1>

          <div className="study-log-takeaway study-log-takeaway--dossier">
            <strong>Key takeaway</strong>
            {post.keyTakeaway}
          </div>

          {post.changelog && (
            <p className="learning-changelog text-sm text-fg-secondary mb-4 pb-3 border-b border-dashed border-border-structural">
              {post.changelog}
            </p>
          )}

          <LearningMarkdown html={post.contentHtml} />

          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <LearningTag key={tag} tag={tag} />
            ))}
          </div>

          <nav className="learning-post-nav" aria-label="Post navigation">
            {prev ? (
              <Link href={`/fieldwork/learnings/${prev.slug}`} className="learning-post-nav-link">
                <span className="learning-post-nav-label">← previous</span>
                {prev.title}
              </Link>
            ) : (
              <span />
            )}
            <Link href="/fieldwork/learnings" className="learning-post-nav-link learning-post-nav-link--next">
              <span className="learning-post-nav-label">back to log →</span>
              All learnings
            </Link>
          </nav>
        </RetroBox>
      </main>

      <aside className="hidden lg:flex flex-col gap-4 order-3">
        <RetroBox title="[ key insight ]">
          <div className="text-sm text-center">
            <p className="text-fg-heading italic">
              You can&apos;t max out layout complexity and interaction complexity.
            </p>
          </div>
        </RetroBox>

        {related.length > 0 && (
          <RetroBox title="[ related ]">
            <ul className="text-sm space-y-2">
              {related.map((item) => (
                <li key={item.slug} className="border-b border-dashed border-border-structural pb-2 last:border-0">
                  <Link
                    href={`/fieldwork/learnings/${item.slug}`}
                    className="text-link hover:hover:text-link-hover"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </RetroBox>
        )}
      </aside>
    </div>
  );
}
