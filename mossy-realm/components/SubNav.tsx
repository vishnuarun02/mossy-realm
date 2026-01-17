'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SubNavLink {
  href: string;
  label: string;
}

interface SubNavProps {
  links: SubNavLink[];
}

export default function SubNav({ links }: SubNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className="
        bg-mossy-bg-box-alt
        border-b-3 border-mossy-border
        px-4 py-2
        flex flex-wrap justify-center gap-2
      "
      style={{ borderBottomWidth: '3px' }}
    >
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`
              font-nav
              px-3 py-1
              text-sm
              no-underline
              border-b-2
              transition-none
              ${isActive
                ? 'text-mossy-header border-mossy-border'
                : 'text-mossy-link border-transparent hover:text-mossy-link-hover hover:border-mossy-border'
              }
            `}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

