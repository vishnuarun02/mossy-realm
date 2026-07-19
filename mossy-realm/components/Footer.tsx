import Marquee from './Marquee';
import VisitorCounter from './VisitorCounter';
import Badge from './ui/Badge';
import TextLink from './ui/TextLink';

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
            <Badge className="hover:border-link transition-colors duration-fast">
              [neocities]
            </Badge>
            <Badge className="hover:border-link transition-colors duration-fast">
              [next.js]
            </Badge>
            <Badge className="hover:border-link transition-colors duration-fast">
              [best viewed with ☼]
            </Badge>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center items-center gap-2 text-sm font-nav">
            <TextLink href="/cabin/contact" underline={false}>
              contact
            </TextLink>
            <span aria-hidden="true" className="text-border-structural">•</span>
            <TextLink href="/cabin/about" underline={false}>
              about
            </TextLink>
            <span aria-hidden="true" className="text-border-structural">•</span>
            <TextLink href="/archives/sitemap" underline={false}>
              sitemap
            </TextLink>
          </div>

          {/* Visitor Counter + Copyright in one line */}
          <div className="flex flex-wrap justify-center items-center gap-3 text-sm">
            <VisitorCounter />
            <span aria-hidden="true" className="text-border-structural">|</span>
            <span className="text-fg-secondary font-body">
              ♥ MossyRealm 2026
            </span>
          </div>

          {/* Fun little message */}
          <p className="text-fg-secondary text-sm font-accent">
            ☆ thanks for visiting! come back soon ☆
          </p>
        </div>
      </footer>
    </>
  );
}
