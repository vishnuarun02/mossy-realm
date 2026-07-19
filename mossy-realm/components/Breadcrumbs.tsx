import Link from 'next/link';

/**
 * Breadcrumbs - the realm's compact path trail.
 *
 * SECTION / PAGE / CURRENT — green underlined parents, amber slashes,
 * the current page as plain muted text. One component, used by every
 * nested page. Parents are always links; the current page never is.
 *
 * Wraps cleanly on narrow screens. No horizontal overflow.
 */

export interface Crumb {
  href?: string;
  label: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`
        font-nav text-meta uppercase tracking-wider
        text-fg-secondary
        ${className}
      `}
    >
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((crumb, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5 min-w-0">
              {i > 0 && (
                <span aria-hidden="true" className="text-border-structural">
                  /
                </span>
              )}
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="text-link hover:text-link-hover transition-colors duration-fast"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className="text-fg-secondary"
                >
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
