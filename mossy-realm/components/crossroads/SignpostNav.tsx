'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * SignpostNav - the crossroads direction signs.
 *
 * Arrow planks pointing at each road out. The active sign is the
 * amber one with the ✶. Section nav that looks like the junction,
 * not like tabs.
 */

const signs = [
  { href: '/crossroads', label: 'the junction' },
  { href: '/crossroads/rabbit-holes', label: 'rabbit holes' },
  { href: '/crossroads/guestbook', label: 'guestbook' },
  { href: '/crossroads/credits', label: 'credits' },
];

export default function SignpostNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Crossroads sections" className="mb-4">
      <ul className="signpost">
        {signs.map((sign) => {
          const isActive =
            sign.href === '/crossroads'
              ? pathname === '/crossroads'
              : pathname.startsWith(sign.href);
          return (
            <li key={sign.href}>
              <Link
                href={sign.href}
                aria-current={isActive ? 'page' : undefined}
                className={`signpost-link ${isActive ? 'signpost-link-active' : ''}`}
              >
                {sign.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
