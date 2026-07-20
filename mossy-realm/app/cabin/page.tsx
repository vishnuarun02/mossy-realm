import Image from 'next/image';
import TextLink from '@/components/ui/TextLink';
import { PaperSheet, TapeStrip } from '@/components/mossy-ui';
import MossyIcon from '@/components/mossy-ui/MossyIcon';
import { cabinWelcome } from '@/lib/cabin-content';

/**
 * /cabin - the room's landing hub, Option A direction.
 *
 * Cabinet index on the left (in the layout); this page is the paper
 * surface attached to it: intro, the room map, and one frog sticker
 * taped to the sheet. The index already says where we are, so the
 * page opens straight with its h1.
 */

const rooms = [
  { href: '/cabin/about', icon: 'profile' as const, label: 'about', teaser: 'who operates this place. id card, specs, a small timeline.' },
  { href: '/cabin/now', icon: 'status' as const, label: 'now', teaser: 'the status monitor. what is being built, read, thought about.' },
  { href: '/cabin/crafting-table', icon: 'workbench' as const, label: 'crafting table', teaser: 'the workbench. builds, experiments, honest abandonments.' },
  { href: '/cabin/recipes', icon: 'recipe' as const, label: 'recipes', teaser: 'the kitchen database. cards from the recipe box.' },
  { href: '/cabin/contact', icon: 'mail' as const, label: 'contact', teaser: 'the mailbox. establish a connection.' },
];

export default function CabinLandingPage() {
  return (
    <div className="lg:-ml-4">
      <PaperSheet variant="ruled" texture className="relative min-h-[70vh] px-5 py-6 md:px-8 md:py-7">
        {/* Taped frog sticker, top-right */}
        <div className="absolute -top-3 right-6 rotate-2">
          <TapeStrip className="-top-1 left-6 z-10" rotate={-8} />
          <Image
            src="/assets/mossy-ui/stickers/frog-desk.svg"
            alt=""
            width={72}
            height={72}
            unoptimized
          />
        </div>

        {/* The h1: one, clear, on the paper */}
        <h1 className="font-heading text-page-title uppercase tracking-[0.08em]">
          the cabin
        </h1>
        <p className="mui-ink-whisper text-md mt-1">
          {cabinWelcome.whisper}
        </p>

        <hr className="mui-ink-rule" />

        {/* Welcome + welcome sign */}
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="shrink-0 border border-[rgba(43,42,30,0.4)] bg-surface-panel p-1 rotate-[-1deg]">
            <Image
              src="/images/welcome-to-internet.gif"
              alt="A little animated welcome sign"
              width={160}
              height={107}
              unoptimized
              className="block"
            />
          </div>
          <div className="space-y-3">
            <p className="leading-[1.7em]">{cabinWelcome.intro}</p>
            <p className="flex items-center gap-2 text-sm">
              <span className="led led-green" aria-hidden="true" />
              <span className="italic text-[rgba(43,42,30,0.75)]">{cabinWelcome.doorStatus}</span>
            </p>
          </div>
        </div>

        <hr className="mui-ink-rule" />

        {/* The room map, as notebook lines */}
        <p className="mui-ink-label text-meta mb-2">what lives here</p>
        <ul className="space-y-1.5">
          {rooms.map((room) => (
            <li key={room.href} className="flex items-start gap-2 leading-[1.7em]">
              <MossyIcon name={room.icon} size={16} className="mt-1.5 shrink-0 text-[rgba(43,42,30,0.7)]" />
              <p className="text-sm">
                <TextLink href={room.href} className="font-nav text-base font-semibold">
                  {room.label}
                </TextLink>
                <span> — {room.teaser}</span>
              </p>
            </li>
          ))}
        </ul>

        <p className="mui-ink-whisper text-center text-sm mt-8">
          mind the cables. the unfinished projects bite.
        </p>
      </PaperSheet>
    </div>
  );
}
