'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { CabinetIndex, DrawerFace } from '@/components/mossy-ui';

/**
 * CabinDrawer - the cabin's cabinet index.
 *
 * Replaces the old CabinDirectory with the mossy-ui cabinet family:
 * numbered folder rows with label plates and captions. The active
 * page stays open with an amber plate and ►. The Now drawer blinks
 * because it is live; nothing else blinks.
 *
 * Desktop: attached to the content surface on the left.
 * Mobile: a compact drawer selector above the content.
 */

const drawers = [
  { href: '/cabin', label: 'cabin door', caption: 'back to the room', number: undefined },
  { href: '/cabin/about', label: 'about', caption: 'the operator', number: '01' },
  { href: '/cabin/now', label: 'now', caption: 'live status', number: '02', lamp: 'blink' as const },
  { href: '/cabin/crafting-table', label: 'craft table', caption: 'the workbench', number: '03' },
  { href: '/cabin/recipes', label: 'recipes', caption: 'the kitchen db', number: '04' },
  { href: '/cabin/contact', label: 'contact', caption: 'the mailbox', number: '05' },
];

function DrawerRows({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {drawers.map((drawer) => {
        const isActive =
          drawer.href === '/cabin'
            ? pathname === '/cabin'
            : pathname.startsWith(drawer.href);
        return (
          <span key={drawer.href} onClick={onNavigate}>
            <DrawerFace
              href={drawer.href}
              number={drawer.number}
              label={drawer.label}
              caption={drawer.caption}
              lamp={drawer.lamp}
              active={isActive}
            />
          </span>
        );
      })}
    </>
  );
}

export default function CabinDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop: attached index */}
      <div className="hidden lg:block lg:sticky lg:top-4 self-start">
        <CabinetIndex label="cabinet index" withScrews>
          <DrawerRows />
        </CabinetIndex>
      </div>

      {/* Mobile: compact drawer selector above the content */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="cabin-drawer-mobile"
          className="
            mui-drawer-face w-full
            font-nav text-fg-heading
          "
        >
          <span className="mui-label-plate">cabin index</span>
          <span className="mui-drawer-caption">pick a drawer</span>
          <span className="flex-1" />
          <span aria-hidden="true" className="text-fg-secondary text-sm">
            {isOpen ? '▲ close' : '▼ open'}
          </span>
        </button>
        {isOpen && (
          <div id="cabin-drawer-mobile" className="mt-2">
            <CabinetIndex>
              <DrawerRows onNavigate={() => setIsOpen(false)} />
            </CabinetIndex>
          </div>
        )}
      </div>
    </>
  );
}
