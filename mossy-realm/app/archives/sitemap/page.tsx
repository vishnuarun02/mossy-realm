import PageShell from "@/components/PageShell";
import Panel from "@/components/ui/Panel";
import TextLink from "@/components/ui/TextLink";

/**
 * Sitemap - every public path through the realm.
 * Data-driven so it stays honest as routes change.
 */

interface SitemapLink {
  href: string;
  note: string;
}

interface SitemapSection {
  name: string;
  links: SitemapLink[];
}

const sections: SitemapSection[] = [
  {
    name: 'outpost',
    links: [{ href: '/', note: 'the front door' }],
  },
  {
    name: 'my cabin',
    links: [
      { href: '/cabin/about', note: 'about me' },
      { href: '/cabin/now', note: 'current state' },
      { href: '/cabin/crafting-table', note: 'projects & wins' },
      { href: '/cabin/recipes', note: 'food, no life stories' },
      { href: '/cabin/contact', note: 'reach me' },
    ],
  },
  {
    name: 'fieldwork',
    links: [
      { href: '/fieldwork/learnings', note: 'long-form writing' },
      { href: '/fieldwork/experiments', note: 'the lab' },
      { href: '/fieldwork/field-notes', note: 'micro-posts' },
      { href: '/fieldwork/gallery', note: 'visual notes' },
    ],
  },
  {
    name: 'crossroads',
    links: [
      { href: '/crossroads/rabbit-holes', note: 'curated links' },
      { href: '/crossroads/guestbook', note: 'visitor signatures' },
      { href: '/crossroads/credits', note: 'acknowledgements' },
    ],
  },
  {
    name: 'archives',
    links: [
      { href: '/archives/collected', note: 'visual artifacts' },
      { href: '/archives/changelog', note: 'what changed and when' },
      { href: '/archives/sitemap', note: 'you are here' },
    ],
  },
  {
    name: 'other',
    links: [
      { href: '/player', note: 'realm radio, full deck' },
      { href: '/design-system', note: 'how the realm is built' },
    ],
  },
];

export default function SitemapPage() {
  return (
    <PageShell
      eyebrow="archives"
      title="sitemap"
      deckAccent="~ all paths through the realm ~"
      width="reading"
    >
      <Panel surface="alt" titleAs="h2" title="{ every door }">
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.name}>
              <h3 className="font-heading text-fg-heading text-sm uppercase tracking-wider mb-2">
                {section.name}
              </h3>
              <ul className="space-y-1 text-sm pl-4">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <TextLink href={link.href}>{link.href}</TextLink>
                    <span className="text-fg-secondary ml-2">{link.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Panel>
    </PageShell>
  );
}
