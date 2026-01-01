'use client';

import { useState } from 'react';
import Link from 'next/link';
import Marquee from './Marquee';

const navLinks = [
  { href: '/', label: 'Outpost' },
  { href: '/cabin', label: 'The Cabin' },
  { href: '/garden', label: 'Swamp Treasures' },
  { href: '/gallery', label: 'Pressed Flowers' },
  { href: '/guestbook', label: 'Guestbook' },
  { href: '/links', label: 'Rabbit Holes' },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

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

        {/* Desktop Navigation - VISIBLE ON DESKTOP */}
        <nav className="site-nav hidden md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="
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
              "
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation Toggle - ONLY ON MOBILE */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
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
            Navigation {isOpen ? '▲' : '▼'}
          </button>

          {/* Mobile Dropdown */}
          {isOpen && (
            <div className="mt-2 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="
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
                  "
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Marquee - flows right below header */}
      <Marquee />
    </>
  );
}
