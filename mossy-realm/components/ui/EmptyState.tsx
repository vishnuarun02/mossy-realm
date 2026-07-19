import { ReactNode } from 'react';

/**
 * EmptyState - the "nothing here yet" standard.
 *
 * Under-construction pages, empty galleries, zero search results.
 * A whispered accent title, a plain statement of what is (not) here,
 * and optionally a piece of art (construction gif, illustration) plus
 * one action.
 *
 * Keep the message factual and short, per CONTENT_STYLE.md. The art
 * slot carries the whimsy so the words don't have to.
 */

interface EmptyStateProps {
  /** Accent-font whisper line, e.g. "~ watch your step ~". */
  title: string;
  /** One or two plain sentences. */
  message: string;
  /** Decorative art (gif, illustration). Always aria-hidden. */
  art?: ReactNode;
  /** Optional action row (Button, TextLink). */
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({
  title,
  message,
  art,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`text-center py-6 px-3 ${className}`}>
      {art && (
        <div aria-hidden="true" className="mb-4 flex justify-center">
          {art}
        </div>
      )}
      <p className="font-accent text-fg-heading text-md mb-2">
        {title}
      </p>
      <p className="text-fg-secondary text-caption max-w-prose mx-auto">
        {message}
      </p>
      {action && <div className="mt-4 flex justify-center gap-2">{action}</div>}
    </div>
  );
}
