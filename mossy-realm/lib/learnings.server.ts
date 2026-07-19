import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import {
  type CategoryVolume,
  type LearningCategory,
  type LearningPost,
  type LearningSummary,
  type LearningTopic,
  LEARNING_CATEGORY_LABELS,
  LEARNING_TOPICS,
} from './learnings-types';

const LEARNINGS_DIR = path.join(process.cwd(), 'content/learnings');

const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function normalizeDateString(date: unknown): string {
  if (date instanceof Date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  return String(date);
}

function formatLearningDate(dateStr: string): string {
  const match = dateStr.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);
  if (!match) return dateStr;

  const year = match[1];
  const month = parseInt(match[2], 10);
  const day = match[3] ? parseInt(match[3], 10) : null;

  if (day) {
    return `${MONTHS_SHORT[month - 1]} ${day}, ${year}`;
  }

  return `${MONTHS_SHORT[month - 1]} ${year}`;
}

function parseDateValue(dateStr: string): number {
  const match = dateStr.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);
  if (!match) return 0;

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1;
  const day = match[3] ? parseInt(match[3], 10) : 1;

  return new Date(year, month, day).getTime();
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, '');
}

function parseLearningFile(filename: string): LearningPost | null {
  const filePath = path.join(LEARNINGS_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  const slug = (data.slug as string) || slugFromFilename(filename);
  const category = data.category as LearningCategory;
  const topic = data.topic as LearningTopic;
  const date = normalizeDateString(data.date);

  if (!data.title || !date || !category || !topic || !data.keyTakeaway || !data.summary) {
    console.warn(`Skipping learning ${filename}: missing required frontmatter`);
    return null;
  }

  return {
    title: data.title as string,
    slug,
    date,
    category,
    topic,
    keyTakeaway: data.keyTakeaway as string,
    summary: data.summary as string,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    related: Array.isArray(data.related) ? (data.related as string[]) : undefined,
    changelog: typeof data.changelog === 'string' ? data.changelog : undefined,
    expedition: 0,
    formattedDate: formatLearningDate(date),
    contentHtml: marked.parse(content) as string,
  };
}

function assignExpeditions(posts: LearningPost[]): LearningPost[] {
  const sorted = [...posts].sort((a, b) => parseDateValue(b.date) - parseDateValue(a.date));

  return sorted.map((post, index) => ({
    ...post,
    expedition: sorted.length - index,
  }));
}

export function getAllLearnings(): LearningPost[] {
  if (!fs.existsSync(LEARNINGS_DIR)) return [];

  const files = fs
    .readdirSync(LEARNINGS_DIR)
    .filter((f) => f.endsWith('.md'));

  const posts = files
    .map(parseLearningFile)
    .filter((p): p is LearningPost => p !== null);

  return assignExpeditions(posts);
}

export function getLearningSummaries(): LearningSummary[] {
  return getAllLearnings().map(({ contentHtml: _, ...summary }) => summary);
}

export function getLearningBySlug(slug: string): LearningPost | null {
  return getAllLearnings().find((p) => p.slug === slug) ?? null;
}

export function getCategoryVolumes(): CategoryVolume[] {
  const posts = getAllLearnings();

  const counts: Record<LearningCategory, number> = {
    frontend: 0,
    design: 0,
    infra: 0,
  };

  for (const post of posts) {
    counts[post.category] += 1;
  }

  return [
    { id: 'all', label: 'All entries', count: posts.length },
    { id: 'frontend', label: LEARNING_CATEGORY_LABELS.frontend, count: counts.frontend },
    { id: 'design', label: LEARNING_CATEGORY_LABELS.design, count: counts.design },
    { id: 'infra', label: LEARNING_CATEGORY_LABELS.infra, count: counts.infra },
  ];
}

export function getTopicCounts(): { id: LearningTopic; label: string; count: number }[] {
  const posts = getAllLearnings();
  return LEARNING_TOPICS.map(({ id, label }) => ({
    id,
    label,
    count: posts.filter((post) => post.topic === id).length,
  }));
}

export function getAdjacentLearnings(slug: string): {
  prev: LearningSummary | null;
  next: LearningSummary | null;
} {
  const posts = getAllLearnings();
  const index = posts.findIndex((p) => p.slug === slug);

  if (index === -1) {
    return { prev: null, next: null };
  }

  const toSummary = (post: LearningPost): LearningSummary => {
    const { contentHtml: _, ...summary } = post;
    return summary;
  };

  return {
    prev: index < posts.length - 1 ? toSummary(posts[index + 1]) : null,
    next: index > 0 ? toSummary(posts[index - 1]) : null,
  };
}

export function getRelatedLearnings(slug: string): LearningSummary[] {
  const post = getLearningBySlug(slug);
  if (!post?.related?.length) return [];

  const all = getAllLearnings();
  return post.related
    .map((relatedSlug) => all.find((p) => p.slug === relatedSlug))
    .filter((p): p is LearningPost => p !== undefined)
    .map(({ contentHtml: _, ...summary }) => summary);
}
