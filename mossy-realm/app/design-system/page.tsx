import type { Metadata } from 'next';
import Image from 'next/image';
import SiteShell from '@/components/SiteShell';
import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import InsetPanel from '@/components/ui/InsetPanel';
import Button from '@/components/ui/Button';
import IconButton from '@/components/ui/IconButton';
import TextLink from '@/components/ui/TextLink';
import Badge from '@/components/ui/Badge';
import MetaRow from '@/components/ui/Metadata';
import Callout from '@/components/ui/Callout';
import Divider from '@/components/ui/Divider';
import MediaFrame from '@/components/ui/MediaFrame';
import EmptyState from '@/components/ui/EmptyState';
import FormField, { Input, Textarea } from '@/components/ui/FormField';
import PlayerShowcase from './PlayerShowcase';

export const metadata: Metadata = {
  title: 'Design System - MossyRealm',
  description: 'Tokens, primitives, and patterns that build the realm.',
};

/**
 * /design-system - the living field guide to the realm's visual language.
 *
 * Not linked in public nav (it is in the sitemap under "other").
 * Every primitive shows HOW it looks and WHEN to use it.
 * If a change to globals.css or components/ui breaks this page,
 * the change is wrong, not the page.
 */

function Swatch({ token, label }: { token: string; label: string }) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <span
        className="w-8 h-8 shrink-0 border-hairline border-border-subtle rounded-sm"
        style={{ background: `var(${token})` }}
        aria-hidden="true"
      />
      <span className="text-micro text-fg-secondary truncate">
        {token}
        <span className="block text-fg-primary">{label}</span>
      </span>
    </div>
  );
}

function Section({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <Panel title={`{ ${title} }`} surface="alt">
      <p className="text-caption text-fg-secondary italic mb-4 max-w-prose">
        {note}
      </p>
      {children}
    </Panel>
  );
}

export default function DesignSystemPage() {
  return (
    <SiteShell>
      <PageHeader
        breadcrumbs={[{ href: '/archives/sitemap', label: 'archives' }, { label: 'design system' }]}
        eyebrow="field guide"
        title="design system"
        deck="The tokens, primitives, and patterns that build the realm. One world, one language."
      />

      <div className="space-y-5">
        {/* ── Color tokens ── */}
        <Section
          title="color & surfaces"
          note="Amber structures, cream informs, green invites, orange warns. Components use semantic roles, never raw hexes. The palette lives in globals.css; these swatches read the live tokens."
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Swatch token="--surface-page" label="page behind wallpaper" />
            <Swatch token="--surface-panel" label="default panel body" />
            <Swatch token="--surface-panel-alt" label="elevated panel" />
            <Swatch token="--surface-inset" label="recessed wells" />
            <Swatch token="--surface-strip" label="amber title strips" />
            <Swatch token="--surface-interactive" label="hover fills" />
            <Swatch token="--text-primary" label="body cream" />
            <Swatch token="--text-secondary" label="muted cream" />
            <Swatch token="--text-heading" label="headings" />
            <Swatch token="--interactive-link" label="links" />
            <Swatch token="--accent-warm" label="warnings, sparse" />
            <Swatch token="--border-structural" label="frames, borders" />
            <Swatch token="--border-strong" label="hover amber" />
            <Swatch token="--border-subtle" label="hairlines" />
            <Swatch token="--status-success" label="playing, success" />
            <Swatch token="--status-warning" label="paused, warning" />
            <Swatch token="--border-focus" label="focus rings" />
            <Swatch token="--text-inverse" label="text on amber" />
          </div>
        </Section>

        {/* ── Typography ── */}
        <Section
          title="typography"
          note="Five fonts, five jobs. Cinzel Decorative is only the site title. Cinzel heads panels and pages. Cormorant navigates and labels. Lora reads. Mystery Quest whispers."
        >
          <div className="space-y-3">
            <p className="font-display text-xl text-fg-heading">Cinzel Decorative - site title only</p>
            <p className="font-heading text-lg text-fg-heading">Cinzel - headings, panel strips, page titles</p>
            <p className="font-nav text-md text-fg-secondary uppercase tracking-wider">Cormorant - nav, labels, metadata</p>
            <p className="font-body text-fg-primary">Lora - body prose. The quiet workhorse at 17px, 1.7 line height, comfortable in long reads and short captions alike.</p>
            <p className="font-accent text-fg-heading">Mystery Quest - whisper lines, track titles, sign-offs</p>
            <Divider tone="subtle" />
            <MetaRow>
              <span>scale</span>
              <Badge variant="pill">micro .7</Badge>
              <Badge variant="pill">meta .75</Badge>
              <Badge variant="pill">caption .85</Badge>
              <Badge variant="pill">base 1.0</Badge>
              <Badge variant="pill">md 1.1</Badge>
              <Badge variant="pill">lg 1.25</Badge>
            </MetaRow>
          </div>
        </Section>

        {/* ── Panels ── */}
        <Section
          title="panels"
          note="The specimen box is the core unit. Amber strip labels what is inside. Default moss for side rails, alt moss for primary content. InsetPanel is the recessed well you look INTO, not AT."
        >
          <div className="grid md:grid-cols-2 gap-3">
            <Panel title="[ default panel ]">
              <p className="text-sm">Deep moss body. Side rails, widgets, secondary content.</p>
            </Panel>
            <Panel title="[ alt panel ]" surface="alt">
              <p className="text-sm">Lighter moss. Primary page content steps forward.</p>
            </Panel>
            <Panel title="[ with right slot ]" titleRight={<Badge variant="pill">meta</Badge>}>
              <p className="text-sm">The strip carries a small metadata or action on the right.</p>
            </Panel>
            <InsetPanel padding="md">
              <p className="text-sm text-fg-secondary">InsetPanel: cassette windows, code, inputs. One level of recess is the whole trick.</p>
            </InsetPanel>
          </div>
        </Section>

        {/* ── Buttons & links ── */}
        <Section
          title="buttons & links"
          note="Amber fill is the main action, one per panel. Ghost is the secondary. Links navigate and glow green; buttons act. IconButtons always carry an aria-label."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button size="md">primary action</Button>
            <Button variant="ghost" size="md">ghost action</Button>
            <Button size="sm">small primary</Button>
            <Button variant="ghost" size="sm">small ghost</Button>
            <Button disabled size="md">disabled</Button>
          </div>
          <Divider tone="subtle" />
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <TextLink href="/design-system">plain link</TextLink>
            <TextLink href="/design-system" arrow>read more</TextLink>
            <TextLink href="/design-system" back>back to realm</TextLink>
            <TextLink href="https://neocities.org">external link</TextLink>
          </div>
          <Divider tone="subtle" />
          <div className="flex items-center gap-3">
            <IconButton variant="primary" aria-label="Demo primary icon">▶</IconButton>
            <IconButton variant="ghost" aria-label="Demo ghost icon">◀</IconButton>
            <IconButton variant="ghost" density="regular" aria-label="Demo regular icon">■</IconButton>
          </div>
        </Section>

        {/* ── Badges & metadata ── */}
        <Section
          title="badges & metadata"
          note="Chips are the 90s web-badge look. Pills label expeditions and topics. Metadata rows orient the reader quietly, in uppercase Cormorant."
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge>[neocities]</Badge>
            <Badge>[next.js]</Badge>
            <Badge variant="pill">frontend</Badge>
            <Badge variant="pill">visual design</Badge>
          </div>
          <Divider tone="subtle" />
          <MetaRow>
            <Badge variant="pill">infra</Badge>
            <span>feb 4, 2026</span>
            <span className="text-border-structural">expedition #04</span>
          </MetaRow>
        </Section>

        {/* ── Dividers & callouts ── */}
        <Section
          title="dividers & callouts"
          note="Structural dividers split major regions, subtle ones separate dense content, the glyph is for storybook moments. Callouts hold the one sentence to remember; warning is the loudest voice in the realm."
        >
          <Divider tone="structural" />
          <Divider tone="subtle" />
          <Divider tone="structural" glyph />
          <div className="grid md:grid-cols-2 gap-3 mt-2">
            <Callout label="key takeaway">
              Working software beats clever software. Ship the small thing that works.
            </Callout>
            <Callout variant="warning" label="realm warning">
              Bright colors and cozy vibes ahead. Orange is spent sparingly on purpose.
            </Callout>
          </div>
        </Section>

        {/* ── Media ── */}
        <Section
          title="media frames"
          note="Images live in amber frames on deep moss. The corner tag is for a small decorative gif; captions stay quiet and italic."
        >
          <div className="max-w-md">
            <MediaFrame
              className="w-full h-40"
              caption="a fox crossing the old log bridge"
              cornerTag={
                <Image src="/images/hellotags.gif" alt="" width={100} height={20} unoptimized />
              }
            >
              <Image
                src="/forest-fox.png"
                alt="A fox crossing a snowy log bridge in a dark winter forest"
                fill
                className="object-cover"
              />
            </MediaFrame>
          </div>
        </Section>

        {/* ── Forms ── */}
        <Section
          title="form controls"
          note="Every control has a visible label bound with htmlFor. Inputs sit in inset wells. Errors are described with aria-describedby and announced. Radios take the amber accent."
        >
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
            <FormField label="traveler name" htmlFor="ds-name" hint="what should the realm call you?">
              <Input id="ds-name" name="ds-name" placeholder="wandering soul" />
            </FormField>
            <FormField label="with error" htmlFor="ds-err" error="the guestbook ink ran dry. try again.">
              <Input id="ds-err" name="ds-err" defaultValue="bad entry" />
            </FormField>
            <FormField label="message" htmlFor="ds-msg" className="md:col-span-2">
              <Textarea id="ds-msg" name="ds-msg" placeholder="leave your mark..." />
            </FormField>
            <div className="flex items-center gap-4 text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="ds-radio" className="accent-accent w-4 h-4" defaultChecked />
                <span>the moss</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="ds-radio" className="accent-accent w-4 h-4" />
                <span>the ferns</span>
              </label>
            </div>
          </div>
        </Section>

        {/* ── States ── */}
        <Section
          title="states"
          note="Empty, loading, error, and disabled are designed, not accidental. The EmptyState carries art and a whisper; the words stay factual."
        >
          <div className="grid md:grid-cols-2 gap-3">
            <InsetPanel padding="none">
              <EmptyState
                title="~ watch your step! ~"
                message="this area is under construction. check back soon."
              />
            </InsetPanel>
            <div className="space-y-3">
              <MetaRow>
                <span aria-hidden="true" className="cassette-led-amber cassette-led-blink" />
                <span>loading tracks…</span>
              </MetaRow>
              <Callout variant="warning" label="error">
                the guestbook ink ran dry. try again.
              </Callout>
              <Button disabled>disabled action</Button>
            </div>
          </div>
        </Section>

        {/* ── Player ── */}
        <Section
          title="realm radio controls"
          note="One transport language across widget, deck, dock, bar, and sheet. Play is always amber. Status is text plus LED, never LED alone. Demo is interactive but does not touch the real audio engine."
        >
          <PlayerShowcase />
        </Section>

        {/* ── Motion & a11y ── */}
        <Section
          title="motion & access"
          note="Animation is sparse: menu disclosure, player state, loading, small confirmations. Everything freezes under prefers-reduced-motion. Tab anywhere on this page: the green ring always shows where you are."
        >
          <div className="flex flex-wrap gap-3 items-center text-sm">
            <Button variant="ghost" size="sm">tab to me</Button>
            <TextLink href="/design-system">then me</TextLink>
            <MetaRow>
              <span>focus: 2px green ring</span>
              <span aria-hidden="true">·</span>
              <span>motion: 120/250ms ease-realm</span>
            </MetaRow>
          </div>
        </Section>
      </div>
    </SiteShell>
  );
}
