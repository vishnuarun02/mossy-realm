import Image from 'next/image';
import TextLink from '@/components/ui/TextLink';
import InsetPanel from '@/components/ui/InsetPanel';
import { PaperSheet, TapeStrip, Stamp } from '@/components/mossy-ui';
import { operator } from '@/lib/cabin-content';

/**
 * /cabin/about - the operator's notebook page.
 *
 * One aged sheet: id card, the CRT spec screen taped on like a
 * photo, interests and timeline in ink, one sticker and one stamp.
 * The cabinet index says where we are; the page opens with its h1.
 */
export default function AboutPage() {
  return (
    <div className="lg:-ml-4">
      <PaperSheet variant="ruled" texture aged className="relative px-5 py-6 md:px-8 md:py-7">
        {/* Taped frog sticker */}
        <div className="absolute -top-3 right-6 rotate-2">
          <TapeStrip className="-top-1 left-6 z-10" rotate={6} />
          <Image
            src="/assets/mossy-ui/stickers/frog-notebook.svg"
            alt=""
            width={68}
            height={68}
            unoptimized
          />
        </div>

        <h1 className="font-heading text-page-title uppercase tracking-[0.08em]">
          about
        </h1>
        <p className="mui-ink-whisper text-md mt-1">
          ~ the person behind the moss ~
        </p>

        <hr className="mui-ink-rule" />

        {/* Operator id card, ink on paper */}
        <section aria-label="Operator profile" className="relative">
          <div className="absolute top-0 right-0 hidden md:block">
            <Stamp tone="amber" size="sm">property of mossyrealm</Stamp>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div
              className="
                shrink-0 w-full sm:w-28 h-28
                border-2 border-dashed border-[rgba(43,42,30,0.45)]
                flex items-center justify-center text-center px-2
                rotate-[-1deg]
              "
            >
              <p className="mui-ink-label text-micro normal-case tracking-normal">
                operator photo
                <br />
                (not developed yet)
              </p>
            </div>
            <div className="flex-1 space-y-3">
              <p className="leading-[1.7em]">{operator.intro}</p>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                {operator.quickFacts.map((fact) => (
                  <div key={fact.label} className="flex gap-2 text-sm leading-[1.7em]">
                    <dt className="mui-ink-label text-micro pt-0.5">{fact.label}:</dt>
                    <dd className="font-semibold">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <hr className="mui-ink-rule" />

        {/* The CRT spec screen, taped on like a photo */}
        <section aria-label="System information">
          <p className="mui-ink-label text-meta mb-2">system information</p>
          <InsetPanel padding="md" className="crt rotate-[0.4deg]">
            <div className="terminal text-md space-y-0.5">
              <p>&gt; operator.sys --info</p>
              {operator.systemSpecs.map((spec) => (
                <p key={spec.label}>
                  &gt; {spec.label.padEnd(12, ' ')}: {spec.value}
                </p>
              ))}
              <p className="terminal-cursor">&gt; </p>
            </div>
          </InsetPanel>
        </section>

        <hr className="mui-ink-rule" />

        {/* Interests, in ink */}
        <section aria-label="Interests">
          <p className="mui-ink-label text-meta mb-2">interests</p>
          <div className="space-y-2">
            {operator.interests.map((group) => (
              <p key={group.group} className="text-sm leading-[1.7em]">
                <span className="font-semibold">[ {group.group} ]</span>{' '}
                {group.items.join(' · ')}
              </p>
            ))}
          </div>
        </section>

        <hr className="mui-ink-rule" />

        {/* Timeline */}
        <section aria-label="Timeline">
          <p className="mui-ink-label text-meta mb-2">small timeline</p>
          <ul className="space-y-1">
            {operator.timeline.map((entry, i) => (
              <li key={i} className="flex gap-3 text-sm leading-[1.7em]">
                <span className="font-nav font-semibold w-10 shrink-0 text-right">
                  {entry.year}
                </span>
                <span aria-hidden="true" className="text-[rgba(43,42,30,0.5)]">•</span>
                <span>{entry.entry}</span>
              </li>
            ))}
          </ul>
        </section>

        <hr className="mui-ink-rule" />

        {/* Currently + favorites */}
        <section aria-label="Currently into">
          <p className="text-sm leading-[1.7em]">
            <span className="mui-ink-label text-micro">current obsession:</span>{' '}
            <span className="font-semibold">{operator.currentObsession}</span>
          </p>
          <p className="mui-ink-label text-micro mt-3 mb-1.5">favorite things:</p>
          <ul className="space-y-1">
            {operator.favorites.map((fav) => (
              <li key={fav} className="flex gap-2 text-sm leading-[1.7em]">
                <span aria-hidden="true" className="text-[rgba(43,42,30,0.6)]">✶</span>
                <span>{fav}</span>
              </li>
            ))}
          </ul>
        </section>

        <hr className="mui-ink-rule" />

        {/* Elsewhere */}
        <section aria-label="Elsewhere in the realm">
          <p className="mui-ink-label text-meta mb-2">elsewhere</p>
          <ul className="space-y-1.5 text-sm">
            {operator.realmLinks.map((link) => (
              <li key={link.href} className="leading-[1.7em]">
                <TextLink href={link.href} arrow className="font-semibold">{link.label}</TextLink>
                <span> — {link.note}</span>
              </li>
            ))}
          </ul>
        </section>
      </PaperSheet>
    </div>
  );
}
