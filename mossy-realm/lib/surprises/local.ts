import { pickWithoutRecent } from './pick';
import type { LocalSurprise, WikipediaSignal } from './types';

export const localFieldNotes: LocalSurprise[] = [
  {
    id: 'field-nav-wrap',
    kind: 'field-note',
    message: 'field note: nav wrapped on small screens. noted, then fixed the same day.',
    href: '/fieldwork/field-notes',
    linkLabel: 'open the note strip',
  },
  {
    id: 'field-grain',
    kind: 'field-note',
    message: 'field note: grain at 0.30 reads fine. 0.35 starts eating small text.',
    href: '/fieldwork/field-notes',
    linkLabel: 'open the note strip',
  },
  {
    id: 'field-r2',
    kind: 'field-note',
    message: 'field note: the audio bucket worked without any CDN gymnastics.',
    href: '/fieldwork/field-notes',
    linkLabel: 'open the note strip',
  },
  {
    id: 'field-two-songs',
    kind: 'field-note',
    message: 'field note: two songs at once is a state-management bug, not a feature.',
    href: '/fieldwork/field-notes',
    linkLabel: 'open the note strip',
  },
];

export const localSiteArtifacts: LocalSurprise[] = [
  {
    id: 'artifact-frog',
    kind: 'site-artifact',
    message: 'archive drawer MR-001 contains the realm’s first resident.',
    href: '/archives/collected/frog-eats-fly',
    linkLabel: 'inspect the frog',
  },
  {
    id: 'artifact-hello',
    kind: 'site-artifact',
    message: 'archive drawer MR-002 contains a hello tag from the old web.',
    href: '/archives/collected/hello-tag',
    linkLabel: 'inspect the hello tag',
  },
  {
    id: 'artifact-welcome',
    kind: 'site-artifact',
    message: 'archive drawer MR-003 keeps the cabin’s animated welcome sign.',
    href: '/archives/collected/welcome-sign',
    linkLabel: 'inspect the sign',
  },
  {
    id: 'artifact-wallpaper',
    kind: 'site-artifact',
    message: 'archive drawer MR-007 records the forest behind everything.',
    href: '/archives/collected/the-wallpaper',
    linkLabel: 'inspect the wallpaper',
  },
];

export const rareFrogMessages: LocalSurprise[] = [
  {
    id: 'frog-cable',
    kind: 'frog-message',
    message: 'frog report: the cable was inspected. it remains mysterious.',
  },
  {
    id: 'frog-fly',
    kind: 'frog-message',
    message: 'frog report: one fly acquired. no further action required.',
  },
  {
    id: 'frog-build',
    kind: 'frog-message',
    message: 'frog report: the build is green. the frog takes full credit.',
  },
];

export const alternateFooterMessages: LocalSurprise[] = [
  {
    id: 'footer-moss',
    kind: 'footer-message',
    message: '☆ the moss noticed you stopping by ☆',
  },
  {
    id: 'footer-kettle',
    kind: 'footer-message',
    message: '☆ kettle still warm. door still open. ☆',
  },
  {
    id: 'footer-path',
    kind: 'footer-message',
    message: '☆ this path remembers your footsteps ☆',
  },
];

export const CABIN_KEYBOARD_SEQUENCE = 'moss';
export const RARE_FROG_CHANCE = 0.08;
export const ALTERNATE_FOOTER_CHANCE = 0.04;

export function pickCabinSurprise(
  recentIds: readonly string[],
  random: () => number = Math.random,
): LocalSurprise {
  const common = [...localFieldNotes, ...localSiteArtifacts];
  const pool = random() < RARE_FROG_CHANCE ? rareFrogMessages : common;
  return pickWithoutRecent(pool, recentIds, (item) => item.id, random);
}

/** Returns null most of the time; consumers must opt in explicitly. */
export function pickAlternateFooterMessage(
  random: () => number = Math.random,
): LocalSurprise | null {
  if (random() >= ALTERNATE_FOOTER_CHANCE) return null;
  return pickWithoutRecent(alternateFooterMessages, [], (item) => item.id, random);
}

/** Local relay used by both the API route and the offline client state. */
export const wikipediaFallbackSignals: WikipediaSignal[] = [
  {
    title: 'Personal web page',
    extract:
      'A personal web page is created by an individual to share interests, writing, or information about themselves.',
    url: 'https://en.wikipedia.org/wiki/Personal_web_page',
  },
  {
    title: 'Field notebook',
    extract:
      'A field notebook records observations made during practical work outside a formal laboratory.',
    url: 'https://en.wikipedia.org/wiki/Field_notebook',
  },
  {
    title: 'GeoCities',
    extract:
      'GeoCities was a web-hosting service whose neighborhood model became part of early personal-web culture.',
    url: 'https://en.wikipedia.org/wiki/GeoCities',
  },
  {
    title: 'Frog',
    extract:
      'Frogs are tailless amphibians found across much of the world and, occasionally, above website navigation.',
    url: 'https://en.wikipedia.org/wiki/Frog',
  },
];
