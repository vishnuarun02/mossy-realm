import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import InsetPanel from '@/components/ui/InsetPanel';
import Metadata from '@/components/ui/Metadata';
import { now, type LedState } from '@/lib/cabin-content';

/**
 * /cabin/now - the living status monitor.
 *
 * A restrained process list on a CRT screen: what is being built,
 * learned, read, heard, and thought about, right now. Human and warm,
 * not a dashboard. All content from lib/cabin-content.ts.
 */

function Led({ state }: { state: LedState }) {
  const cls =
    state === 'green' ? 'led led-green' : state === 'amber' ? 'led led-amber' : 'led led-off';
  return <span className={cls} aria-hidden="true" />;
}

export default function NowPage() {
  return (
    <>
      <PageHeader
        eyebrow="my cabin"
        title="now"
        deckAccent="~ what the operator is up to ~"
      />

      <div className="space-y-5">
        {/* The status monitor */}
        <Panel
          title="{ status monitor }"
          titleRight={
            <span className="normal-case">updated {now.lastUpdated}</span>
          }
          surface="alt"
        >
          <InsetPanel padding="md" className="crt">
            <div className="terminal text-md space-y-1.5">
              <p>&gt; cabin --status --live</p>
              <ul className="space-y-1.5">
                {now.processes.map((proc) => (
                  <li key={proc.label} className="flex items-baseline gap-2">
                    <Led state={proc.led} />
                    <span className="text-fg-secondary font-nav text-meta uppercase tracking-wider w-28 shrink-0">
                      {proc.label}
                    </span>
                    <span className="break-words">{proc.value}</span>
                  </li>
                ))}
              </ul>
              <p className="terminal-cursor">&gt; </p>
            </div>
          </InsetPanel>
        </Panel>

        {/* Small victories */}
        <Panel title="{ small victories }">
          <ul className="space-y-1.5 text-sm">
            {now.smallVictories.map((victory) => (
              <li key={victory} className="flex gap-2">
                <span className="text-status-success" aria-hidden="true">✓</span>
                <span className="text-fg-primary">{victory}</span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Current experiments */}
        <Panel title="{ current experiments }">
          <ul className="space-y-1.5 text-sm">
            {now.experiments.map((experiment) => (
              <li key={experiment} className="flex gap-2">
                <span className="led led-amber led-blink mt-1.5" aria-hidden="true" />
                <span className="text-fg-primary">{experiment}</span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Change log */}
        <Panel title="{ cabin changelog }">
          <ul className="space-y-2">
            {now.changelog.map((entry) => (
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
