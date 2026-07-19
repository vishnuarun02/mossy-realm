import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import Callout from '@/components/ui/Callout';
import TextLink from '@/components/ui/TextLink';
import { experiments, type Experiment } from '@/lib/fieldwork-content';

/**
 * /fieldwork/experiments/[slug] - the test log.
 *
 * One full log sheet: hypothesis, apparatus, procedure, measurements
 * (as instrument readouts), the unexpected, failure notes, and the
 * conclusion or its honest absence. Status stamped, not color-coded.
 */

interface ExperimentPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return experiments.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: ExperimentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const exp = experiments.find((e) => e.slug === slug);
  return { title: `${exp?.title ?? 'experiment'} - MossyRealm` };
}

function LogSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-label={label} className="mb-4">
      <h3 className="font-heading text-sm text-fg-heading uppercase tracking-wider mb-1.5">
        {label}
      </h3>
      {children}
    </section>
  );
}

export default async function ExperimentPage({ params }: ExperimentPageProps) {
  const { slug } = await params;
  const index = experiments.findIndex((e) => e.slug === slug);
  if (index === -1) notFound();

  const exp: Experiment = experiments[index];
  const prev = experiments[index - 1] ?? null;
  const next = experiments[index + 1] ?? null;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { href: '/fieldwork', label: 'fieldwork' },
          { href: '/fieldwork/experiments', label: 'experiments' },
          { label: exp.title },
        ]}
        eyebrow={`test log ${exp.accession}`}
        title={exp.title}
      />

      <div className="max-w-2xl mx-auto space-y-5">
        <Panel padding="md" surface="alt" className="graph-paper-faint">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="accession-tag">{exp.accession}</span>
            <span className={`stamp stamp-${exp.status === 'running' ? 'active' : exp.status === 'failed' ? 'failed' : 'logged'}`}>
              {exp.status}
            </span>
          </div>

          {exp.sample && (
            <Callout variant="warning" label="sample log sheet" className="mb-4">
              structure only. replace with a real test: what you tried, what you measured, what surprised you.
            </Callout>
          )}

          <p className="text-fg-primary mb-4">{exp.summary}</p>

          <LogSection label="hypothesis">
            <p className="text-sm text-fg-primary">{exp.hypothesis}</p>
          </LogSection>

          {exp.apparatus.length > 0 && (
            <LogSection label="apparatus">
              <ul className="text-sm space-y-1">
                {exp.apparatus.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="text-border-structural">▸</span>
                    <span className="text-fg-primary">{item}</span>
                  </li>
                ))}
              </ul>
            </LogSection>
          )}

          {exp.procedure.length > 0 && (
            <LogSection label="procedure">
              <ol className="text-sm space-y-1 list-none">
                {exp.procedure.map((step, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="font-nav text-fg-heading shrink-0">{i + 1}.</span>
                    <span className="text-fg-primary">{step}</span>
                  </li>
                ))}
              </ol>
            </LogSection>
          )}

          {exp.measurements.length > 0 && (
            <LogSection label="measurements">
              <div>
                {exp.measurements.map((m) => (
                  <div key={m.label} className="readout-row">
                    <span className="readout-label">{m.label}</span>
                    <span className="readout-value">{m.value}</span>
                  </div>
                ))}
              </div>
            </LogSection>
          )}

          {exp.unexpected && (
            <LogSection label="unexpected result">
              <Callout label="off the chart">{exp.unexpected}</Callout>
            </LogSection>
          )}

          {exp.failureNotes.length > 0 && (
            <LogSection label="failure notes">
              <ul className="text-sm space-y-1">
                {exp.failureNotes.map((note) => (
                  <li key={note} className="flex gap-2">
                    <span aria-hidden="true" className="text-fg-warning">✗</span>
                    <span className="text-fg-primary">{note}</span>
                  </li>
                ))}
              </ul>
            </LogSection>
          )}

          {exp.conclusion ? (
            <LogSection label="conclusion">
              <p className="text-sm text-fg-heading">{exp.conclusion}</p>
            </LogSection>
          ) : (
            <LogSection label="conclusion">
              <p className="text-sm text-fg-secondary italic">unwritten. the test continues.</p>
            </LogSection>
          )}

          {exp.nextExperiment && (
            <LogSection label="next experiment">
              <p className="text-sm text-fg-primary">{exp.nextExperiment}</p>
            </LogSection>
          )}
        </Panel>

        {/* Log navigation */}
        <nav aria-label="Test log navigation" className="flex flex-wrap justify-between gap-3 font-nav text-sm">
          {prev ? (
            <TextLink href={`/fieldwork/experiments/${prev.slug}`} back>
              {prev.accession}
            </TextLink>
          ) : (
            <span />
          )}
          <TextLink href="/fieldwork/experiments" className="mx-auto">
            back to the index
          </TextLink>
          {next ? (
            <TextLink href={`/fieldwork/experiments/${next.slug}`} arrow>
              {next.accession}
            </TextLink>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </>
  );
}
