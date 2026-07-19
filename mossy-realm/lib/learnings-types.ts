export type LearningCategory = 'frontend' | 'design' | 'infra';
export type LearningTopic = 'compsci' | 'design';

export interface LearningFrontmatter {
  title: string;
  slug: string;
  date: string;
  category: LearningCategory;
  topic: LearningTopic;
  keyTakeaway: string;
  summary: string;
  tags: string[];
  related?: string[];
  changelog?: string;
}

export interface LearningPost extends LearningFrontmatter {
  expedition: number;
  formattedDate: string;
  contentHtml: string;
}

export interface LearningSummary extends LearningFrontmatter {
  expedition: number;
  formattedDate: string;
}

export interface CategoryVolume {
  id: LearningCategory | 'all';
  label: string;
  count: number;
}

const CATEGORY_LABELS: Record<LearningCategory, string> = {
  frontend: 'Frontend',
  design: 'Visual design',
  infra: 'Infra',
};

export function getCategoryLabel(category: LearningCategory): string {
  return CATEGORY_LABELS[category];
}

export const LEARNING_CATEGORY_LABELS = CATEGORY_LABELS;

export const LEARNING_TOPICS: { id: LearningTopic; label: string }[] = [
  { id: 'compsci', label: 'compsci' },
  { id: 'design', label: 'design' },
];
