import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import InsetPanel from '@/components/ui/InsetPanel';
import TextLink from '@/components/ui/TextLink';
import { artifacts } from '@/lib/archives-content';

/**
 * /archives/collected/[slug] - the artifact view.
 *
 * The object on its stand, next to its catalog card: accession
 * number, provenance, current duty, curator notes.
 */

interface ArtifactPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return artifacts.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: ArtifactPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artifact = artifacts.find((a) => a.slug === slug);
  return { title: `${artifact?.title ?? 'artifact'} - MossyRealm` };
}

export default async function ArtifactPage({ params }: ArtifactPageProps) {
  const { slug } = await params;
  const index = artifacts.findIndex((a) => a.slug === slug);
  if (index === -1) notFound();

  const artifact = artifacts[index];
  const prev = artifacts[index - 1] ?? null;
  const next = artifacts[index + 1] ?? null;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { href: '/archives', label: 'archives' },
          { href: '/archives/collected', label: 'collected' },
          { label: artifact.title },
        ]}
        eyebrow={`artifact ${artifact.accession}`}
        title={artifact.title}
      />

      <div className="max-w-2xl mx-auto space-y-5">
        <div className="grid sm:grid-cols-[200px_1fr] gap-4 items-start">
          {/* The object on its stand */}
          <div>
            {artifact.src ? (
              <InsetPanel padding="md" className="flex items-center justify-center min-h-40">
                <Image
                  src={artifact.src}
                  alt={artifact.title}
                  width={160}
                  height={160}
                  unoptimized
                  className="object-contain max-w-full max-h-40"
                />
              </InsetPanel>
            ) : (
              <div className="border-2 border-dashed border-border-subtle min-h-40 flex items-center justify-center p-3">
                <p className="text-micro text-fg-secondary italic text-center">
                  object not yet photographed
                </p>
              </div>
            )}
          </div>

          {/* The catalog card */}
          <Panel title={`{ catalog card ${artifact.accession} }`} surface="alt">
            <dl className="space-y-2.5 text-sm">
              <div>
                <dt className="font-nav uppercase tracking-wider text-meta text-fg-secondary">accession</dt>
                <dd className="text-fg-heading">{artifact.accession}</dd>
              </div>
              <div>
                <dt className="font-nav uppercase tracking-wider text-meta text-fg-secondary">kind</dt>
                <dd className="text-fg-primary">{artifact.kind}</dd>
              </div>
              <div>
                <dt className="font-nav uppercase tracking-wider text-meta text-fg-secondary">current duty</dt>
                <dd className="text-fg-primary">{artifact.duty}</dd>
              </div>
              <div>
                <dt className="font-nav uppercase tracking-wider text-meta text-fg-secondary">provenance</dt>
                <dd className="text-fg-primary">{artifact.provenance}</dd>
              </div>
              <div>
                <dt className="font-nav uppercase tracking-wider text-meta text-fg-secondary">acquired</dt>
                <dd className="text-fg-primary">{artifact.acquired}</dd>
              </div>
            </dl>
          </Panel>
        </div>

        {artifact.notes && artifact.notes.length > 0 && (
          <Panel title="{ curator notes }">
            <ul className="space-y-1.5 text-sm">
              {artifact.notes.map((note) => (
                <li key={note} className="flex gap-2">
                  <span aria-hidden="true" className="text-border-structural">✶</span>
                  <span className="text-fg-primary">{note}</span>
                </li>
              ))}
            </ul>
          </Panel>
        )}

        {/* Catalog navigation */}
        <nav aria-label="Catalog navigation" className="flex flex-wrap justify-between gap-3 font-nav text-sm">
          {prev ? (
            <TextLink href={`/archives/collected/${prev.slug}`} back>
              {prev.accession}
            </TextLink>
          ) : (
            <span />
          )}
          <TextLink href="/archives/collected" className="mx-auto">
            back to the catalog
          </TextLink>
          {next ? (
            <TextLink href={`/archives/collected/${next.slug}`} arrow>
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
