import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import TextLink from '@/components/ui/TextLink';
import { credits } from '@/lib/crossroads-content';

/**
 * /crossroads/credits - the plaque wall.
 *
 * The realm is made of other people's work too. Each plaque names
 * what, who, and why it matters here.
 */
export default function CreditsPage() {
  return (
    <>
      <PageHeader
        eyebrow="crossroads"
        title="credits"
        deckAccent="~ thank you to ~"
      />

      <Panel title="{ the plaque wall }" surface="alt">
        <p className="text-sm text-fg-secondary mb-4">{credits.intro}</p>
        <ul className="space-y-3">
          {credits.entries.map((credit) => (
            <li key={credit.what} className="border-l-2 border-border-structural pl-3">
              <p className="text-sm">
                <span className="text-fg-heading font-heading">{credit.what}</span>
                <span className="text-fg-secondary"> by </span>
                {credit.href ? (
                  <TextLink href={credit.href}>{credit.who}</TextLink>
                ) : (
                  <span className="text-fg-primary">{credit.who}</span>
                )}
              </p>
              {credit.note && (
                <p className="text-caption text-fg-secondary italic">{credit.note}</p>
              )}
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
