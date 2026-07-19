import { ReactNode } from 'react';
import Link from 'next/link';

/**
 * FolderTab - a compact folder-shaped tab for cabinet regions.
 *
 * Positions (left/center/right) shift the tab's slant so groups of
 * tabs interlock like a row of folders. Active tab is manila with ✶.
 * Local navigation only; global nav stays where it is.
 */

interface FolderTabProps {
  href?: string;
  onClick?: () => void;
  position?: 'left' | 'center' | 'right';
  active?: boolean;
  children: ReactNode;
  className?: string;
}

const positionClips: Record<string, string> = {
  left: 'polygon(0 0, calc(100% - 10px) 0, 100% 100%, 0 100%)',
  center: 'polygon(10px 0, calc(100% - 10px) 0, 100% 100%, 0 100%)',
  right: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%)',
};

export default function FolderTab({
  href,
  onClick,
  position = 'left',
  active = false,
  children,
  className = '',
}: FolderTabProps) {
  const classes = `
    inline-flex items-center min-h-[40px] px-3.5 pt-1.5 pb-1
    font-nav text-base
    border border-b-0
    transition-colors duration-fast
    ${active
      ? 'bg-surface-strip text-fg-inverse font-semibold border-border-strong'
      : 'bg-surface-panel text-fg-secondary border-border-structural hover:bg-surface-panel-alt hover:text-fg-primary'
    }
    ${className}
  `;
  const style = { clipPath: positionClips[position] };
  const content = (
    <>
      {active && <span aria-hidden="true" className="mr-1 text-xs">✶</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} aria-current={active ? 'page' : undefined} className={classes} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={classes} style={style}>
      {content}
    </button>
  );
}
