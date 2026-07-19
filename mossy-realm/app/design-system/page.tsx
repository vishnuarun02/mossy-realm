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
import {
  MossyIcon,
  CabinetIndex,
  DrawerFace,
  EmptyDrawer,
  PaperSheet,
  NotebookSheet,
  IndexCard,
  RecipeCardSurface,
  Stamp,
  StampDate,
  StatusLabel,
  FolderTab,
  Paperclip,
  TapeStrip,
  Pushpin,
  Staple,
  SectionMark,
} from '@/components/mossy-ui';
import type { MossyIconName } from '@/components/mossy-ui';

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

const utilityIcons: MossyIconName[] = [
  'cabin', 'profile', 'status', 'mail', 'learnings', 'note', 'gallery',
  'guestbook', 'rabbit-hole', 'external', 'folder', 'file', 'floppy',
  'cdrom', 'terminal', 'book', 'music', 'cooking', 'weather', 'trail',
  'telescope', 'archive', 'collected', 'changelog', 'sitemap', 'recipe',
];

const technicalIcons: MossyIconName[] = [
  'workbench', 'experiment', 'hardware', 'gamepad', 'gear', 'rocket',
  'drone', 'target', 'network', 'packet', 'pipeline', 'build', 'test',
  'warning', 'success', 'failure', 'radio', 'signal',
];

function Name({ children }: { children: React.ReactNode }) {
  return (
    <span className="block mt-1 font-nav text-micro text-fg-secondary">
      {children}
    </span>
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

        {/* ══════════ MOSSY-UI ASSET LIBRARY ══════════ */}

        {/* ── Cabinet parts ── */}
        <Section
          title="asset library: cabinet parts"
          note="The notebook + cabinet hybrid family (design-kitchen/ASSET-SYSTEM-PLAN.md). CabinetIndex frames a set of DrawerFaces; every drawer shows number plate, label plate, caption, lamp, and decorative handle."
        >
          <div className="grid md:grid-cols-2 gap-4 items-start">
            <CabinetIndex label="cabinet index" withScrews>
              <DrawerFace href="/design-system" number="01" label="about" caption="the operator" active />
              <DrawerFace href="/design-system" number="02" label="now" caption="live status" lamp="blink" />
              <DrawerFace href="/design-system" number="03" label="craft table" caption="the workbench" lamp="green" />
              <EmptyDrawer note="empty drawer. explains itself." />
            </CabinetIndex>
            <div className="space-y-3">
              <div>
                <CabinetIndex>
                  <DrawerFace number="04" label="recipes" caption="plain frame, no screws" />
                </CabinetIndex>
                <Name>CabinetIndex (no label, no screws) + DrawerFace</Name>
              </div>
              <div className="flex items-center gap-3">
                <StatusLabel prefix="MR" number="001" />
                <StatusLabel prefix="FW" number="017" />
                <Name>StatusLabel (accession numbers)</Name>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Paper surfaces ── */}
        <Section
          title="asset library: paper surfaces"
          note="Physical paper: --surface-paper with dark ink, token-controlled texture. PaperSheet variants cover plain, aged, ruled, graph, log; stack/fold/torn are modifiers."
        >
          <div className="grid md:grid-cols-3 gap-4 items-start">
            <div>
              <PaperSheet stack>
                <p className="text-sm">plain paper, stacked.</p>
                <Name>PaperSheet stack</Name>
              </PaperSheet>
            </div>
            <div>
              <NotebookSheet>
                <p className="text-sm leading-[1.7em]">spiral notebook page, ruled.</p>
                <Name>NotebookSheet (ruled + spiral)</Name>
              </NotebookSheet>
            </div>
            <div>
              <PaperSheet variant="graph">
                <p className="text-sm">engineering graph sheet.</p>
                <Name>PaperSheet variant=&quot;graph&quot;</Name>
              </PaperSheet>
            </div>
            <div>
              <PaperSheet variant="log">
                <p className="text-sm leading-[1.7em]">log sheet with red margin.</p>
                <Name>PaperSheet variant=&quot;log&quot;</Name>
              </PaperSheet>
            </div>
            <div>
              <PaperSheet aged torn>
                <p className="text-sm">aged, torn edges.</p>
                <Name>PaperSheet aged torn</Name>
              </PaperSheet>
            </div>
            <div>
              <IndexCard meta={<span>index card 001-012 · filed: samples</span>}>
                <p className="text-sm leading-[1.7em]">catalog index card with metadata strip.</p>
                <Name>IndexCard meta + ruled</Name>
              </IndexCard>
            </div>
            <div>
              <RecipeCardSurface>
                <p className="text-sm leading-[1.7em]">recipe card, pre-stained.</p>
                <Name>RecipeCardSurface (stained)</Name>
              </RecipeCardSurface>
            </div>
          </div>
        </Section>

        {/* ── Tabs & folders ── */}
        <Section
          title="asset library: tabs & folders"
          note="FolderTab positions interlock like a folder row. Active is manila with ✶. Local cabinet navigation only."
        >
          <div className="flex flex-wrap items-end gap-1 border-b-2 border-border-structural pb-2">
            <FolderTab position="left" active>details</FolderTab>
            <FolderTab position="center" href="/design-system">results</FolderTab>
            <FolderTab position="right" href="/design-system">notes</FolderTab>
          </div>
          <Name>FolderTab left(active) / center / right</Name>
        </Section>

        {/* ── Labels & stamps ── */}
        <Section
          title="asset library: labels & stamps"
          note="Stamp text stays editable (component, not baked). Baked wordmarks ship as SVGs. Tones map to status colors."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Stamp tone="success">tested</Stamp>
            <Stamp tone="amber">sample</Stamp>
            <Stamp tone="warning">failed</Stamp>
            <Stamp tone="neutral" size="sm">wip</Stamp>
            <StampDate date="2026-07-19" />
          </div>
          <Name>Stamp success / amber / warning / sm + StampDate</Name>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/mossy-ui/stamps/do-not-erase.svg" alt="do not erase stamp" width={120} height={26} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/mossy-ui/stamps/property-of-mossyrealm.svg" alt="property of mossyrealm stamp" width={170} height={26} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/mossy-ui/stamps/official-business.svg" alt="official business stamp" width={150} height={26} />
          </div>
          <Name>stamps/do-not-erase, property-of-mossyrealm, official-business.svg</Name>
          <div className="flex items-center gap-4 mt-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/mossy-ui/stamps/check-mark.svg" alt="handwritten check mark" width={24} height={24} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/mossy-ui/stamps/cross-out.svg" alt="cross-out mark" width={24} height={24} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/mossy-ui/stamps/registration.svg" alt="registration marks" width={24} height={24} className="text-fg-secondary" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/mossy-ui/stamps/measure-arrow.svg" alt="measurement arrows" width={60} height={12} className="text-fg-secondary" />
          </div>
          <Name>check-mark / cross-out / registration / measure-arrow.svg</Name>
        </Section>

        {/* ── Utility icons ── */}
        <Section
          title="asset library: utility icons"
          note="One sprite, one MossyIcon component, currentColor everywhere. Late-90s utility style at 16/20/24px."
        >
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {utilityIcons.map((name) => (
              <div key={name} className="text-center">
                <MossyIcon name={name} size={20} className="text-fg-heading mx-auto" />
                <Name>{name}</Name>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4">
            <MossyIcon name="folder" size={16} />
            <MossyIcon name="folder" size={20} />
            <MossyIcon name="folder" size={24} />
            <Name>sizes 16 / 20 / 24</Name>
          </div>
        </Section>

        {/* ── Technical icons ── */}
        <Section
          title="asset library: technical icons"
          note="The workbench set: machines, instruments, and honest outcomes."
        >
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {technicalIcons.map((name) => (
              <div key={name} className="text-center">
                <MossyIcon name={name} size={20} className="text-border-structural mx-auto" />
                <Name>{name}</Name>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Stickers ── */}
        <Section
          title="asset library: stickers"
          note="Flat SVG stickers in stickers/. Frog family, tiny objects, word banners. Upgraded painterly versions are briefed in design-kitchen/IMAGE-ASSET-BRIEFS.md."
        >
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 items-end">
            {['frog-desk', 'frog-wrench', 'frog-notebook', 'frog-terminal', 'frog-folder', 'frog-radio'].map((s) => (
              <div key={s} className="text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/assets/mossy-ui/stickers/${s}.svg`} alt={s} width={72} height={72} className="mx-auto" />
                <Name>{s}</Name>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 items-end mt-4">
            {['tiny-rocket', 'tiny-crt', 'tiny-beige-pc', 'tiny-gamepad', 'tiny-cassette', 'tiny-floppy', 'tiny-gears', 'tiny-satellite', 'tiny-sign', 'tiny-mug', 'tiny-cable'].map((s) => (
              <div key={s} className="text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/assets/mossy-ui/stickers/${s}.svg`} alt={s} width={40} height={40} className="mx-auto" />
                <Name>{s}</Name>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            {['sticker-built-instead', 'sticker-works-on-my-machine', 'sticker-graph-wrong', 'sticker-projects-folders'].map((s) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={s} src={`/assets/mossy-ui/stickers/${s}.svg`} alt={s} height={34} />
            ))}
          </div>
          <Name>word stickers (baked banners)</Name>
        </Section>

        {/* ── Section marks ── */}
        <Section
          title="asset library: section marks"
          note="One frame, four glyphs. The emblem for each wing, in the component and as static SVGs in section-marks/."
        >
          <div className="flex flex-wrap gap-4">
            <div className="text-center">
              <SectionMark section="cabin" />
              <Name>cabin (house + lamp)</Name>
            </div>
            <div className="text-center">
              <SectionMark section="fieldwork" />
              <Name>fieldwork (caliper + ticks)</Name>
            </div>
            <div className="text-center">
              <SectionMark section="crossroads" />
              <Name>crossroads (signpost)</Name>
            </div>
            <div className="text-center">
              <SectionMark section="archives" />
              <Name>archives (drawer)</Name>
            </div>
          </div>
        </Section>

        {/* ── Textures ── */}
        <Section
          title="asset library: textures"
          note="Tiny seamless tiles in textures/, layered via CSS with token-controlled opacity. Never full-screen, never blocking, always static."
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['paper-fiber', 'dust-specks', 'photocopy-noise', 'cabinet-patina', 'ink-imperfect', 'smudge', 'edge-wear', 'print-banding'].map((t) => (
              <div key={t} className="text-center">
                <div
                  className="h-16 border-hairline border-border-subtle bg-surface-panel-alt"
                  style={{
                    backgroundImage: `url(/assets/mossy-ui/textures/${t}.svg)`,
                    backgroundSize: t === 'print-banding' ? '120px 8px' : '120px 120px',
                  }}
                />
                <Name>{t}.svg</Name>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Interactive states ── */}
        <Section
          title="asset library: interactive states"
          note="Files report state by shape and mark, never color alone: hovered file slides 2px, active file stays open with amber plate and ►, focus uses the global green ring. Tab through the row."
        >
          <div className="max-w-md space-y-2">
            <DrawerFace href="/design-system" number="01" label="default file" caption="hover me" />
            <DrawerFace href="/design-system" number="02" label="active file" caption="stays open" active lamp="green" />
            <DrawerFace href="/design-system" number="03" label="with lamp" caption="blinking" lamp="blink" />
          </div>
          <Name>DrawerFace default / active / lamp</Name>
        </Section>

        {/* ── Attachments ── */}
        <Section
          title="asset library: attachments"
          note="Small paper hardware, absolutely positioned inside relative parents. All decorative."
        >
          <div className="flex items-start gap-10">
            <div className="text-center">
              <Paperclip className="text-fg-secondary" />
              <Name>Paperclip</Name>
            </div>
            <div className="relative w-24 h-10 border-hairline border-border-subtle">
              <TapeStrip className="-top-2 left-2" />
              <Name>TapeStrip</Name>
            </div>
            <div className="text-center">
              <Pushpin />
              <Name>Pushpin</Name>
            </div>
            <div className="relative w-16 h-8 border-hairline border-border-subtle">
              <Staple className="-top-1 left-1/2 -translate-x-1/2" />
              <Name>Staple</Name>
            </div>
          </div>
        </Section>
      </div>
    </SiteShell>
  );
}
