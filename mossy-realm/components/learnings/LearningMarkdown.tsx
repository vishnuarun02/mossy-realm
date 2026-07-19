export default function LearningMarkdown({ html }: { html: string }) {
  return (
    <div
      className="learning-prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
