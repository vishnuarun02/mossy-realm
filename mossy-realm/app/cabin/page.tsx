import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import TextLink from '@/components/ui/TextLink';
import { cabinWelcome } from '@/lib/cabin-content';
import {
  IdCardIcon,
  MonitorIcon,
  ToolboxIcon,
  RecipeBoxIcon,
  MailboxIcon,
} from '@/components/cabin/CabinIcons';

/**
 * /cabin - the room's landing hub.
 *
 * The door you step through. A welcome, a quick orientation, and a
 * map of what lives where. The CabinDirectory on the left does the
 * actual navigating; this page sets the mood.
 */

const rooms = [
  {
    href: '/cabin/about',
    label: 'about',
    icon: IdCardIcon,
    teaser: 'who operates this place. id card, specs, and a small timeline.',
  },
  {
    href: '/cabin/now',
    label: 'now',
    icon: MonitorIcon,
    teaser: 'the status monitor. what is being built, read, and thought about.',
  },
  {
    href: '/cabin/crafting-table',
    label: 'crafting table',
    icon: ToolboxIcon,
    teaser: 'the workbench. active builds, experiments, and honest abandonments.',
  },
  {
    href: '/cabin/recipes',
    label: 'recipes',
    icon: RecipeBoxIcon,
    teaser: 'the kitchen database. cards from the recipe box.',
  },
  {
    href: '/cabin/contact',
    label: 'contact',
    icon: MailboxIcon,
    teaser: 'the mailbox. establish a connection with the cabin.',
  },
];

export default function CabinLandingPage() {
  return (
    <>
      <PageHeader
        eyebrow="my cabin"
        title="the cabin"
        deckAccent={cabinWelcome.whisper}
      />

      <div className="space-y-5">
        {/* Welcome panel */}
        <Panel title="{ come in }" surface="alt" className="texture-cabin">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="shrink-0 border-panel border-border-structural bg-surface-panel p-1">
              <Image
                src="/images/welcome-to-internet.gif"
                alt="A little animated welcome sign"
                width={180}
                height={120}
                unoptimized
                className="block"
              />
            </div>
            <div className="space-y-3">
              <p className="text-fg-primary">{cabinWelcome.intro}</p>
              <p className="flex items-center gap-2 text-caption text-fg-secondary">
                <span className="led led-green" aria-hidden="true" />
                {cabinWelcome.doorStatus}
              </p>
            </div>
          </div>
        </Panel>

        {/* Room map */}
        <Panel title="{ what lives here }">
          <ul className="space-y-2.5">
            {rooms.map((room) => {
              const Icon = room.icon;
              return (
                <li key={room.href} className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-border-structural" aria-hidden="true">
                    <Icon />
                  </span>
                  <p className="text-sm">
                    <TextLink href={room.href} className="font-nav text-base">
                      {room.label}
                    </TextLink>
                    <span className="text-fg-secondary"> — {room.teaser}</span>
                  </p>
                </li>
              );
            })}
          </ul>
        </Panel>

        {/* Small print */}
        <p className="text-center text-caption text-fg-secondary italic">
          mind the cables. the unfinished projects bite.
        </p>
      </div>
    </>
  );
}
