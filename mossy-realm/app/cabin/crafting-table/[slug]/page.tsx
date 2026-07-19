import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import Badge from '@/components/ui/Badge';
import Callout from '@/components/ui/Callout';
import TextLink from '@/components/ui/TextLink';
import { projects } from '@/lib/cabin-content';

/**
 * /cabin/crafting-table/[slug] - the build sheet.
 *
 * The page from the project binder: what it was, why it existed,
 * tools, build notes, and the honest failures section. A rotated
 * status stamp marks active, logged, or abandoned work.
 */

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: `${project?.title ?? 'build sheet'} - MossyRealm` };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const prev = projects[index - 1] ?? null;
  const next = projects[index + 1] ?? null;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { href: '/cabin/crafting-table', label: 'my cabin' },
          { href: '/cabin/crafting-table', label: 'crafting table' },
          { label: project.title },
        ]}
        eyebrow="build sheet"
        title={project.title}
      />

      <div className="space-y-5 max-w-2xl mx-auto">
        {/* Spec sheet */}
        <Panel
          title="{ sheet 001 }"
          surface="alt"
        >
          <div className="flex justify-end -mt-1 mb-2">
            <span className={`stamp stamp-${project.status}`}>{project.status}</span>
          </div>

          {project.sample && (
            <Callout variant="warning" label="sample sheet" className="mb-4">
              this is scaffolding. replace it with a real project from the bench.
            </Callout>
          )}

          <dl className="space-y-3 text-sm">
            <div>
              <dt className="font-nav uppercase tracking-wider text-meta text-fg-secondary">
                what it was
              </dt>
              <dd className="text-fg-primary">{project.what}</dd>
            </div>
            <div>
              <dt className="font-nav uppercase tracking-wider text-meta text-fg-secondary">
                why it existed
              </dt>
              <dd className="text-fg-primary">{project.why}</dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tools.map((tool) => (
              <Badge key={tool} variant="pill">{tool}</Badge>
            ))}
          </div>
        </Panel>

        {/* Build notes */}
        <Panel title="{ build notes }">
          <ol className="space-y-2 text-sm list-none">
            {project.notes.map((note, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="font-nav text-fg-heading shrink-0">{i + 1}.</span>
                <span className="text-fg-primary">{note}</span>
              </li>
            ))}
          </ol>
        </Panel>

        {/* Failures: the most honest section */}
        <Panel title="{ what failed }">
          <Callout variant="warning" label="the honest section">
            <ul className="space-y-1.5">
              {project.failures.map((failure) => (
                <li key={failure}>{failure}</li>
              ))}
            </ul>
          </Callout>
        </Panel>

        {/* Links */}
        {project.links.length > 0 && (
          <Panel title="{ related }">
            <ul className="space-y-2 text-sm">
              {project.links.map((link) => (
                <li key={link.href}>
                  <TextLink href={link.href} arrow={link.href.startsWith('http')}>
                    {link.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </Panel>
        )}

        {/* Sheet navigation */}
        <nav aria-label="Build sheet navigation" className="flex flex-wrap justify-between gap-3 font-nav text-sm">
          {prev ? (
            <TextLink href={`/cabin/crafting-table/${prev.slug}`} back>
              {prev.title}
            </TextLink>
          ) : (
            <span />
          )}
          <TextLink href="/cabin/crafting-table" className="mx-auto">
            back to the workbench
          </TextLink>
          {next ? (
            <TextLink href={`/cabin/crafting-table/${next.slug}`} arrow>
              {next.title}
            </TextLink>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </>
  );
}
