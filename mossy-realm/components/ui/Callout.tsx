import { ReactNode } from 'react';

/**
 * Callout - the boxed aside inside content.
 *
 * - `note`: the "key takeaway" treatment (amber tint + amber border).
 *   Use for the one sentence a reader should remember.
 * - `warning`: orange border, warmer tint. Realm warnings, caution tape.
 *   Use sparingly; orange is the loudest color in the realm.
 *
 * Not for: pull quotes (use <blockquote> in prose) or system errors
 * on forms (use FormField error text).
 */

type CalloutVariant = 'note' | 'warning';

interface CalloutProps {
  variant?: CalloutVariant;
  /** Optional uppercase label at the top (e.g. "key takeaway"). */
  label?: string;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<CalloutVariant, string> = {
  note: 'bg-surface-callout border-border-structural',
  warning: 'bg-surface-callout-warning border-accent',
};

export default function Callout({
  variant = 'note',
  label,
  className = '',
  children,
}: CalloutProps) {
  return (
    <aside
      className={`
        border-panel rounded-sm
        px-3 py-2.5
        text-caption leading-relaxed
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {label && (
        <strong
          className="
            block mb-1
            font-heading text-micro text-fg-heading-alt
            uppercase tracking-[0.1em]
          "
        >
          {label}
        </strong>
      )}
      {children}
    </aside>
  );
}
