import { ReactNode } from 'react';
import TextLink from './ui/TextLink';

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

export interface Breadcrumb {
  href?: string;
  label: string;
}

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
        <nav
          aria-label="Breadcrumb"
          className="
            mb-3 text-left
            font-nav text-meta uppercase tracking-wider
            text-fg-secondary
          "
        >
          <ol className="flex flex-wrap items-center gap-1.5">
            {breadcrumbs.map((crumb, i) => {
              const isLast = i === breadcrumbs.length - 1;
              return (
                <li key={i} className="flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden="true" className="text-border-structural">/</span>}
                  {crumb.href && !isLast ? (
                    <TextLink href={crumb.href} underline={false}>
                      {crumb.label}
                    </TextLink>
                  ) : (
                    <span aria-current={isLast ? 'page' : undefined}>
                      {crumb.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
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
