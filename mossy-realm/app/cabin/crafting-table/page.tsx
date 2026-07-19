import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import Badge from '@/components/ui/Badge';
import Metadata from '@/components/ui/Metadata';
import TextLink from '@/components/ui/TextLink';
import { workbench, type BuildEntry, type LedState } from '@/lib/cabin-content';

/**
 * /cabin/crafting-table - the workbench.
 *
 * Drawers, not a project grid. Every build entry links to its
 * full build sheet (/cabin/crafting-table/[slug]).
 */

function Led({ state }: { state: LedState }) {
  const cls =
    state === 'green' ? 'led led-green' : state === 'amber' ? 'led led-amber' : 'led led-off';
  return <span className={cls} aria-hidden="true" />;
}

function BuildList({ entries }: { entries: BuildEntry[] }) {
  return (
    <ul className="space-y-3">
      {entries.map((entry) => (
        <li key={entry.slug} className="flex gap-2.5">
          <span className="mt-1.5"><Led state={entry.led} /></span>
          <div className="min-w-0">
            <p className="font-heading text-sm">
              <TextLink href={`/cabin/crafting-table/${entry.slug}`} className="text-fg-heading">
                {entry.title}
              </TextLink>
            </p>
            <p className="text-sm text-fg-secondary">{entry.note}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function CraftingTablePage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ href: '/cabin', label: 'my cabin' }, { label: 'crafting table' }]}
        eyebrow="my cabin"
        title="crafting table"
        deckAccent="~ the workbench ~"
      />

      <div className="space-y-5">
        <Panel title="{ on the bench }" surface="alt">
          <BuildList entries={workbench.activeBuilds} />
        </Panel>

        <Panel title="{ mid-experiment }">
          <BuildList entries={workbench.experiments} />
          <Metadata className="mt-3">
            <span>it is fine if these break. that is the point.</span>
          </Metadata>
        </Panel>

        <Panel title="{ the shelf of good intentions }">
          <BuildList entries={workbench.abandoned} />
        </Panel>

        <Panel title="{ tools in reach }">
          <div className="flex flex-wrap gap-1.5">
            {workbench.tools.map((tool) => (
              <Badge key={tool} variant="pill">{tool}</Badge>
            ))}
          </div>
        </Panel>

        <Panel title="{ build log }">
          <ul className="space-y-2">
            {workbench.buildLog.map((entry) => (
              <li key={entry.date} className="flex gap-3 text-sm">
                <Metadata className="shrink-0 whitespace-nowrap">
                  <span>{entry.date}</span>
                </Metadata>
                <span className="text-fg-primary">{entry.note}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
