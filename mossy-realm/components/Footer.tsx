import Link from 'next/link';
import Marquee from './Marquee';
import VisitorCounter from './VisitorCounter';

export default function Footer() {
  return (
    <>
      {/* Footer Marquee - flows left to right */}
      <Marquee
        message="✶ the forest remembers → take your time → all paths lead onward ✶"
        direction="right"
      />

      <footer className="site-footer">
        {/* Compact 90s-style footer */}
        <div className="space-y-3">
          {/* Web Buttons/Badges Row */}
          <div className="flex flex-wrap justify-center gap-2">
            <div className="bg-mossy-bg-box-alt border-2 border-mossy-border px-2 py-1 text-sm text-mossy-text-muted hover:border-mossy-link transition-colors">
              [neocities]
            </div>
            <div className="bg-mossy-bg-box-alt border-2 border-mossy-border px-2 py-1 text-sm text-mossy-text-muted hover:border-mossy-link transition-colors">
              [next.js]
            </div>
            <div className="bg-mossy-bg-box-alt border-2 border-mossy-border px-2 py-1 text-sm text-mossy-text-muted hover:border-mossy-link transition-colors">
              [best viewed with ☼]
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-2 text-sm font-nav">
            <Link href="/cabin/about" className="text-mossy-link hover:text-mossy-link-hover">
              about
            </Link>
            <span className="text-mossy-border">•</span>
            <Link href="/cabin/contact" className="text-mossy-link hover:text-mossy-link-hover">
              contact
            </Link>
            <span className="text-mossy-border">•</span>
            <Link href="/archives/sitemap" className="text-mossy-link hover:text-mossy-link-hover">
              sitemap
            </Link>
            <span className="text-mossy-border">•</span>
            <Link href="/crossroads/credits" className="text-mossy-link hover:text-mossy-link-hover">
              credits
            </Link>
          </div>

          {/* Visitor Counter + Copyright in one line */}
          <div className="flex flex-wrap justify-center items-center gap-3 text-sm">
            <VisitorCounter />
            <span className="text-mossy-border">|</span>
            <span className="text-mossy-text-muted font-body">
              ♥ MossyRealm 2026
            </span>
          </div>

          {/* Fun little message */}
          <p className="text-mossy-text-muted text-sm font-accent">
            ☆ thanks for visiting! come back soon~ ☆
          </p>
        </div>
      </footer>
    </>
  );
}
