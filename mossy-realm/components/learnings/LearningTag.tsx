export default function LearningTag({ tag }: { tag: string }) {
  return (
    <span className="text-xs px-2 py-0.5 bg-surface-panel border border-border-structural text-fg-secondary font-nav">
      {tag}
    </span>
  );
}
