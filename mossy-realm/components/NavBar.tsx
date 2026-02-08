'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Marquee from './Marquee';

interface NavItem {
  label: string;
  href?: string;
  children?: { href: string; label: string }[];
}

const navItems: NavItem[] = [
  { label: 'Outpost', href: '/' },
  {
    label: 'The Cabin',
    children: [
      { href: '/cabin/about', label: 'about' },
      { href: '/cabin/now', label: 'now' },
      { href: '/cabin/trophy-shelf', label: 'trophy shelf' },
    ],
  },
  {
    label: 'Fieldwork',
    children: [
      { href: '/fieldwork/learnings', label: 'learnings' },
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
      { href: '/archives/sitemap', label: 'sitemap' },
    ],
  },
];

function NavDropdown({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Check if any child is active
  const isChildActive = item.children?.some(child => pathname.startsWith(child.href));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          font-nav
          bg-mossy-bg-box-alt
          border-2 border-mossy-border
          px-4 py-2
          text-mossy-link
          hover:bg-mossy-border
          hover:text-mossy-bg-box
          transition-colors
          text-base
          font-semibold
          flex items-center gap-1
          ${isChildActive ? 'bg-mossy-border text-mossy-bg-box' : ''}
        `}
      >
        {item.label}
        <span className="text-xs ml-1">{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && item.children && (
        <div className="nav-dropdown">
          {item.children.map((child) => {
            const isActive = pathname === child.href || pathname.startsWith(child.href + '/');
            return (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => {
                  setIsOpen(false);
                  onNavigate?.();
                }}
                className={`
                  nav-dropdown-item
                  ${isActive ? 'nav-dropdown-item-active' : ''}
                `}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

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
      <header className="site-header">
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

        {/* Desktop Navigation */}
        <nav className="site-nav hidden md:flex">
          {navItems.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  font-nav
                  bg-mossy-bg-box-alt
                  border-2 border-mossy-border
                  px-4 py-2
                  text-mossy-link
                  no-underline
                  hover:bg-mossy-border
                  hover:text-mossy-bg-box
                  hover:no-underline
                  transition-colors
                  text-base
                  font-semibold
                  ${pathname === item.href ? 'bg-mossy-border text-mossy-bg-box' : ''}
                `}
              >
                {item.label}
              </Link>
            ) : (
              <NavDropdown key={item.label} item={item} />
            )
          )}
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="
              font-nav
              w-full
              bg-mossy-bg-box-alt
              border-2 border-mossy-border
              px-4 py-2
              text-mossy-link
              flex items-center justify-center gap-2
              font-semibold
            "
          >
            Navigation {isMobileOpen ? '▲' : '▼'}
          </button>

          {/* Mobile Dropdown */}
          {isMobileOpen && (
            <div className="mt-2 flex flex-col gap-1">
              {navItems.map((item) =>
                item.href ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`
                      font-nav
                      bg-mossy-bg-box-alt
                      border-2 border-mossy-border
                      px-4 py-2
                      text-mossy-link
                      no-underline
                      hover:bg-mossy-border
                      hover:text-mossy-bg-box
                      text-center
                      font-semibold
                      ${pathname === item.href ? 'bg-mossy-border text-mossy-bg-box' : ''}
                    `}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div key={item.label}>
                    <button
                      onClick={() =>
                        setOpenMobileDropdown(
                          openMobileDropdown === item.label ? null : item.label
                        )
                      }
                      className={`
                        font-nav
                        w-full
                        bg-mossy-bg-box-alt
                        border-2 border-mossy-border
                        px-4 py-2
                        text-mossy-link
                        flex items-center justify-center gap-2
                        font-semibold
                        ${item.children?.some(c => pathname.startsWith(c.href)) ? 'bg-mossy-border text-mossy-bg-box' : ''}
                      `}
                    >
                      {item.label}
                      <span className="text-xs">
                        {openMobileDropdown === item.label ? '▲' : '▼'}
                      </span>
                    </button>
                    
                    {openMobileDropdown === item.label && item.children && (
                      <div className="flex flex-col">
                        {item.children.map((child) => {
                          const isActive = pathname === child.href || pathname.startsWith(child.href + '/');
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => {
                                setIsMobileOpen(false);
                                setOpenMobileDropdown(null);
                              }}
                              className={`
                                font-nav
                                bg-mossy-bg-box
                                border-x-2 border-b-2 border-mossy-border
                                px-6 py-2
                                text-mossy-link
                                no-underline
                                hover:bg-mossy-border
                                hover:text-mossy-bg-box
                                text-center
                                text-sm
                                ${isActive ? 'bg-mossy-border text-mossy-bg-box' : ''}
                              `}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </header>

      {/* Marquee - flows right below header */}
      <Marquee />
    </>
  );
}
