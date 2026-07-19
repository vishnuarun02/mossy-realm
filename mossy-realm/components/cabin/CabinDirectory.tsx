'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Panel from '@/components/ui/Panel';
import {
  IdCardIcon,
  MonitorIcon,
  ToolboxIcon,
  RecipeBoxIcon,
  MailboxIcon,
  DoorIcon,
} from './CabinIcons';

/**
 * CabinDirectory - the room's file tree.
 *
 * Replaces the old horizontal submenu. A vertical directory nailed
 * to the cabin wall: every room a labeled object with a small pixel
 * icon and a caption. The active room gets an inset amber file, a ►
 * marker, and a green LED. The Now monitor blinks amber because it
 * is always live.
 *
 * Desktop: sticky left column. Mobile: a disclosure folder (button
 * with aria-expanded), never a scrolling tab bar.
 */

interface CabinDirectoryEntry {
  href: string;
  label: string;
  caption: string;
  icon: (props: { className?: string }) => React.ReactNode;
  live?: boolean;
}

const entries: CabinDirectoryEntry[] = [
  { href: '/cabin', label: 'cabin door', caption: 'back to the room', icon: DoorIcon },
  { href: '/cabin/about', label: 'about', caption: 'the operator', icon: IdCardIcon },
  { href: '/cabin/now', label: 'now', caption: 'live status', icon: MonitorIcon, live: true },
  { href: '/cabin/crafting-table', label: 'crafting table', caption: 'the workbench', icon: ToolboxIcon },
  { href: '/cabin/recipes', label: 'recipes', caption: 'the kitchen database', icon: RecipeBoxIcon },
  { href: '/cabin/contact', label: 'contact', caption: 'the mailbox', icon: MailboxIcon },
];

function DirectoryList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <ul className="cabin-directory-list">
      {entries.map((entry) => {
        const isActive =
          entry.href === '/cabin'
            ? pathname === '/cabin'
            : pathname.startsWith(entry.href);
        const Icon = entry.icon;

        return (
          <li key={entry.href} className="cabin-directory-item">
            <Link
              href={entry.href}
              onClick={onNavigate}
              aria-current={isActive ? 'page' : undefined}
              className={`cabin-directory-link ${isActive ? 'cabin-directory-link-active' : ''}`}
            >
              <Icon className="cabin-directory-icon" />
              <span className="cabin-directory-text">
                <span className="cabin-directory-label">{entry.label}</span>
                <span className="cabin-directory-caption">{entry.caption}</span>
              </span>
              {isActive ? (
                <span className="led led-green" aria-hidden="true" />
              ) : entry.live ? (
                <span className="led led-amber led-blink" aria-hidden="true" />
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function CabinDirectory() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop: sticky file tree */}
      <div className="hidden lg:block lg:sticky lg:top-4 self-start">
        <Panel
          title="{ cabin directory }"
          titleRight={<span className="led led-amber led-blink" aria-hidden="true" />}
        >
          <nav aria-label="Cabin directory">
            <DirectoryList />
          </nav>
        </Panel>
      </div>

      {/* Mobile: disclosure folder, never a tab bar */}
      <div className="lg:hidden">
        <Panel padding="none">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="cabin-directory-mobile"
            className="
              w-full min-h-[44px] px-3 py-2
              flex items-center justify-between
              font-nav text-lg text-fg-heading
              cursor-pointer
            "
          >
            <span className="flex items-center gap-2">
              <DoorIcon className="cabin-directory-icon" />
              cabin directory
            </span>
            <span aria-hidden="true" className="text-fg-secondary text-sm">
              {isOpen ? '▲ fold away' : '▼ unfold'}
            </span>
          </button>
          {isOpen && (
            <div id="cabin-directory-mobile" className="px-3 pb-3">
              <nav aria-label="Cabin directory">
                <DirectoryList onNavigate={() => setIsOpen(false)} />
              </nav>
            </div>
          )}
        </Panel>
      </div>
    </>
  );
}
