'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * SubNav - section-local wayfinding strip.
 *
 * Sits under the site header on interior sections (cabin, fieldwork,
 * crossroads, archives) so visitors always know which room of the
 * realm they're in. Active page gets the amber underline and ✶ glyph.
 */

interface SubNavLink {
  href: string;
  label: string;
}

interface SubNavProps {
  links: SubNavLink[];
  /** Accessible name, e.g. "Cabin sections". */
  label: string;
}

export default function SubNav({ links, label }: SubNavProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label={label}
      className="
        bg-surface-panel-alt
        border-b-frame border-border-structural
        px-4 py-2
        flex flex-wrap justify-center gap-2
      "
    >
      {links.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? 'page' : undefined}
            className={`
              font-nav
              px-3 py-1
              min-h-[44px] md:min-h-0 inline-flex items-center
              text-sm
              no-underline
              border-b-2
              ${isActive
                ? 'text-fg-heading border-border-structural'
                : 'text-link border-transparent hover:text-link-hover hover:border-border-structural'
              }
            `}
          >
            {isActive && <span aria-hidden="true" className="text-border-strong mr-1">✶</span>}
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
