/**
 * ══════════════════════════════════════════════════════════════
 *  MY CABIN - ALL EDITABLE CONTENT LIVES HERE
 * ══════════════════════════════════════════════════════════════
 *
 *  One file feeds every cabin page, including detail routes:
 *
 *    /cabin                       -> cabinWelcome
 *    /cabin/about                 -> operator
 *    /cabin/now                   -> now
 *    /cabin/crafting-table        -> workbench (+ projects for detail pages)
 *    /cabin/recipes               -> recipeBox (+ detail fields per recipe)
 *    /cabin/contact               -> contact
 *
 *  Voice: short, human, slightly strange, technically literate.
 *  No resume language. No fake nostalgia. See MY_CABIN_CONTENT_GUIDE.md.
 * ══════════════════════════════════════════════════════════════
 */

/* ─────────────────────────────────────────────
   /cabin - the landing hub
   ───────────────────────────────────────────── */

export const cabinWelcome = {
  whisper: '~ come in, the kettle is on ~',
  intro:
    'A small archive of machines, mistakes, and useful accidents. Desk in the corner, monitor that hums, cables with no known owner.',
  doorStatus: 'in. debugging something that worked yesterday.',
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
  intro:
    'I work on infrastructure and developer productivity at Shopify, mostly around CI reliability, flaky tests, and internal tooling. Outside work, I\'m into mechanical systems, electronics, philosophy, and techno music. I also build small software projects, take things apart, and maintain this strange corner of the internet.',

  quickFacts: [
    { label: 'name', value: 'vishnu' },
    { label: 'day work', value: 'developer productivity' },
    { label: 'focus', value: 'CI + infrastructure' },
    { label: 'where', value: 'Shopify' },
    { label: 'training', value: 'mechanical engineering' },
    { label: 'github', value: 'vishnuarun02' },
  ] as QuickFact[],

  systemSpecs: [
    { label: 'role', value: 'infrastructure / developer productivity @ Shopify' },
    { label: 'languages', value: 'python, typescript, ruby' },
    { label: 'systems', value: 'CI pipelines, build systems, internal tooling' },
    { label: 'prior art', value: 'manufacturing, rocket motors, computer vision' },
    { label: 'hardware', value: 'opens things not meant to be opened' },
    { label: 'known issue', value: 'starts more than finishes' },
  ] as QuickFact[],

  interests: [
    { group: 'machines', items: ['roll forming', 'rocket motors', 'hardware teardowns'] },
    { group: 'software', items: ['ci infrastructure', 'build systems', 'audio players'] },
    { group: 'data', items: ['data science', 'observability', 'computer vision'] },
    { group: 'offline', items: ['reading', 'cooking', 'music', 'field guides'] },
  ] as InterestGroup[],

  timeline: [
    { year: 'then', entry: 'studied mechanical engineering and learned to think in systems, tolerances, and failure modes.' },
    { year: 'then', entry: 'worked in roll forming and on rocket motors, where small mistakes become very physical.' },
    { year: 'next', entry: 'moved into data science and computer vision. python became another shop tool.' },
    { year: 'now', entry: 'builds CI infrastructure and developer tooling at Shopify.' },
    { year: '2026', entry: 'built this site instead of sleeping.' },
  ] as TimelineEntry[],

  currentObsession: 'note-taking systems',
  favorites: [
    'Is This Anything? - Jerry Seinfeld (current read)',
    'the Undertale soundtrack (on the radio, again)',
    'odd internet artifacts found at 1am',
  ],

  realmLinks: [
    { href: '/fieldwork/learnings', label: 'learnings', note: 'what building this place taught me' },
    { href: '/player', label: 'realm radio', note: 'what is playing on the desk' },
    { href: '/archives/sitemap', label: 'sitemap', note: 'every door' },
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
  /** Stamp shown in the monitor strip. Update when you update rows. */
  lastUpdated: '2026-07-19 09:00',

  /** The process list. led: green = active, amber = background, off = parked. */
  processes: [
    { label: 'building', value: 'the cabin, and the rooms beyond it', led: 'green' },
    { label: 'learning', value: 'note-taking systems', led: 'green' },
    { label: 'reading', value: 'Is This Anything? - Jerry Seinfeld', led: 'amber' },
    { label: 'playing', value: 'TODO: current game', led: 'amber' },
    { label: 'listening', value: 'the radio. Undertale, again', led: 'green' },
    { label: 'testing', value: 'how much texture is too much texture', led: 'green' },
    { label: 'thinking about', value: 'why old personal sites feel more alive', led: 'amber' },
  ] as ProcessRow[],

  /** Dated entries, newest first. */
  recentlyFixed: [
    { date: '2026-07-19', note: 'nav no longer wraps My Cabin onto two lines' },
    { date: '2026-02-05', note: 'the two-songs-at-once bug. removed the library instead' },
  ],

  recentlyBroken: [
    { date: '2026-07-19', note: 'the build, twice before lunch. cached css is a liar' },
  ],

  smallVictories: [
    'unified the audio player after the incident',
    'nav works with keyboard now',
    'the title finally fits on a 320px phone',
  ],

  experiments: [
    'how much texture is too much texture (watch this page)',
  ],

  changelog: [
    { date: '2026-07-19', note: 'the cabin got walls, a door, and a directory' },
    { date: '2026-02-09', note: 'moved in. navigation restructure complete' },
  ],
};

/* ─────────────────────────────────────────────
   /cabin/crafting-table - the workbench
   ───────────────────────────────────────────── */

export interface BuildEntry {
  slug: string;
  title: string;
  note: string;
  /** green = active, amber = slow, off = abandoned */
  led: LedState;
  href?: string;
}

/** Full build sheet for /cabin/crafting-table/[slug] */
export interface ProjectDetail {
  slug: string;
  title: string;
  status: 'active' | 'logged' | 'abandoned';
  /** One line: what it was. */
  what: string;
  /** Why it existed at all. */
  why: string;
  tools: string[];
  /** Build notes, oldest first. Short lines. */
  notes: string[];
  /** What failed. The most honest section. */
  failures: string[];
  links: { href: string; label: string }[];
  /** Mark samples so nobody mistakes scaffolding for history. */
  sample?: boolean;
}

export const workbench = {
  activeBuilds: [
    {
      slug: 'mossyrealm',
      title: 'mossyrealm',
      note: 'this site. a scanned field guide that is also a homepage.',
      led: 'green',
      href: 'https://github.com/vishnuarun02/mossy-realm',
    },
  ] as BuildEntry[],

  experiments: [
    {
      slug: 'mtu-notebooks',
      title: 'mtu notebooks',
      note: 'packet size vs. real networks. the graphs were wrong, the machine was right.',
      led: 'amber',
    },
    {
      slug: 'cabin-textures',
      title: 'cabin textures',
      note: 'dither patterns and scanlines that do not fight the text.',
      led: 'green',
    },
  ] as BuildEntry[],

  abandoned: [
    {
      slug: 'webamp-integration',
      title: 'webamp integration',
      note: 'two songs played at once for five days. removed it, built my own.',
      led: 'off',
      href: '/fieldwork/learnings/audio-player-refactor',
    },
  ] as BuildEntry[],

  tools: [
    'python', 'typescript', 'next.js', 'ruby', 'redis',
    'kafka', 'docker', 'kubernetes', 'buildkite', 'prometheus',
  ],

  buildLog: [
    { date: '2026-07-19', note: 'design system pass: tokens, primitives, one shell' },
    { date: '2026-02-08', note: 'radio loads tracks straight from the bucket' },
  ],
};

/** Detail sheets, keyed by slug. Samples are clearly marked. */
export const projects: ProjectDetail[] = [
  {
    slug: 'mossyrealm',
    title: 'mossyrealm',
    status: 'active',
    what: 'a personal site that looks like a scanned field guide from 1999.',
    why: 'the modern web has enough white cards with rounded corners.',
    tools: ['next.js 16', 'tailwind 4', 'typescript', 'cloudflare r2', 'upstash redis', 'vercel'],
    notes: [
      'started as a neocities-style experiment. escaped onto its own domain.',
      'the audio player was rebuilt from scratch after the two-songs-at-once incident.',
      'one design system pass later: tokens, primitives, one shell.',
    ],
    failures: [
      'trusted a css cache. the cache lied. twice.',
      'added fireflies once. the page looked like a circus. removed them.',
    ],
    links: [
      { href: 'https://github.com/vishnuarun02/mossy-realm', label: 'source on github' },
      { href: '/fieldwork/learnings', label: 'the build log, in long form' },
    ],
  },
  {
    slug: 'mtu-notebooks',
    title: 'mtu notebooks',
    status: 'logged',
    what: 'SAMPLE SHEET. network mtu and performance tests, written up as bench notes.',
    why: 'SAMPLE. replace with what actually happened: setup, numbers, surprise.',
    tools: ['iperf', 'ping', 'a spreadsheet that grew teeth'],
    notes: [
      'SAMPLE NOTE. what you tested, in one line.',
      'SAMPLE NOTE. what the first graph said.',
      'SAMPLE NOTE. why the graph was wrong.',
    ],
    failures: ['SAMPLE. the assumption that broke first.'],
    links: [],
    sample: true,
  },
  {
    slug: 'webamp-integration',
    title: 'webamp integration',
    status: 'abandoned',
    what: 'embedding a winamp clone for site music.',
    why: 'looked perfect. winamp on a 90s site writes itself.',
    tools: ['webamp', 'react', 'hope'],
    notes: [
      'day one: it rendered. day two: it played.',
      'day three through five: two songs at once, always.',
      'the fix was a trash icon. built a small unified player instead.',
    ],
    failures: [
      'state lived in two places. both thought they owned the play button.',
    ],
    links: [{ href: '/fieldwork/learnings/audio-player-refactor', label: 'the full write-up' }],
  },
  {
    slug: 'cabin-textures',
    title: 'cabin textures',
    status: 'active',
    what: 'dither patterns and crt scanlines for the cabin pages.',
    why: 'the site felt one degree too clean. paper has teeth.',
    tools: ['css gradients', 'one svg noise tile', 'restraint'],
    notes: [
      'global grain nudged up until text complained, then backed off.',
      'scanlines stay inside monitor frames. everywhere would be a costume.',
    ],
    failures: ['first pass made the body text look fuzzy. opacity is a dial, not a switch.'],
    links: [],
  },
];

/* ─────────────────────────────────────────────
   /cabin/recipes - the recipe box
   ───────────────────────────────────────────── */

export type RecipeSection = 'favorites' | 'quick meals' | 'experiments' | 'kerala';
export type RecipeStatus = 'favorite' | 'tested' | 'experiment' | 'failed';

export interface Recipe {
  slug: string;
  title: string;
  section: RecipeSection;
  status: RecipeStatus;
  /** One or two sentences on the card index. */
  note: string;
  prepTime?: string;
  cookTime?: string;
  serves?: string;
  ingredients: string[];
  steps: string[];
  /** Kitchen notes at the bottom of the card. */
  kitchenNotes: string[];
  tags: string[];
  /** Optional card photo: /images/cabin/... */
  image?: string;
  /** Mark samples clearly so nobody thinks they are real yet. */
  sample?: boolean;
}

export const recipeBox = {
  intro: 'an old database of things I cook. no life stories before the ingredients.',

  /**
   * Add recipes at the TOP of the array.
   * Delete the samples once real cards are filed.
   */
  recipes: [
    {
      slug: 'sample-garlic-noodles',
      title: 'sample: 15-minute garlic noodles',
      section: 'quick meals',
      status: 'tested',
      note: 'SAMPLE CARD. the structure of a real quick meal. replace with your own.',
      prepTime: '5 min',
      cookTime: '10 min',
      serves: '1',
      ingredients: [
        'noodles for one',
        '4 cloves garlic, sliced thin',
        '2 tbsp butter',
        '1 tbsp soy sauce',
        'chili flakes',
        'spring onion, if the fridge has one',
      ],
      steps: [
        'boil the noodles. save a cup of the water.',
        'butter + garlic on low until it smells like a good decision.',
        'noodles in, soy in, splash of noodle water. toss hard.',
        'chili flakes on top. eat standing up if nobody is watching.',
      ],
      kitchenNotes: [
        'the noodle water is the whole trick. starchy glue.',
        'SAMPLE NOTE. replace with the thing you learned the third time.',
      ],
      tags: ['noodles', 'weeknight'],
      sample: true,
    },
    {
      slug: 'sample-rice-experiment',
      title: 'sample: the toasted rice experiment',
      section: 'experiments',
      status: 'failed',
      note: 'SAMPLE CARD. failures get filed too. they teach more.',
      prepTime: '2 min',
      cookTime: '25 min',
      serves: '2',
      ingredients: ['1 cup rice', '2 cups water', 'salt'],
      steps: [
        'toast the dry rice in the pot first.',
        'add water, salt, lid on.',
        'SAMPLE STEP. write down what actually happened.',
      ],
      kitchenNotes: ['SAMPLE NOTE. what went wrong, and what you would try instead.'],
      tags: ['rice'],
      sample: true,
    },
    {
      slug: 'todo-kerala-card',
      title: 'TODO: a kerala recipe goes here',
      section: 'kerala',
      status: 'experiment',
      note: 'reserved slot. file a hometown or family recipe here when ready.',
      ingredients: [],
      steps: [],
      kitchenNotes: [],
      tags: ['kerala'],
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

  terminalIntro: [
    '> establishing connection to the cabin...',
    '> signal found. the operator is reachable.',
  ],

  availability:
    'I read everything. Replies happen when the moss permits, usually within a few days.',

  formNote: 'say hi, report a broken page, or recommend a song for the radio.',

  links: [
    { href: 'https://github.com/vishnuarun02', label: 'github', note: 'where the code lives' },
    { href: '/crossroads/guestbook', label: 'guestbook', note: 'leave a public mark instead' },
  ],
};
