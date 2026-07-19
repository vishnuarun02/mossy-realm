import { ReactNode } from 'react';

/**
 * InsetPanel - the recessed well.
 *
 * Darker than everything around it, with an inset shadow: cassette
 * windows, code blocks, text inputs, progress beds. Anything you look
 * INTO rather than AT.
 *
 * Do not stack panels inside an inset well. One level of recess is
 * the whole trick.
 */

interface InsetPanelProps {
  padding?: 'sm' | 'md' | 'none';
  className?: string;
  children: ReactNode;
}

const paddingClasses = {
  none: '',
  sm: 'p-2',
  md: 'p-3',
} as const;

export default function InsetPanel({
  padding = 'sm',
  className = '',
  children,
}: InsetPanelProps) {
  return (
    <div
      className={`
        bg-surface-inset
        border-panel border-border-inset-edge
        shadow-panel-inset
        rounded-sm
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
