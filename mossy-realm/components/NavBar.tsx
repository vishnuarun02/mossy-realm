'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Trailhead' },
  { href: '/cabin', label: 'The Cabin' },
  { href: '/garden', label: 'Garden' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/guestbook', label: 'Guestbook' },
  { href: '/links', label: 'Links' },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      {/* Decorative top bar */}
      <div className="pixel-bar-double mb-3" />
      
      {/* Site Title */}
      <div className="site-title">
        <p className="text-mossy-border/70 text-xs tracking-[0.3em] mb-2">
          .:**:. .:**:. .:**:.
        </p>
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
        <p className="text-mossy-border/70 text-xs tracking-[0.3em] mt-2">
          .:**:. .:**:. .:**:.
        </p>
      </div>

      {/* Decorative bar before nav */}
      <div className="pixel-bar my-3" />

      {/* Desktop Navigation */}
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
            style={{
              boxShadow: '2px 2px 0 #3c2912'
            }}
          >
            [ {link.label} ]
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation Toggle */}
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
          style={{
            boxShadow: '2px 2px 0 #3c2912'
          }}
        >
          [ Navigation {isOpen ? '[-]' : '[+]'} ]
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
                [ {link.label} ]
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
