import {
  getLearningSummaries,
  getTopicCounts,
} from '@/lib/learnings.server';
import LearningsIndexContent from '@/components/learnings/LearningsIndexContent';

export default function LearningsPage() {
  const posts = getLearningSummaries();
  const topics = getTopicCounts();

  return (
    <LearningsIndexContent
      posts={posts}
      topics={topics}
    />
  );
}
