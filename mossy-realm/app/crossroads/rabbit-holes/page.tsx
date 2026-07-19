'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import Button from '@/components/ui/Button';
import { rabbitHoles, type Destination } from '@/lib/crossroads-content';

/**
 * /crossroads/rabbit-holes - destinations.
 *
 * Curated roads out, marked by kind. The random button picks one
 * for the indecisive traveler (client-side, no API).
 */

const kindLabels: Record<Destination['kind'], string> = {
  links: '[ links ]',
  reads: '[ reads ]',
  artifacts: '[ artifacts ]',
  tools: '[ tools ]',
};

export default function RabbitHolesPage() {
  const real = rabbitHoles.destinations.filter((d) => d.href);
  const [picked, setPicked] = useState<Destination | null>(null);

  const pickRandom = () => {
    const pool = real.filter((d) => d.href !== picked?.href);
    const list = pool.length > 0 ? pool : real;
    setPicked(list[Math.floor(Math.random() * list.length)]);
  };

  return (
    <>
      <PageHeader
        breadcrumbs={[{ href: '/crossroads', label: 'crossroads' }, { label: 'rabbit holes' }]}
        eyebrow="crossroads"
        title="rabbit holes"
        deckAccent="~ links worth falling into ~"
      />

      <div className="space-y-5">
        <Panel
          title="{ destinations }"
          surface="alt"
          titleRight={
            <Button variant="ghost" size="sm" onClick={pickRandom} className="text-xs">
              random road
            </Button>
          }
        >
          <p className="text-sm text-fg-secondary mb-3">{rabbitHoles.intro}</p>

          {picked && (
            <p className="text-sm mb-3 border-l-2 border-border-structural pl-2">
              <span className="font-nav text-meta uppercase tracking-wider text-fg-secondary">
                the dice say:{' '}
              </span>
              <a href={picked.href} target="_blank" rel="noopener noreferrer" className="text-link hover:text-link-hover">
                {picked.title}
              </a>
            </p>
          )}

          <ul className="space-y-3">
            {rabbitHoles.destinations.map((dest) => (
              <li key={dest.title} className="flex gap-2.5 items-baseline">
                <span className="font-nav text-micro uppercase tracking-wider text-border-structural shrink-0">
                  {kindLabels[dest.kind]}
                </span>
                <span>
                  {dest.href ? (
                    <a
                      href={dest.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:text-link-hover"
                    >
                      {dest.title}
                    </a>
                  ) : (
                    <span className="text-fg-secondary italic">{dest.title}</span>
                  )}
                  <span className="text-fg-secondary text-sm"> — {dest.note}</span>
                  {dest.sample && (
                    <span className="text-fg-warning text-micro uppercase tracking-wider ml-1">todo</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <p className="text-center text-caption text-fg-secondary italic">
          external links open in a new tab. holes may be deeper than they appear.
        </p>
      </div>
    </>
  );
}
