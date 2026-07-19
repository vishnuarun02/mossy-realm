import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import InsetPanel from '@/components/ui/InsetPanel';
import Badge from '@/components/ui/Badge';
import Metadata from '@/components/ui/Metadata';
import TextLink from '@/components/ui/TextLink';
import Divider from '@/components/ui/Divider';
import { operator } from '@/lib/cabin-content';

/**
 * /cabin/about - the operator profile.
 *
 * Part ID card, part system-information screen, part scrapbook.
 * All content comes from lib/cabin-content.ts.
 */
export default function AboutPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ href: '/cabin', label: 'my cabin' }, { label: 'about' }]}
        eyebrow="my cabin"
        title="about"
        deckAccent="~ the person behind the moss ~"
      />

      <div className="space-y-5">
        {/* ID card */}
        <Panel title="{ operator id }" surface="alt">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Photo frame - honest empty frame until a real photo exists */}
            <div
              className="
                shrink-0 w-full sm:w-32 h-32
                border-2 border-dashed border-border-structural
                flex items-center justify-center text-center
                px-2
              "
            >
              <p className="text-micro text-fg-secondary italic">
                operator photo
                <br />
                (not developed yet)
              </p>
            </div>
            <div className="flex-1 space-y-3">
              <p className="text-fg-primary">{operator.intro}</p>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                {operator.quickFacts.map((fact) => (
                  <div key={fact.label} className="flex gap-2 text-sm">
                    <dt className="font-nav uppercase tracking-wider text-fg-secondary text-meta pt-0.5">
                      {fact.label}:
                    </dt>
                    <dd className="text-fg-heading">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Panel>

        {/* System information */}
        <Panel title="{ system information }">
          <InsetPanel padding="md" className="crt">
            <div className="terminal text-md space-y-0.5">
              <p>&gt; operator.sys --info</p>
              {operator.systemSpecs.map((spec) => (
                <p key={spec.label}>
                  &gt; {spec.label.padEnd(12, ' ')}: {spec.value}
                </p>
              ))}
              <p className="terminal-cursor">&gt; </p>
            </div>
          </InsetPanel>
        </Panel>

        {/* Interests */}
        <Panel title="{ interests }">
          <div className="space-y-3">
            {operator.interests.map((group) => (
              <div key={group.group}>
                <Metadata className="mb-1.5">
                  <span className="text-border-structural">[ {group.group} ]</span>
                </Metadata>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Badge key={item} variant="pill">{item}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Timeline */}
        <Panel title="{ small timeline }">
          <ul className="space-y-2">
            {operator.timeline.map((entry, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="font-nav text-fg-heading w-12 shrink-0 text-right">
                  {entry.year}
                </span>
                <span className="text-border-structural" aria-hidden="true">•</span>
                <span className="text-fg-primary">{entry.entry}</span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Currently + favorites */}
        <Panel title="{ currently into }">
          <p className="text-sm mb-3">
            <span className="font-nav uppercase tracking-wider text-meta text-fg-secondary">
              current obsession:
            </span>{' '}
            <span className="text-fg-heading">{operator.currentObsession}</span>
          </p>
          <Divider tone="subtle" className="my-3" />
          <p className="font-nav uppercase tracking-wider text-meta text-fg-secondary mb-2">
            favorite things:
          </p>
          <ul className="space-y-1.5 text-sm">
            {operator.favorites.map((fav) => (
              <li key={fav} className="flex gap-2">
                <span className="text-border-structural" aria-hidden="true">✶</span>
                <span className="text-fg-primary">{fav}</span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Realm links */}
        <Panel title="{ elsewhere in the realm }">
          <ul className="space-y-2 text-sm">
            {operator.realmLinks.map((link) => (
              <li key={link.href}>
                <TextLink href={link.href} arrow>{link.label}</TextLink>
                <span className="text-fg-secondary"> — {link.note}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
