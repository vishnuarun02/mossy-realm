import { ReactNode } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

/**
 * SiteShell - the one publication frame.
 *
 * The centered amber-framed "scanned field guide" that holds every page:
 * site header (title + nav) -> marquee -> main -> footer.
 *
 * Previously copied into six layout files. Section layouts should now
 * be thin wrappers:
 *
 *   export default function CabinLayout({ children }) {
 *     return <SiteShell>{children}</SiteShell>;
 *   }
 *
 * The homepage passes className="relative" historically; keep doing so
 * via the className prop if a page needs it.
 */

interface SiteShellProps {
  /** Extra classes on the outer site-container (rarely needed). */
  className?: string;
  /** Extra classes on <main> (e.g. homepage grid tweaks). */
  mainClassName?: string;
  /** Section-local navigation strip rendered between header and main. */
  subNav?: ReactNode;
  children: ReactNode;
}

export default function SiteShell({
  className = '',
  mainClassName = '',
  subNav,
  children,
}: SiteShellProps) {
  return (
    <div className={`site-container ${className}`}>
      <NavBar />
      {subNav}
      <main className={`site-main ${mainClassName}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
