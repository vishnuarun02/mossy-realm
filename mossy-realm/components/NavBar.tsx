'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Marquee from './Marquee';

interface NavItem {
  label: string;
  href?: string;
  children?: { href: string; label: string }[];
}

const navItems: NavItem[] = [
  { label: 'Outpost', href: '/' },
  {
    label: 'My Cabin',
    children: [
      { href: '/cabin/about', label: 'about' },
      { href: '/cabin/now', label: 'now' },
      { href: '/cabin/crafting-table', label: 'crafting table' },
      { href: '/cabin/recipes', label: 'recipes' },
      { href: '/cabin/contact', label: 'contact' },
    ],
  },
  {
    label: 'Fieldwork',
    children: [
      { href: '/fieldwork/learnings', label: 'learnings' },
      { href: '/fieldwork/experiments', label: 'experiments' },
      { href: '/fieldwork/field-notes', label: 'field notes' },
      { href: '/fieldwork/gallery', label: 'gallery' },
    ],
  },
  {
    label: 'Crossroads',
    children: [
      { href: '/crossroads/rabbit-holes', label: 'rabbit holes' },
      { href: '/crossroads/guestbook', label: 'guestbook' },
      { href: '/crossroads/credits', label: 'credits' },
    ],
  },
  {
    label: 'Archives',
    children: [
      { href: '/archives/collected', label: 'collected' },
      { href: '/archives/changelog', label: 'changelog' },
      { href: '/archives/sitemap', label: 'sitemap' },
    ],
  },
];

/**
 * NavBar - the inset-panel realm nav.
 *
 * Interaction contract (pointer and keyboard get the same menu):
 * - Desktop dropdowns open on pointer hover, on parent-button click,
 *   and on ArrowDown from the parent. Escape closes and returns focus
 *   to the parent. Focus leaving the item closes the menu.
 * - Active page is marked with a glyph (not color alone) and
 *   aria-current="page".
 * - Mobile is a disclosure accordion with the same aria wiring.
 */
export default function NavBar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const desktopNavRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setOpenMobileDropdown(null);
    setOpenDesktopDropdown(null);
  }, [pathname]);

  const closeDesktop = useCallback(() => setOpenDesktopDropdown(null), []);

  // Escape anywhere in the desktop nav closes the open dropdown
  useEffect(() => {
    if (!openDesktopDropdown) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDesktop();
        const button = desktopNavRef.current?.querySelector<HTMLButtonElement>(
          `[data-nav-parent="${openDesktopDropdown}"]`
        );
        button?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [openDesktopDropdown, closeDesktop]);

  return (
    <>
      <header className="site-header relative">
        {/* Site Title */}
        <div className="site-title">
          <h1
            className="
              font-display
              text-fg-heading
              text-display
              drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]
            "
          >
            welcome to mossyrealm
          </h1>
        </div>

        {/* Desktop Navigation - Inset Panel Style */}
        <nav aria-label="Realm" className="nav-inset hidden md:block" ref={desktopNavRef}>
          <ul className="nav-inset-bar">
            {navItems.map((item) => {
              const isActive = item.href
                ? pathname === item.href
                : item.children?.some(c => pathname.startsWith(c.href));
              const isOpen = openDesktopDropdown === item.label;
              const menuId = `nav-menu-${item.label.replace(/\s+/g, '-').toLowerCase()}`;

              return (
                <li
                  key={item.label}
                  className="nav-inset-item"
                  onMouseEnter={() => item.children && setOpenDesktopDropdown(item.label)}
                  onMouseLeave={() => item.children && closeDesktop()}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      closeDesktop();
                    }
                  }}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`nav-inset-label ${isActive ? 'nav-inset-label-active' : ''}`}
                    >
                      <span className={item.label === 'Outpost' ? 'pl-6' : ''}>{item.label}</span>

                      {item.label === 'Outpost' && (
                        <Image
                          src="/images/frog-eats-fly.gif"
                          alt=""
                          width={50}
                          height={42}
                          unoptimized
                          className="absolute -top-[55px] left-[6px] z-50 pointer-events-none"
                        />
                      )}
                    </Link>
                  ) : (
                    <>
                      <button
                        type="button"
                        data-nav-parent={item.label}
                        aria-expanded={isOpen}
                        aria-controls={menuId}
                        onClick={() => setOpenDesktopDropdown(isOpen ? null : item.label)}
                        onKeyDown={(e) => {
                          if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            setOpenDesktopDropdown(item.label);
                            requestAnimationFrame(() => {
                              document
                                .getElementById(menuId)
                                ?.querySelector<HTMLAnchorElement>('a')
                                ?.focus();
                            });
                          }
                        }}
                        className={`nav-inset-label ${isActive ? 'nav-inset-label-active' : ''}`}
                      >
                        {item.label}
                        <span aria-hidden="true" className="nav-inset-caret">
                          {isOpen ? '▴' : '▾'}
                        </span>
                      </button>
                      {item.children && (
                        <div
                          id={menuId}
                          className={`nav-inset-dropdown ${isOpen ? 'nav-inset-dropdown-open' : ''}`}
                        >
                          {item.children.map((child) => {
                            const childActive = pathname === child.href || pathname.startsWith(child.href + '/');
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                aria-current={childActive ? 'page' : undefined}
                                className={`nav-inset-dropdown-item ${childActive ? 'nav-inset-dropdown-item-active' : ''}`}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Navigation */}
        <div
          className="md:hidden"
          onKeyDown={(e) => {
            if (e.key === 'Escape' && isMobileOpen) {
              setIsMobileOpen(false);
              setOpenMobileDropdown(null);
            }
          }}
        >
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-expanded={isMobileOpen}
            aria-controls="nav-mobile-menu"
            className="nav-mobile-toggle"
          >
            Navigation
            <span aria-hidden="true" className="nav-mobile-caret">{isMobileOpen ? '▲' : '▼'}</span>
          </button>

          {isMobileOpen && (
            <div className="nav-mobile-menu" id="nav-mobile-menu">
              {navItems.map((item) => {
                const isActive = item.href
                  ? pathname === item.href
                  : item.children?.some(c => pathname.startsWith(c.href));
                const isExpanded = openMobileDropdown === item.label;
                const groupId = `nav-mobile-group-${item.label.replace(/\s+/g, '-').toLowerCase()}`;

                return item.href ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`nav-mobile-item ${isActive ? 'nav-mobile-item-active' : ''}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div key={item.label} className="nav-mobile-group">
                    <button
                      onClick={() => setOpenMobileDropdown(isExpanded ? null : item.label)}
                      aria-expanded={isExpanded}
                      aria-controls={groupId}
                      className={`nav-mobile-item nav-mobile-item-parent ${isActive ? 'nav-mobile-item-active' : ''}`}
                    >
                      {item.label}
                      <span aria-hidden="true" className={`nav-mobile-item-caret ${isExpanded ? 'nav-mobile-item-caret-open' : ''}`}>›</span>
                    </button>

                    <div id={groupId} className={`nav-mobile-children ${isExpanded ? 'nav-mobile-children-open' : ''}`}>
                      {item.children?.map((child) => {
                        const childActive = pathname === child.href || pathname.startsWith(child.href + '/');
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => {
                              setIsMobileOpen(false);
                              setOpenMobileDropdown(null);
                            }}
                            aria-current={childActive ? 'page' : undefined}
                            className={`nav-mobile-child ${childActive ? 'nav-mobile-child-active' : ''}`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </header>

      <Marquee />
    </>
  );
}
