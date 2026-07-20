'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import TextLink from '@/components/ui/TextLink';
import {
  CABIN_KEYBOARD_SEQUENCE,
  pickCabinSurprise,
  rareFrogMessages,
} from '@/lib/surprises/local';
import { pickWithoutRecent, rememberPick } from '@/lib/surprises/pick';
import type { LocalSurprise } from '@/lib/surprises/types';
import styles from '@/components/cabin/CabinNotebook.module.css';

interface CabinSurpriseProps {
  status: string;
}

/** A tiny optional local surprise attached to the Cabin status lamp. */
export default function CabinSurprise({ status }: CabinSurpriseProps) {
  const [surprise, setSurprise] = useState<LocalSurprise | null>(null);
  const recentIds = useRef<string[]>([]);
  const keyBuffer = useRef('');

  const reveal = useCallback((frogOnly = false) => {
    const next = frogOnly
      ? pickWithoutRecent(
          rareFrogMessages,
          recentIds.current,
          (item) => item.id,
        )
      : pickCabinSurprise(recentIds.current);

    recentIds.current = rememberPick(recentIds.current, next.id);
    setSurprise(next);
  }, []);

  useEffect(() => {
    function listenForSequence(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.key.length !== 1 ||
        target?.matches('input, textarea, select, [contenteditable="true"]')
      ) {
        return;
      }

      keyBuffer.current = `${keyBuffer.current}${event.key.toLowerCase()}`.slice(
        -CABIN_KEYBOARD_SEQUENCE.length,
      );
      if (keyBuffer.current === CABIN_KEYBOARD_SEQUENCE) {
        reveal(true);
        keyBuffer.current = '';
      }
    }

    window.addEventListener('keydown', listenForSequence);
    return () => window.removeEventListener('keydown', listenForSequence);
  }, [reveal]);

  return (
    <div className={styles.statusGroup}>
      <p className={styles.statusLine}>
        <button
          type="button"
          onClick={() => reveal(false)}
          aria-label={
            surprise
              ? 'Reveal another small cabin surprise'
              : 'Check the cabin status lamp for a small surprise'
          }
          aria-controls="cabin-local-surprise"
          className={`${styles.surpriseTrigger} touch-target`}
        >
          <span className="led led-green" aria-hidden="true" />
        </button>
        <span>{status}</span>
      </p>

      {surprise && (
        <p
          id="cabin-local-surprise"
          className={styles.surpriseReveal}
          role="status"
        >
          <span>{surprise.message}</span>
          {surprise.href && surprise.linkLabel && (
            <>
              {' '}
              <TextLink href={surprise.href}>{surprise.linkLabel}</TextLink>
            </>
          )}
        </p>
      )}
    </div>
  );
}
