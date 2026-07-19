import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LearningPostContent from '@/components/learnings/LearningPostContent';
import {
  getAdjacentLearnings,
  getAllLearnings,
  getLearningBySlug,
  getRelatedLearnings,
} from '@/lib/learnings.server';

interface LearningPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllLearnings().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: LearningPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getLearningBySlug(slug);

  if (!post) {
    return { title: 'Learning not found — MossyRealm' };
  }

  return {
    title: `${post.title} — MossyRealm`,
    description: post.summary,
  };
}

export default async function LearningPostPage({ params }: LearningPostPageProps) {
  const { slug } = await params;
  const post = getLearningBySlug(slug);

  if (!post) {
    notFound();
  }

  const { prev } = getAdjacentLearnings(slug);
  const related = getRelatedLearnings(slug);

  return (
    <LearningPostContent
      post={post}
      prev={prev}
      related={related}
    />
  );
}
