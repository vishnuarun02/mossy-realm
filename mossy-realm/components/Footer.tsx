import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Compact 90s-style footer */}
      <div className="space-y-3">
        {/* Decorative top */}
        <p className="text-mossy-border/50 text-xs tracking-[0.5em]">
          ◇ ◆ ◇
        </p>

        {/* Web Buttons/Badges Row */}
        <div className="flex flex-wrap justify-center gap-2">
          <div className="bg-mossy-bg-box-alt border-2 border-mossy-border px-2 py-1 text-xs text-mossy-text-muted hover:border-mossy-link transition-colors">
            [neocities]
          </div>
          <div className="bg-mossy-bg-box-alt border-2 border-mossy-border px-2 py-1 text-xs text-mossy-text-muted hover:border-mossy-link transition-colors">
            [next.js]
          </div>
          <div className="bg-mossy-bg-box-alt border-2 border-mossy-border px-2 py-1 text-xs text-mossy-text-muted hover:border-mossy-link transition-colors">
            [best viewed at 1024x768]
          </div>
        </div>

        {/* Quick Links - smaller */}
        <div className="flex flex-wrap justify-center gap-2 text-xs font-nav">
          <Link href="/about" className="text-mossy-link hover:text-mossy-link-hover">
            about
          </Link>
          <span className="text-mossy-border">◆</span>
          <Link href="/contact" className="text-mossy-link hover:text-mossy-link-hover">
            contact
          </Link>
          <span className="text-mossy-border">◆</span>
          <Link href="/sitemap" className="text-mossy-link hover:text-mossy-link-hover">
            sitemap
          </Link>
          <span className="text-mossy-border">◆</span>
          <Link href="/credits" className="text-mossy-link hover:text-mossy-link-hover">
            credits
          </Link>
        </div>

        {/* Visitor Counter + Copyright in one line */}
        <div className="flex flex-wrap justify-center items-center gap-3 text-xs">
          <span className="text-mossy-text-muted font-body">
            ❧ visitors: <span className="text-mossy-header font-bold">000001</span>
          </span>
          <span className="text-mossy-border">|</span>
          <span className="text-mossy-text-muted font-body">
            MossyRealm 2025
          </span>
        </div>

        {/* Fun little message */}
        <p className="text-mossy-text-muted text-xs font-accent">
          ~ thanks for visiting ~
        </p>
      </div>
    </footer>
  );
}
