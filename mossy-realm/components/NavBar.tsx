'use client';

import { useState, useEffect } from 'react';
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

export default function NavBar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setOpenMobileDropdown(null);
  }, [pathname]);

  return (
    <>
      <header className="site-header relative">
        {/* Site Title */}
        <div className="site-title">
          <h1
            className="
              font-display
              text-mossy-header 
              text-2xl md:text-3xl 
              tracking-wider
              drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]
            "
          >
            welcome to mossyrealm
          </h1>
        </div>

        {/* Desktop Navigation - Inset Panel Style */}
        <nav className="nav-inset hidden md:block">
          <div className="nav-inset-bar">
            {navItems.map((item) => {
              const isActive = item.href
                ? pathname === item.href
                : item.children?.some(c => pathname.startsWith(c.href));

              return (
                <div key={item.label} className="nav-inset-item">
                  {item.href ? (
                    <Link
                      href={item.href}
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
                      <span className={`nav-inset-label ${isActive ? 'nav-inset-label-active' : ''}`}>
                        {item.label}
                      </span>
                      {item.children && (
                        <div className="nav-inset-dropdown">
                          {item.children.map((child) => {
                            const childActive = pathname === child.href || pathname.startsWith(child.href + '/');
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
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
                </div>
              );
            })}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="nav-mobile-toggle"
          >
            Navigation
            <span className="nav-mobile-caret">{isMobileOpen ? '▲' : '▼'}</span>
          </button>

          {isMobileOpen && (
            <div className="nav-mobile-menu">
              {navItems.map((item) => {
                const isActive = item.href
                  ? pathname === item.href
                  : item.children?.some(c => pathname.startsWith(c.href));
                const isExpanded = openMobileDropdown === item.label;

                return item.href ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`nav-mobile-item ${isActive ? 'nav-mobile-item-active' : ''}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div key={item.label} className="nav-mobile-group">
                    <button
                      onClick={() => setOpenMobileDropdown(isExpanded ? null : item.label)}
                      className={`nav-mobile-item nav-mobile-item-parent ${isActive ? 'nav-mobile-item-active' : ''}`}
                    >
                      {item.label}
                      <span className={`nav-mobile-item-caret ${isExpanded ? 'nav-mobile-item-caret-open' : ''}`}>›</span>
                    </button>

                    <div className={`nav-mobile-children ${isExpanded ? 'nav-mobile-children-open' : ''}`}>
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
