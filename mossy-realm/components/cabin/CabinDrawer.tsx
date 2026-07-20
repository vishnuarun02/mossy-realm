'use client';

import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './CabinNotebook.module.css';

interface CabinIndexEntry {
  href: string;
  number: string;
  label: string;
  caption?: string;
  offset: 0 | 1 | 2 | 3 | 4;
  tab: 'left' | 'center' | 'right';
}

const entries: CabinIndexEntry[] = [
  { href: '/cabin', number: '00', label: 'cabin', caption: 'room notes', offset: 0, tab: 'left' },
  { href: '/cabin/about', number: '01', label: 'about', caption: 'operator', offset: 2, tab: 'center' },
  { href: '/cabin/now', number: '02', label: 'now', caption: 'live status', offset: 4, tab: 'right' },
  { href: '/cabin/crafting-table', number: '03', label: 'crafting table', caption: 'workbench', offset: 1, tab: 'left' },
  { href: '/cabin/recipes', number: '04', label: 'recipes', caption: 'kitchen db', offset: 3, tab: 'center' },
  { href: '/cabin/contact', number: '05', label: 'contact', caption: 'mailbox', offset: 0, tab: 'right' },
];

function isActive(pathname: string, entry: CabinIndexEntry) {
  return entry.href === '/cabin'
    ? pathname === '/cabin'
    : pathname.startsWith(entry.href);
}

function CabinetLip() {
  return (
    <div className={styles.sharedCabinetLip} aria-hidden="true">
      <Image
        src="/assets/mossy-ui/hardware/handle.svg"
        alt=""
        width={44}
        height={10}
        unoptimized
        className={styles.sharedCabinetHandle}
      />
    </div>
  );
}

function IndexLinks({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <ul className={styles.indexList}>
      {entries.map((entry) => {
        const active = isActive(pathname, entry);

        const tabClass =
          entry.tab === 'center'
            ? styles.folderTabCenter
            : entry.tab === 'right'
              ? styles.folderTabRight
              : '';
        const folderStyle = {
          '--folder-offset': `${entry.offset}px`,
        } as CSSProperties;

        return (
          <li
            key={entry.href}
            className={`${styles.indexItem} ${active ? styles.indexItemActive : ''}`}
          >
            <Link
              href={entry.href}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={`${styles.indexLink} ${active ? styles.indexLinkActive : ''}`}
              style={folderStyle}
            >
              <span
                className={`${styles.folderTabAsset} ${tabClass}`}
                aria-hidden="true"
              />
              <span className={styles.indexNumber}>{entry.number}</span>
              <span className={styles.indexCopy}>
                <span className={styles.indexLabel}>{entry.label}</span>
                {entry.caption && (
                  <span className={styles.indexCaption}>{entry.caption}</span>
                )}
              </span>
              <span className={styles.activeMarker} aria-hidden="true">
                {active ? '✶' : ''}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * CabinDrawer - a compact notebook/cabinet index.
 *
 * One cabinet frame holds offset folder files with asset-backed tabs,
 * number plates, paper edges, a shared label, and one shared handle.
 */
export default function CabinDrawer() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const current = entries.find((entry) => isActive(pathname, entry)) ?? entries[0];

  function handleEscape(event: KeyboardEvent) {
    if (event.key !== 'Escape' || !isOpen) return;
    event.preventDefault();
    setIsOpen(false);
    toggleRef.current?.focus();
  }

  return (
    <>
      <aside className={styles.desktopIndex} aria-label="Cabin notebook index">
        <div className={styles.cabinetHeader}>
          <span className={`mui-label-plate ${styles.labelPlate}`}>
            cabin notes
          </span>
        </div>
        <nav aria-label="Cabin index">
          <IndexLinks pathname={pathname} />
        </nav>
        <CabinetLip />
      </aside>

      <div className={styles.mobileIndex}>
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          onKeyDown={handleEscape}
          aria-expanded={isOpen}
          aria-controls="cabin-index-mobile"
          className={styles.mobileToggle}
        >
          <span className={`mui-label-plate ${styles.mobileTitle}`}>
            cabin index
          </span>
          <span className={styles.mobileCurrent}>
            {current.number} · {current.label}
          </span>
          <span className={styles.mobileCaret} aria-hidden="true">
            {isOpen ? 'close −' : 'open +'}
          </span>
        </button>
        {isOpen && (
          <nav
            id="cabin-index-mobile"
            aria-label="Cabin index"
            className={styles.mobilePanel}
            onKeyDown={handleEscape}
          >
            <IndexLinks
              pathname={pathname}
              onNavigate={() => setIsOpen(false)}
            />
            <CabinetLip />
          </nav>
        )}
      </div>
    </>
  );
}
