'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * CatalogTabs - the archives drawer dividers.
 *
 * Little label windows marking the drawers: collected, the log,
 * the map. Manila when active. A third nav metaphor for the third
 * wing of the realm.
 */

const tabs = [
  { href: '/archives', label: 'catalog' },
  { href: '/archives/collected', label: 'collected' },
  { href: '/archives/changelog', label: 'changelog' },
  { href: '/archives/sitemap', label: 'sitemap' },
];

export default function CatalogTabs() {
  const pathname = usePathname();

  return (
    <nav aria-label="Archives sections" className="mb-4">
      <ul className="catalog-tabs">
        {tabs.map((tab) => {
          const isActive =
            tab.href === '/archives'
              ? pathname === '/archives'
              : pathname.startsWith(tab.href);
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={isActive ? 'page' : undefined}
                className={`catalog-tab-link ${isActive ? 'catalog-tab-link-active' : ''}`}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
