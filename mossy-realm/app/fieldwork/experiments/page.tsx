import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import TextLink from '@/components/ui/TextLink';
import { experiments } from '@/lib/fieldwork-content';

/**
 * /fieldwork/experiments - the bench index.
 *
 * Every experiment a punched accession tag, a title, and a one-line
 * summary. Click through to the full test log.
 */
export default function ExperimentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="fieldwork"
        title="experiments"
        deckAccent="~ the bench index ~"
      />

      <div className="space-y-3">
        {experiments.map((exp) => (
          <Panel key={exp.slug} padding="sm" className="graph-paper-faint">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="accession-tag">{exp.accession}</span>
              <TextLink
                href={`/fieldwork/experiments/${exp.slug}`}
                underline={false}
                className="font-heading text-fg-heading text-base"
              >
                {exp.title}
              </TextLink>
              <span className="font-nav text-meta uppercase tracking-wider text-fg-secondary">
                {exp.area} · {exp.status}
                {exp.sample ? ' · sample' : ''}
              </span>
            </div>
            <p className="text-sm text-fg-primary mt-1.5">{exp.summary}</p>
          </Panel>
        ))}
      </div>

      <p className="text-center text-caption text-fg-secondary italic mt-5">
        entries marked sample are empty log sheets, ready for real tests.
      </p>
    </>
  );
}
