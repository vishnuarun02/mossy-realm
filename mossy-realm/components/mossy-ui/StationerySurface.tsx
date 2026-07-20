import type { ReactNode } from 'react';

/**
 * Restrained stationery roles shared by the MossyRealm asset system.
 *
 * A role describes material and purpose, not a page template. Routes opt in
 * explicitly; defining a role does not migrate any existing page.
 */
export type StationeryRole =
  | 'personal-graph-notebook'
  | 'engineering-graph-sheet'
  | 'aged-letter'
  | 'recipe-card'
  | 'bulletin-notice'
  | 'catalog-card'
  | 'contact-sheet'
  | 'terminal-insert';

type StationeryElement = 'article' | 'aside' | 'div' | 'section';

interface StationerySurfaceProps {
  role: StationeryRole;
  as?: StationeryElement;
  className?: string;
  children: ReactNode;
}

const roleClasses: Record<StationeryRole, string> = {
  'personal-graph-notebook':
    'mui-stationery mui-stationery-personal-notebook graph-paper-faint',
  'engineering-graph-sheet':
    'mui-stationery mui-stationery-engineering-sheet graph-paper',
  'aged-letter': 'mui-stationery mui-paper mui-stationery-aged-letter',
  'recipe-card': 'mui-stationery mui-paper stained-card mui-stationery-recipe-card',
  'bulletin-notice': 'mui-stationery mui-paper mui-stationery-bulletin-notice',
  'catalog-card': 'mui-stationery mui-paper mui-stationery-catalog-card',
  'contact-sheet': 'mui-stationery mui-stationery-contact-sheet',
  'terminal-insert': 'mui-stationery mui-stationery-terminal-insert',
};

export default function StationerySurface({
  role,
  as: Element = 'div',
  className = '',
  children,
}: StationerySurfaceProps) {
  return (
    <Element
      className={`${roleClasses[role]} ${className}`}
      data-stationery-role={role}
    >
      {children}
    </Element>
  );
}
