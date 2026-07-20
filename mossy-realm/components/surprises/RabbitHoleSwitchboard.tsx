'use client';

import { useEffect, useRef, useState } from 'react';
import { oldWebDestinations, type OldWebDestination } from '@/data/old-web-destinations';
import { wikipediaFallbackSignals } from '@/lib/surprises/local';
import { pickWithoutRecent, rememberPick } from '@/lib/surprises/pick';
import type {
  WikipediaSignal,
  WikipediaSignalResponse,
} from '@/lib/surprises/types';
import Button from '@/components/ui/Button';
import InsetPanel from '@/components/ui/InsetPanel';
import TextLink from '@/components/ui/TextLink';
import styles from './MossySurprise.module.css';

type SignalState =
  | { status: 'idle' }
  | { status: 'loading' }
  | {
      status: 'result' | 'fallback';
      signal: WikipediaSignal;
      note?: string;
    };

function isWikipediaResponse(value: unknown): value is WikipediaSignalResponse {
  if (!value || typeof value !== 'object') return false;
  const record = value as Record<string, unknown>;
  const signal = record.signal;
  if (!signal || typeof signal !== 'object') return false;
  const candidate = signal as Record<string, unknown>;
  return (
    (record.source === 'wikimedia' || record.source === 'fallback') &&
    typeof candidate.title === 'string' &&
    typeof candidate.extract === 'string' &&
    typeof candidate.url === 'string'
  );
}

export default function RabbitHoleSwitchboard() {
  const [road, setRoad] = useState<OldWebDestination | null>(null);
  const [signalState, setSignalState] = useState<SignalState>({
    status: 'idle',
  });
  const roadHistory = useRef<string[]>([]);
  const signalController = useRef<AbortController | null>(null);

  useEffect(
    () => () => {
      const activeController = signalController.current;
      signalController.current = null;
      activeController?.abort();
    },
    [],
  );

  function pickRoad() {
    const next = pickWithoutRecent(
      oldWebDestinations,
      roadHistory.current,
      (destination) => destination.id,
    );
    roadHistory.current = rememberPick(roadHistory.current, next.id);
    setRoad(next);
  }

  async function tuneSignal() {
    signalController.current?.abort();
    const controller = new AbortController();
    signalController.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 7000);
    setSignalState({ status: 'loading' });

    try {
      const response = await fetch('/api/surprises/wikipedia', {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('signal response failed');

      const payload: unknown = await response.json();
      if (!isWikipediaResponse(payload)) {
        throw new Error('signal response was invalid');
      }

      setSignalState({
        status: payload.source === 'wikimedia' ? 'result' : 'fallback',
        signal: payload.signal,
        note:
          payload.source === 'fallback'
            ? 'the outside signal faded, so the local relay answered instead.'
            : undefined,
      });
    } catch {
      if (controller.signal.aborted && signalController.current !== controller) {
        return;
      }
      const fallback = pickWithoutRecent(
        wikipediaFallbackSignals,
        [],
        (item) => item.url,
      );
      setSignalState({
        status: 'fallback',
        signal: fallback,
        note: 'offline fallback: the local relay answered when Wikimedia could not.',
      });
    } finally {
      window.clearTimeout(timeout);
      if (signalController.current === controller) {
        signalController.current = null;
      }
    }
  }

  const signalBusy = signalState.status === 'loading';

  return (
    <div className={styles.switchboard}>
      <div className={styles.controls}>
        <section className={styles.control} aria-labelledby="random-road-title">
          <div className={styles.controlHeader}>
            <h2 id="random-road-title" className={styles.controlTitle}>
              random road
            </h2>
            <Button
              variant="primary"
              size="md"
              onClick={pickRoad}
              aria-describedby="random-road-hint"
            >
              {road ? 'draw another road' : 'random road'}
            </Button>
          </div>
          <p id="random-road-hint" className={styles.controlHint}>
            one route from {oldWebDestinations.length} locally filed destinations.
          </p>

          {road ? (
            <InsetPanel padding="md" className={styles.result}>
              <div className={styles.resultHeader}>
                <h3 className={styles.resultTitle}>{road.title}</h3>
                <p className={styles.metadata}>
                  <span>{road.category}</span>
                  {road.year && <span>{road.year}</span>}
                  <span>{road.safe ? 'general' : 'mixed content'}</span>
                  <span>external</span>
                </p>
              </div>
              <p className={styles.description}>{road.description}</p>
              <p className={styles.resultLinks}>
                <TextLink href={road.url} arrow>
                  open destination
                </TextLink>
                {road.archivedUrl && (
                  <TextLink href={road.archivedUrl}>open archived copy</TextLink>
                )}
              </p>
            </InsetPanel>
          ) : (
            <p className={styles.idleMessage} aria-live="polite">
              no road drawn yet. nothing opens until you choose the revealed link.
            </p>
          )}
        </section>

        <section className={styles.control} aria-labelledby="stray-signal-title">
          <div className={styles.controlHeader}>
            <h2 id="stray-signal-title" className={styles.controlTitle}>
              stray signal
            </h2>
            <Button
              variant="ghost"
              size="md"
              onClick={tuneSignal}
              disabled={signalBusy}
              aria-describedby="stray-signal-hint"
            >
              {signalBusy
                ? 'tuning…'
                : signalState.status === 'idle'
                  ? 'stray signal'
                  : 'retry signal'}
            </Button>
          </div>
          <p id="stray-signal-hint" className={styles.controlHint}>
            a random page summary from Wikimedia, fetched only when requested.
          </p>

          <div aria-live="polite" aria-busy={signalBusy}>
            {signalState.status === 'idle' && (
              <p className={styles.idleMessage}>
                receiver idle. the local relay remains ready if the network is not.
              </p>
            )}

            {signalState.status === 'loading' && (
              <p className={styles.statusMessage}>
                tuning the knowledge band
                <span className={styles.loadingDots} aria-hidden="true">
                  ...
                </span>
              </p>
            )}

            {(signalState.status === 'result' ||
              signalState.status === 'fallback') && (
              <InsetPanel padding="md" className={styles.result}>
                <div className={styles.resultHeader}>
                  <h3 className={styles.resultTitle}>
                    {signalState.signal.title}
                  </h3>
                  <p className={styles.metadata}>
                    <span>
                      {signalState.status === 'fallback'
                        ? 'local relay'
                        : 'wikimedia'}
                    </span>
                  </p>
                </div>
                <p className={styles.description}>
                  {signalState.signal.extract}
                </p>
                {signalState.note && (
                  <p className={styles.statusMessage}>{signalState.note}</p>
                )}
                <p className={styles.resultLinks}>
                  <TextLink href={signalState.signal.url} arrow>
                    open Wikipedia page
                  </TextLink>
                </p>
              </InsetPanel>
            )}
          </div>
        </section>
      </div>

      <p className={styles.footerNote}>
        revealed destinations stay put until you explicitly follow their link.
      </p>
    </div>
  );
}
