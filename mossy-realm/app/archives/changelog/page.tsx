import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import InsetPanel from '@/components/ui/InsetPanel';
import { getUpdates } from '@/lib/updates';

/**
 * /archives/changelog - the catalog log.
 *
 * The site log, printed from content/updates/. Reads like a
 * directory listing because that is what it is.
 */
export default function ChangelogPage() {
  const updates = getUpdates(15);

  return (
    <>
      <PageHeader
        eyebrow="archives"
        title="changelog"
        deckAccent="~ what changed and when ~"
      />

      <Panel title="{ catalog.log }" surface="alt">
        <InsetPanel padding="md" className="crt">
          <div className="catalog-log">
            <p className="log-row">
              <span className="log-date">C:\REALM&gt;</span>
              <span className="log-file">type catalog.log</span>
            </p>
            {updates.map((update, index) => (
              <p key={index} className="log-row">
                <span className="log-date">[{update.formattedDate}]</span>
                <span>{update.message}</span>
              </p>
            ))}
            <p className="log-row">
              <span className="log-date">C:\REALM&gt;</span>
              <span className="terminal-cursor" aria-hidden="true" />
            </p>
          </div>
        </InsetPanel>
        <p className="text-caption text-fg-secondary italic mt-3">
          printed from content/updates/. the log appends itself monthly.
        </p>
      </Panel>
    </>
  );
}
