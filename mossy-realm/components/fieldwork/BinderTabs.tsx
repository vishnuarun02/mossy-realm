'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * BinderTabs - fieldwork's section navigation.
 *
 * File-folder tabs along the top of the binder. The active tab is
 * the manila one with the ✶ mark. Same keyboard and aria behavior
 * as the rest of the realm; it just looks like a binder divider,
 * because this is the lab binder.
 */

const tabs = [
  { href: '/fieldwork', label: 'cover' },
  { href: '/fieldwork/learnings', label: 'learnings' },
  { href: '/fieldwork/experiments', label: 'experiments' },
  { href: '/fieldwork/field-notes', label: 'field notes' },
  { href: '/fieldwork/gallery', label: 'gallery' },
];

export default function BinderTabs() {
  const pathname = usePathname();

  return (
    <nav aria-label="Fieldwork sections">
      <ul className="binder-tabs">
        {tabs.map((tab) => {
          const isActive =
            tab.href === '/fieldwork'
              ? pathname === '/fieldwork'
              : pathname.startsWith(tab.href);
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={isActive ? 'page' : undefined}
                className={`binder-tab-link ${isActive ? 'binder-tab-link-active' : ''}`}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="binder-tab-desk" aria-hidden="true" />
    </nav>
  );
}
