import { ReactNode } from 'react';
import PageHeader, { Breadcrumb } from './PageHeader';

/**
 * PageShell - the interior-page template.
 *
 * PageHeader + a content column with steady rhythm. Renders INSIDE
 * the SiteShell provided by the section layout (never nests a shell
 * of its own). Use for every interior page that is not the outpost
 * homepage or a special media experience (player).
 *
 * Widths:
 * - `reading`: 65ch measure for long-form text (cabin pages, posts).
 * - `full`: content owns its own layout (listings, galleries, grids).
 */

interface PageShellProps {
  breadcrumbs?: Breadcrumb[];
  eyebrow?: string;
  title: ReactNode;
  deck?: ReactNode;
  deckAccent?: string;
  width?: 'reading' | 'full';
  /** Optional rail rendered beside the content on lg, above it on mobile. */
  aside?: ReactNode;
  children: ReactNode;
}

export default function PageShell({
  breadcrumbs,
  eyebrow,
  title,
  deck,
  deckAccent,
  width = 'full',
  aside,
  children,
}: PageShellProps) {
  return (
    <>
      <PageHeader
        breadcrumbs={breadcrumbs}
        eyebrow={eyebrow}
        title={title}
        deck={deck}
        deckAccent={deckAccent}
      />
      {aside ? (
        <div className="grid gap-4 lg:grid-cols-[1fr_190px]">
          <div className="min-w-0 space-y-5">{children}</div>
          <aside className="space-y-4">{aside}</aside>
        </div>
      ) : (
        <div
          className={
            width === 'reading'
              ? 'max-w-prose mx-auto space-y-5'
              : 'space-y-5'
          }
        >
          {children}
        </div>
      )}
    </>
  );
}
