/**
 * ══════════════════════════════════════════════════════════════
 *  MY CABIN - ALL EDITABLE CONTENT LIVES HERE
 * ══════════════════════════════════════════════════════════════
 *
 *  This is the ONLY file you need to edit to fill the cabin.
 *  Each page reads its own section:
 *
 *    /cabin            -> cabinWelcome
 *    /cabin/about      -> operator
 *    /cabin/now        -> now
 *    /cabin/crafting-table -> workbench
 *    /cabin/recipes    -> recipeBox
 *    /cabin/contact    -> contact
 *
 *  Rules of the room:
 *  - One or two sentences per entry. The cabin is cozy, not a wiki.
 *  - No tildes at the end of sentences, no exclamation-mark hype.
 *  - Honest entries only. Unfinished things are labeled unfinished.
 *  - See MY_CABIN_CONTENT_GUIDE.md for field-by-field instructions.
 * ══════════════════════════════════════════════════════════════
 */

/* ─────────────────────────────────────────────
   /cabin - the landing hub
   ───────────────────────────────────────────── */

export const cabinWelcome = {
  /** Accent-font whisper under the title. */
  whisper: '~ come in, the kettle is on ~',
  /** One short paragraph of welcome. */
  intro:
    'This is my room in the realm. Desk in the corner, too many cables, a monitor that hums. Everything I make, read, cook, and break eventually ends up in here.',
  /** Small status line shown on the door panel. */
  doorStatus: 'the operator is in. deep in a build.',
};

/* ─────────────────────────────────────────────
   /cabin/about - the operator
   ───────────────────────────────────────────── */

export interface QuickFact {
  label: string;
  value: string;
}

export interface InterestGroup {
  group: string;
  items: string[];
}

export interface TimelineEntry {
  year: string;
  entry: string;
}

export const operator = {
  /** Short intro. Two or three sentences, first person. */
  intro:
    "I'm vishnu. I build software, collect small obsessions, and keep this realm. The cabin is where the half-finished projects and the finished ones argue over shelf space.",

  /** ID-card quick facts. Keep values short. */
  quickFacts: [
    { label: 'operator', value: 'vishnu' },
    { label: 'role', value: 'builder of realms' },
    { label: 'location', value: 'the cabin' },
    { label: 'status', value: 'deep work' },
    { label: 'github', value: 'vishnuarun02' },
  ] as QuickFact[],

  /** Playful "system specifications". Add/edit freely. */
  systemSpecs: [
    { label: 'os', value: 'mossOS 1.0' },
    { label: 'kernel', value: 'curiosity-driven' },
    { label: 'editor', value: 'whatever is open' },
    { label: 'uptime', value: 'since the realm began' },
    { label: 'coffee level', value: 'TODO: measure' },
  ] as QuickFact[],

  /** Interest groups shown as pill clusters. */
  interests: [
    { group: 'creative', items: ['pixel hunting', 'old web archaeology'] },
    { group: 'hobbies', items: ['reading', 'cooking', 'walking nowhere in particular'] },
    { group: 'tech', items: ['typescript', 'next.js', 'audio stuff', 'small tools'] },
    { group: 'misc', items: ['note-taking systems', 'field guides'] },
  ] as InterestGroup[],

  /**
   * Small timeline. 3-6 entries max.
   * TODO: replace the prompts with real moments (first computer,
   * first line of code, first site, this realm...).
   */
  timeline: [
    { year: '????', entry: 'TODO: first computer moment' },
    { year: '????', entry: 'TODO: first thing you ever shipped' },
    { year: '2026', entry: 'built MossyRealm and moved in' },
  ] as TimelineEntry[],

  /** Currently-obsessed line + favorite things list. */
  currentObsession: 'note-taking systems',
  favorites: [
    'Is This Anything? - Jerry Seinfeld (current read)',
    'Undertale soundtrack (on the radio)',
    'the smell of rain on moss',
  ],

  /** Realm links worth pointing at from the profile. */
  realmLinks: [
    { href: '/fieldwork/learnings', label: 'learnings', note: 'what building this place taught me' },
    { href: '/player', label: 'realm radio', note: 'what is playing in the cabin' },
    { href: '/archives/sitemap', label: 'sitemap', note: 'every door in the realm' },
  ],
};

/* ─────────────────────────────────────────────
   /cabin/now - the living status page
   ───────────────────────────────────────────── */

export type LedState = 'green' | 'amber' | 'off';

export interface ProcessRow {
  label: string;
  value: string;
  led: LedState;
}

export const now = {
  /** Shown as the monitor's last-updated stamp. Keep it honest. */
  lastUpdated: '2026-07-19 09:00',

  /** The process list. led: green = active, amber = idle/slow, off = parked. */
  processes: [
    { label: 'building', value: 'the cabin itself, this week', led: 'green' },
    { label: 'learning', value: 'note-taking systems', led: 'green' },
    { label: 'reading', value: 'Is This Anything? - Jerry Seinfeld', led: 'amber' },
    { label: 'listening', value: 'realm radio, mostly Undertale', led: 'amber' },
    { label: 'thinking about', value: 'how personal sites earn personality', led: 'green' },
  ] as ProcessRow[],

  /** Small victories. Brag-sized, one line each. */
  smallVictories: [
    'unified the audio player after the two-songs-at-once incident',
    'nav works with keyboard now',
    'the title finally fits on a 320px phone',
  ],

  /** Current experiments. It is fine if they break. */
  experiments: [
    'how much texture is too much texture (watch this page)',
  ],

  /**
   * Short change log, newest first. One line each.
   * TODO: keep it fresh; delete old rows freely.
   */
  changelog: [
    { date: '2026-07-19', note: 'the cabin got walls, a door, and a directory' },
    { date: '2026-02-09', note: 'moved in. navigation restructure complete' },
  ],
};

/* ─────────────────────────────────────────────
   /cabin/crafting-table - the workbench
   ───────────────────────────────────────────── */

export interface BuildEntry {
  title: string;
  note: string;
  /** green = active, amber = slow, off = parked */
  led: LedState;
  href?: string;
}

export const workbench = {
  /** Active builds. What is actually on the bench right now. */
  activeBuilds: [
    {
      title: 'MossyRealm',
      note: 'this site. a scanned field guide that is also a homepage',
      led: 'green',
      href: 'https://github.com/vishnuarun02/mossy-realm',
    },
  ] as BuildEntry[],

  /** Experiments in progress. Half-baked is expected. */
  experiments: [
    {
      title: 'cabin textures',
      note: 'dither patterns and CRT scanlines that do not fight the text',
      led: 'amber',
    },
  ] as BuildEntry[],

  /**
   * Abandoned prototypes. Honest shelf of things that did not make it.
   * TODO: name them. The webamp fight is the first entry.
   */
  abandoned: [
    {
      title: 'webamp integration',
      note: 'two songs played at once for five days. removed it, built my own',
      led: 'off',
      href: '/fieldwork/learnings/audio-player-refactor',
    },
  ] as BuildEntry[],

  /** Tools currently being explored. */
  tools: ['next.js 16', 'tailwind 4', 'howler', 'cloudflare r2', 'vitest'],

  /** Build log, newest first. */
  buildLog: [
    { date: '2026-07-19', note: 'design system pass: tokens, primitives, one shell' },
    { date: '2026-02-08', note: 'radio loads tracks straight from the R2 bucket' },
  ],
};

/* ─────────────────────────────────────────────
   /cabin/recipes - the recipe box
   ───────────────────────────────────────────── */

export type RecipeSection = 'favorites' | 'quick meals' | 'experiments' | 'kerala';

export interface Recipe {
  id: string;
  title: string;
  section: RecipeSection;
  time?: string;
  serves?: string;
  tags: string[];
  /** One or two sentences. What it is, why it is here. */
  note: string;
  /** 'worked' | 'failed' for experiments. Omit elsewhere. */
  outcome?: 'worked' | 'failed';
  /** Mark samples clearly so nobody thinks they are real yet. */
  sample?: boolean;
}

export const recipeBox = {
  /** One-line intro for the database strip. */
  intro: 'an old database of things I cook. no life stories before the ingredients.',

  /**
   * The cards. Add recipes at the TOP of the array.
   * Delete the samples once real cards are filed.
   */
  recipes: [
    {
      id: 'sample-1',
      title: 'sample card: 15-minute garlic noodles',
      section: 'quick meals',
      time: '15 min',
      serves: '1',
      tags: ['noodles', 'weeknight'],
      note: 'SAMPLE ENTRY. Replace with a real quick meal: what it is, and the one trick that makes it work.',
      sample: true,
    },
    {
      id: 'sample-2',
      title: 'sample card: the rice experiment',
      section: 'experiments',
      tags: ['rice'],
      note: 'SAMPLE ENTRY. Tried toasting the rice first. Document failures too, they teach more.',
      outcome: 'failed',
      sample: true,
    },
    {
      id: 'todo-kerala',
      title: 'TODO: a kerala recipe goes here',
      section: 'kerala',
      tags: ['kerala'],
      note: 'Reserved slot. File family or hometown recipes here when ready.',
      sample: true,
    },
  ] as Recipe[],
};

/* ─────────────────────────────────────────────
   /cabin/contact - the mailbox
   ───────────────────────────────────────────── */

export const contact = {
  /**
   * Where the mailbox delivers. The form composes a mailto: to this
   * address. TODO: confirm this inbox exists, then make it yours.
   */
  email: 'hello@mossyrealm.space',

  /** Terminal lines shown while "connecting". Keep 2-3 short lines. */
  terminalIntro: [
    '> establishing connection to the cabin...',
    '> signal found. the operator is reachable.',
  ],

  /** Availability / response expectations. Honest, one or two lines. */
  availability:
    'I read everything. Replies happen when the moss permits, usually within a few days.',

  /** What the form is for. One line. */
  formNote: 'say hi, report a broken page, or recommend a song for the radio.',

  /** External links. The mailbox also lists other doors. */
  links: [
    { href: 'https://github.com/vishnuarun02', label: 'github', note: 'where the code lives' },
    { href: '/crossroads/guestbook', label: 'guestbook', note: 'leave a public mark instead' },
  ],
};
