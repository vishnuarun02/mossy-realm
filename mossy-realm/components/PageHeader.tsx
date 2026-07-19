import { ReactNode } from 'react';
import Breadcrumbs, { Crumb } from './Breadcrumbs';

/**
 * PageHeader - the shared interior-page header.
 *
 * Every interior page opens with the same anatomy:
 *   breadcrumb trail (quiet, top-left)
 *   eyebrow label    [ like this ]
 *   PAGE TITLE       (Cinzel, uppercase)
 *   deck             one italic line of orientation
 *   structural rule  (2px amber)
 *
 * This gives every room in the realm the same doorway. The outpost
 * homepage is the exception: it is the map, not a room.
 */

export type Breadcrumb = Crumb;

interface PageHeaderProps {
  /** Trail above the title. Last item is the current page (no link). */
  breadcrumbs?: Breadcrumb[];
  /** Eyebrow label rendered [ in brackets ] above the title. */
  eyebrow?: string;
  /** Page title. Rendered as the page's h1. */
  title: ReactNode;
  /** One orientation line under the title. Italic by default;
      pass a node for styled variants. */
  deck?: ReactNode;
  /** Accent-font whisper line (~ like this ~) rendered above the deck. */
  deckAccent?: string;
  /** Slot for actions or metadata pinned below the rule. */
  children?: ReactNode;
  className?: string;
}

export default function PageHeader({
  breadcrumbs,
  eyebrow,
  title,
  deck,
  deckAccent,
  children,
  className = '',
}: PageHeaderProps) {
  return (
    <header
      className={`
        text-center mb-7 pb-4
        border-b-2 border-border-structural
        ${className}
      `}
    >
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} className="mb-3 text-left" />
      )}

      {eyebrow && (
        <p className="font-nav text-meta uppercase tracking-[0.2em] text-fg-secondary mb-2">
          [ {eyebrow} ]
        </p>
      )}

      <h1 className="font-heading text-page-title text-fg-heading uppercase tracking-[0.08em] leading-snug">
        {title}
      </h1>

      {deckAccent && (
        <p className="font-accent text-md text-fg-heading mt-2.5">
          {deckAccent}
        </p>
      )}

      {deck && (
        <p className="text-caption text-fg-secondary italic max-w-md mx-auto mt-2.5 leading-relaxed">
          {deck}
        </p>
      )}

      {children}
    </header>
  );
}
