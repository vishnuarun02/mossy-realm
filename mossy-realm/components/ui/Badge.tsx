import { ReactNode } from 'react';

/**
 * Badge - small labeled chips and pills.
 *
 * - `chip`: the 90s web-badge look (footer: [neocities], [next.js]).
 *   Panel-alt fill, amber border, muted text.
 * - `pill`: metadata pill from the study log (VISUAL DESIGN, FRONTEND).
 *   Hairline amber border, heading-cream text, translucent moss fill.
 *
 * Badges are labels, not actions. Interactive chips do not exist here;
 * use Button for actions and TextLink for navigation.
 */

type BadgeVariant = 'chip' | 'pill';

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  chip: `
    bg-surface-panel-alt border-panel border-border-structural
    px-2 py-1 text-sm text-fg-secondary
  `,
  pill: `
    border-hairline border-border-structural
    px-2 py-0.5
    font-nav text-meta uppercase tracking-wider
    text-fg-heading bg-surface-panel/60
  `,
};

export default function Badge({
  variant = 'chip',
  className = '',
  children,
}: BadgeProps) {
  return (
    <span className={`inline-block rounded-sm ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
