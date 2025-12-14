import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Decorative top */}
      <div className="pixel-bar-double mb-3" />
      
      <div className="space-y-3">
        {/* ASCII art decoration */}
        <p className="text-mossy-border/50 text-xs tracking-[0.2em] font-mono">
          .:*~*:._.:*~*:._.:*~*:._.:*~*:.
        </p>

        {/* Web Buttons/Badges Row */}
        <div className="flex flex-wrap justify-center gap-2">
          <div 
            className="bg-mossy-bg-box-alt border-2 border-mossy-border px-2 py-1 text-xs text-mossy-text-muted hover:border-mossy-link transition-colors"
            style={{ boxShadow: '2px 2px 0 #3c2912' }}
          >
            [neocities]
          </div>
          <div 
            className="bg-mossy-bg-box-alt border-2 border-mossy-border px-2 py-1 text-xs text-mossy-text-muted hover:border-mossy-link transition-colors"
            style={{ boxShadow: '2px 2px 0 #3c2912' }}
          >
            [next.js]
          </div>
          <div 
            className="bg-mossy-bg-box-alt border-2 border-mossy-border px-2 py-1 text-xs text-mossy-text-muted hover:border-mossy-link transition-colors"
            style={{ boxShadow: '2px 2px 0 #3c2912' }}
          >
            [best viewed 1024x768]
          </div>
        </div>

        <div className="pixel-bar" />

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-2 text-xs font-nav">
          <Link href="/about" className="text-mossy-link hover:text-mossy-link-hover">
            [about]
          </Link>
          <span className="text-mossy-border">*</span>
          <Link href="/contact" className="text-mossy-link hover:text-mossy-link-hover">
            [contact]
          </Link>
          <span className="text-mossy-border">*</span>
          <Link href="/sitemap" className="text-mossy-link hover:text-mossy-link-hover">
            [sitemap]
          </Link>
          <span className="text-mossy-border">*</span>
          <Link href="/credits" className="text-mossy-link hover:text-mossy-link-hover">
            [credits]
          </Link>
        </div>

        {/* Visitor Counter + Copyright */}
        <div className="flex flex-wrap justify-center items-center gap-3 text-xs">
          <span className="text-mossy-text-muted font-body">
            visitors: <span className="text-mossy-header font-bold font-mono">000001</span>
          </span>
          <span className="text-mossy-border">|</span>
          <span className="text-mossy-text-muted font-body">
            MossyRealm 2025
          </span>
        </div>

        {/* ASCII art bottom */}
        <p className="text-mossy-border/50 text-xs tracking-[0.2em] font-mono">
          .:*~*:._.:*~*:._.:*~*:._.:*~*:.
        </p>

        {/* Fun message */}
        <p className="text-mossy-text-muted text-xs font-accent">
          ~ thanks for visiting ~
        </p>
      </div>
    </footer>
  );
}
