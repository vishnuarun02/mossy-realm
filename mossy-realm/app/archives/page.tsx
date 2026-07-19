import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import TextLink from '@/components/ui/TextLink';
import { archives, artifacts } from '@/lib/archives-content';

/**
 * /archives - the catalog room.
 *
 * The basement landing: what this wing is, the newest acquisitions,
 * and the drawers (the catalog tabs above do the navigating).
 */
export default function ArchivesLanding() {
  const newest = artifacts.slice(0, 3);

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'archives' }]}
        eyebrow="archives"
        title="the catalog room"
        deckAccent={archives.whisper}
      />

      <div className="space-y-5">
        <Panel title="{ down here }" surface="alt">
          <p className="text-fg-primary">{archives.intro}</p>
        </Panel>

        <Panel title="{ recent acquisitions }">
          <ul className="space-y-2.5">
            {newest.map((artifact) => (
              <li key={artifact.slug} className="flex flex-wrap items-baseline gap-x-3">
                <span className="accession-tag">{artifact.accession}</span>
                <TextLink href={`/archives/collected/${artifact.slug}`} className="font-heading text-sm">
                  {artifact.title}
                </TextLink>
                <span className="artifact-duty">{artifact.kind}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            <TextLink href="/archives/collected" arrow>the full catalog</TextLink>
          </p>
        </Panel>

        <Panel title="{ the drawers }">
          <ul className="space-y-2 text-sm">
            <li>
              <TextLink href="/archives/collected" arrow>collected</TextLink>
              <span className="text-fg-secondary"> — artifacts with accession numbers.</span>
            </li>
            <li>
              <TextLink href="/archives/changelog" arrow>changelog</TextLink>
              <span className="text-fg-secondary"> — the site log, printed.</span>
            </li>
            <li>
              <TextLink href="/archives/sitemap" arrow>sitemap</TextLink>
              <span className="text-fg-secondary"> — the master map of every door.</span>
            </li>
          </ul>
        </Panel>
      </div>
    </>
  );
}
