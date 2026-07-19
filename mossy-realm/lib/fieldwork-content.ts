/**
 * ══════════════════════════════════════════════════════════════
 *  FIELDWORK - ALL EDITABLE CONTENT LIVES HERE
 * ══════════════════════════════════════════════════════════════
 *
 *  The lab binder. Each section feeds one page:
 *
 *    /fieldwork               -> binder (cover + index)
 *    /fieldwork/experiments   -> experiments (+ test-log detail pages)
 *    /fieldwork/field-notes   -> fieldNotes
 *    /fieldwork/gallery       -> gallery
 *
 *  Voice: bench notes, not blog posts. Short lines. Numbers welcome.
 *  Samples are marked. Replace them with real test logs.
 * ══════════════════════════════════════════════════════════════
 */

/* ─────────────────────────────────────────────
   /fieldwork - binder cover
   ───────────────────────────────────────────── */

export const binder = {
  whisper: '~ measurements before opinions ~',
  intro:
    'The lab binder. Experiments, field notes, and photographs of things mid-test. Some entries end in a conclusion. More end in a question.',
  indexNote: 'newest entries file themselves at the top.',
};

/* ─────────────────────────────────────────────
   /fieldwork/experiments - the test logs
   ───────────────────────────────────────────── */

export type ExperimentStatus = 'running' | 'logged' | 'inconclusive' | 'failed';

export interface Experiment {
  slug: string;
  title: string;
  /** Bench-index one-liner. */
  summary: string;
  status: ExperimentStatus;
  /** Accession-style id, e.g. FW-001. */
  accession: string;
  area: string;

  hypothesis: string;
  apparatus: string[];
  procedure: string[];
  /** Measurement rows: label + value (+ optional unit). */
  measurements: { label: string; value: string }[];
  /** The interesting part. */
  unexpected?: string;
  failureNotes: string[];
  conclusion?: string;
  nextExperiment?: string;
  sample?: boolean;
}

export const experiments: Experiment[] = [
  {
    slug: 'mtu-jumbo-frames',
    title: 'do bigger packets actually help',
    accession: 'FW-001',
    area: 'networks',
    status: 'inconclusive',
    summary: 'mtu size vs. real-world throughput. the lab answer and the internet answer disagreed.',
    hypothesis: 'larger mtu, fewer headers, faster transfers. obvious, measurable, done by lunch.',
    apparatus: ['two machines', 'iperf3', 'one home router with opinions'],
    procedure: [
      'baseline at mtu 1500. three runs, median kept.',
      'raise mtu in steps. rerun. note where things fragment.',
      'repeat across the router, because the internet is not a lab bench.',
    ],
    measurements: [
      { label: 'lan, mtu 1500', value: 'SAMPLE VALUE' },
      { label: 'lan, mtu 9000', value: 'SAMPLE VALUE' },
      { label: 'wan, any mtu', value: 'see failure notes' },
    ],
    unexpected: 'the first graph said bigger was better. the first graph was wrong.',
    failureNotes: [
      'SAMPLE: what actually broke the clean result (fragmentation? a middlebox? the router?)',
    ],
    conclusion: undefined,
    nextExperiment: 'repeat with path mtu discovery logging. write down everything.',
    sample: true,
  },
  {
    slug: 'drone-target-cv',
    title: 'finding a target from the air',
    accession: 'FW-002',
    area: 'computer vision',
    status: 'logged',
    summary: 'target detection for an autonomous drone. teaching a model what a target looks like from above.',
    hypothesis: 'SAMPLE SHEET. replace with the real question you were answering.',
    apparatus: ['SAMPLE: model + dataset + the drone platform'],
    procedure: [
      'SAMPLE: data collection, in one line.',
      'SAMPLE: training run that mattered.',
      'SAMPLE: field test, and what the sky did to your plan.',
    ],
    measurements: [
      { label: 'detection rate, bench', value: 'SAMPLE VALUE' },
      { label: 'detection rate, field', value: 'SAMPLE VALUE' },
    ],
    failureNotes: ['SAMPLE: what the model learned that you did not want it to learn.'],
    sample: true,
  },
  {
    slug: 'ci-flake-hunt',
    title: 'the test that fails only on tuesdays',
    accession: 'FW-003',
    area: 'ci infrastructure',
    status: 'running',
    summary: 'a flaky suite in a big pipeline. every fix reveals another flake wearing a trench coat.',
    hypothesis: 'flakes come from shared state. find the state, kill the flake.',
    apparatus: ['buildkite', 'retry logs', 'a spreadsheet of shame'],
    procedure: [
      'collect two weeks of retries. group by failure signature.',
      'the top 20% of signatures explain 80% of pain. start there.',
      'TODO: finish this sentence with what you found.',
    ],
    measurements: [
      { label: 'retry rate, before', value: 'SAMPLE VALUE' },
      { label: 'retry rate, after', value: 'TODO' },
    ],
    failureNotes: ['quarantined tests breed. nobody owns a quarantined test.'],
    nextExperiment: 'ownership labels on every quarantined test. watch what happens.',
    sample: true,
  },
  {
    slug: 'roll-form-tolerances',
    title: 'TODO: roll forming notes',
    accession: 'FW-004',
    area: 'mechanical',
    status: 'logged',
    summary: 'reserved slot. what the mill taught you about tolerances, written down properly.',
    hypothesis: 'TODO',
    apparatus: [],
    procedure: [],
    measurements: [],
    failureNotes: [],
    sample: true,
  },
];

/* ─────────────────────────────────────────────
   /fieldwork/field-notes - the micro log
   ───────────────────────────────────────────── */

export interface FieldNote {
  date: string;
  note: string;
  tag?: string;
}

export const fieldNotes: FieldNote[] = [
  { date: '2026-07-19', note: 'nav wrapped on small screens. noted. fixed the same day.', tag: 'site' },
  { date: '2026-07-19', note: 'grain at 0.30 reads fine. 0.35 starts eating small text.', tag: 'site' },
  { date: '2026-02-08', note: 'r2 bucket serves audio fine. no cdn gymnastics needed yet.', tag: 'infra' },
  { date: '2026-02-05', note: 'two songs at once is a state-management bug, not a feature.', tag: 'audio' },
];

/* ─────────────────────────────────────────────
   /fieldwork/gallery - the contact sheet
   ───────────────────────────────────────────── */

export interface GalleryFrame {
  id: string;
  title: string;
  note: string;
  /** /images/fieldwork/... - empty string means unexposed frame */
  src?: string;
  sample?: boolean;
}

export const gallery = {
  intro: 'photographs of things mid-test. frames develop as the work does.',
  frames: [
    {
      id: 'frame-001',
      title: 'sample frame',
      note: 'SAMPLE. a photo of a test setup belongs here. 640x480 works well.',
      sample: true,
    },
  ] as GalleryFrame[],
};
