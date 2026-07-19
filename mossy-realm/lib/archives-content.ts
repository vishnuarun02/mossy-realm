/**
 * ══════════════════════════════════════════════════════════════
 *  ARCHIVES - ALL EDITABLE CONTENT LIVES HERE
 * ══════════════════════════════════════════════════════════════
 *
 *  The basement file cabinet. Each section feeds one page:
 *
 *    /archives            -> archives (landing)
 *    /archives/collected  -> artifacts (+ artifact view pages)
 *    /archives/changelog  -> reads content/updates/*.md (existing)
 *    /archives/sitemap    -> the map (already data-driven)
 *
 *  Accession numbers: MR-###. File new artifacts at the top.
 * ══════════════════════════════════════════════════════════════
 */

/* ─────────────────────────────────────────────
   /archives - the catalog room
   ───────────────────────────────────────────── */

export const archives = {
  whisper: '~ everything the realm has swallowed ~',
  intro:
    'The basement. Collected artifacts, the site log, and the master map. Catalogued by hand, numbered with unreasonable optimism.',
};

/* ─────────────────────────────────────────────
   /archives/collected - the artifact catalog
   ───────────────────────────────────────────── */

export type ArtifactKind = 'gif' | 'badge' | 'image' | 'document' | 'object';

export interface Artifact {
  slug: string;
  accession: string;
  title: string;
  kind: ArtifactKind;
  /** Where it lives in the realm today. */
  duty: string;
  /** The catalog note: what it is, where it came from (honestly). */
  provenance: string;
  /** Object file under /public, if one exists. */
  src?: string;
  /** When it entered the collection. */
  acquired: string;
  /** Extra curator notes. */
  notes?: string[];
}

export const artifacts: Artifact[] = [
  {
    slug: 'frog-eats-fly',
    accession: 'MR-001',
    title: 'the frog',
    kind: 'gif',
    duty: 'sits above the outpost sign, eating a fly on loop',
    provenance: 'classic web gif. source lost to time, which is where all classic gifs come from.',
    src: '/images/frog-eats-fly.gif',
    acquired: '2026-01',
    notes: ['the realm\'s first resident.', 'never blinks. that is the fly\'s job.'],
  },
  {
    slug: 'hello-tag',
    accession: 'MR-002',
    title: 'the hello tag',
    kind: 'gif',
    duty: 'tucked into the corner of the welcome photo',
    provenance: 'an old hello gif, the kind personal sites stapled everywhere.',
    src: '/images/hellotags.gif',
    acquired: '2026-01',
  },
  {
    slug: 'welcome-sign',
    accession: 'MR-003',
    title: 'the welcome sign',
    kind: 'gif',
    duty: 'greets visitors from the cabin door',
    provenance: '"welcome to the internet" road-sign gif. retired from the front page to the cabin.',
    src: '/images/welcome-to-internet.gif',
    acquired: '2026-01',
  },
  {
    slug: 'realm-guardian',
    accession: 'MR-004',
    title: 'sir mucus mcsniff',
    kind: 'image',
    duty: 'guards the outpost sidebar',
    provenance: 'once a humble booger. now the realm\'s fiercest protector.',
    src: '/realm-guardian.gif',
    acquired: '2026-01',
    notes: ['do not ask about the name. he chose it himself.'],
  },
  {
    slug: 'construction-crew',
    accession: 'MR-005',
    title: 'the construction crew',
    kind: 'gif',
    duty: 'staffs every unfinished page',
    provenance: 'barricades, planners, and caution tape from the golden age of under-construction pages.',
    src: '/images/construction/planning-construction.gif',
    acquired: '2026-01',
    notes: ['they have never finished anything. neither has the site. it works.'],
  },
  {
    slug: 'validation-badges',
    accession: 'MR-006',
    title: 'the w3c badge set',
    kind: 'badge',
    duty: 'hangs in the outpost badges panel',
    provenance: 'valid html 4.01, valid css, xhtml 1.1. validity is a state of mind.',
    src: '/images/badges/valid-html401.png',
    acquired: '2026-02',
  },
  {
    slug: 'the-wallpaper',
    accession: 'MR-007',
    title: 'the wallpaper',
    kind: 'image',
    duty: 'the forest behind everything',
    provenance: 'a vintage national-geographic scan that made the whole site feel like a field guide.',
    src: '/vintage-natgeo.jpg',
    acquired: '2026-01',
    notes: ['the single most important artifact in the collection.'],
  },
  {
    slug: 'todo-uncatalogued',
    accession: 'MR-008',
    title: 'TODO: the next artifact',
    kind: 'object',
    duty: 'not yet assigned',
    provenance: 'reserved slot. the next thing worth keeping goes here, with its story.',
    acquired: 'TODO',
  },
];
