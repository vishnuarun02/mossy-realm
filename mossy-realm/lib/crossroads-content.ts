/**
 * ══════════════════════════════════════════════════════════════
 *  CROSSROADS - ALL EDITABLE CONTENT LIVES HERE
 * ══════════════════════════════════════════════════════════════
 *
 *  The junction. Each section feeds one page:
 *
 *    /crossroads               -> junction
 *    /crossroads/rabbit-holes  -> rabbitHoles (external destinations)
 *    /crossroads/guestbook     -> guestbook (transmissions)
 *    /crossroads/credits       -> credits
 *
 *  External signal config lives at the bottom. One switch turns it
 *  off forever: the page never breaks, it just shows the fallback.
 * ══════════════════════════════════════════════════════════════
 */

/* ─────────────────────────────────────────────
   /crossroads - the junction
   ───────────────────────────────────────────── */

export const junction = {
  whisper: '~ every road out of the realm starts here ~',
  intro:
    'The crossroads. Links worth the trip, a guestbook on the bulletin board, and a small window listening to the weather outside.',
};

/* ─────────────────────────────────────────────
   /crossroads/rabbit-holes - destinations
   ───────────────────────────────────────────── */

export interface Destination {
  title: string;
  href: string;
  /** One line on why it is worth the trip. */
  note: string;
  /** Road-sign flavor tag: links, reads, artifacts, tools */
  kind: 'links' | 'reads' | 'artifacts' | 'tools';
  sample?: boolean;
}

export const rabbitHoles = {
  intro:
    'destinations worth falling into. marked with the kind of road they take.',
  destinations: [
    {
      title: 'neocities',
      href: 'https://neocities.org',
      note: 'where the old web still lives. this site\'s spiritual landlord.',
      kind: 'links',
    },
    {
      title: 'are.na',
      href: 'https://www.are.na',
      note: 'a quiet place for collecting strange things together.',
      kind: 'artifacts',
    },
    {
      title: 'the cutting room floor',
      href: 'https://tcrf.net',
      note: 'unused content from games, catalogued by dedicated weirdos.',
      kind: 'reads',
    },
    {
      title: 'TODO: a road worth posting',
      href: '',
      note: 'reserved slot. the next good hole you fall into goes here.',
      kind: 'links',
      sample: true,
    },
  ] as Destination[],
};

/* ─────────────────────────────────────────────
   /crossroads/guestbook - the bulletin board
   ───────────────────────────────────────────── */

export interface Transmission {
  date: string;
  name: string;
  message: string;
  sample?: boolean;
}

export const guestbook = {
  intro:
    'the bulletin board by the road. messages get pinned by hand, the old way.',
  howToSign:
    'to sign the board, send a letter through the cabin mailbox with "guestbook" in it. it gets pinned on the next pass.',
  transmissions: [
    {
      date: '2026-07-19',
      name: 'the operator',
      message: 'first entry on the new board. the nails are still fresh.',
      sample: true,
    },
  ] as Transmission[],
};

/* ─────────────────────────────────────────────
   /crossroads/credits - the plaque wall
   ───────────────────────────────────────────── */

export interface Credit {
  what: string;
  who: string;
  href?: string;
  note?: string;
}

export const credits = {
  intro: 'the realm is made of other people\'s work too. the plaques:',
  entries: [
    { what: 'next.js + tailwind', who: 'vercel + the tailwind team', note: 'the frame and the paint' },
    { what: 'google fonts', who: 'cinzel, cormorant, lora, mystery quest, vt323', note: 'the lettering' },
    { what: 'undertale soundtrack', who: 'toby fox', href: 'https://tobyfox.bandcamp.com', note: 'the radio\'s first tapes' },
    { what: 'neocities', who: 'the old web revival', href: 'https://neocities.org', note: 'proof this web never died' },
    { what: 'asset sources', who: 'TODO: catalogue the gifs and badges', note: 'being written down properly' },
  ] as Credit[],
};

/* ─────────────────────────────────────────────
   THE SIGNAL WINDOW (weather)
   ─────────────────────────────────────────────
   One public, keyless API: open-meteo.com.
   Set enabled:false and the window quietly shows
   the fallback line forever. Nothing else changes.
   ───────────────────────────────────────────── */

export const signal = {
  enabled: true,
  /** Coordinates for the reading. TODO: set yours. */
  latitude: 37.7749,
  longitude: -122.4194,
  /** Label shown in the window. */
  station: 'the trees outside',
  /** Seconds before a fetch gives up. */
  timeoutMs: 5000,
  /** Cache: revalidate at most every 30 min. */
  revalidateSeconds: 1800,
  /** Always-rendered fallback when the signal is lost. */
  fallback: 'signal lost. the trees know anyway.',
};
