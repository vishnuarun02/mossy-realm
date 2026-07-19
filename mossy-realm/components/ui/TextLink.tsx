import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * TextLink - the green, glowing realm link.
 *
 * Default body link styling already applies to bare <a> tags globally.
 * Use this component when you need the link plus a consistent affordance:
 * - `arrow`: appends "→" for read-more / onward links.
 * - `back`: prepends "←" for return links.
 * - `underline={false}`: for nav-like contexts where underline is noise.
 *
 * If it performs an action instead of navigating, use Button.
 */

interface TextLinkProps {
  href: string;
  arrow?: boolean;
  back?: boolean;
  underline?: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

export default function TextLink({
  href,
  arrow,
  back,
  underline = true,
  className = '',
  onClick,
  children,
}: TextLinkProps) {
  const external = href.startsWith('http');
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        text-link hover:text-link-hover
        ${underline ? '' : 'no-underline'}
        transition-colors duration-fast
        ${className}
      `}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {back && <span aria-hidden="true">← </span>}
      {children}
      {arrow && <span aria-hidden="true"> →</span>}
      {external && <span className="sr-only">(opens in new tab)</span>}
    </Link>
  );
}
