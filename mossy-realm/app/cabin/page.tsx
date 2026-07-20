import Image from 'next/image';
import CabinNotebook from '@/components/cabin/CabinNotebook';
import styles from '@/components/cabin/CabinNotebook.module.css';
import CabinSurprise from '@/components/surprises/CabinSurprise';
import MossyIcon from '@/components/mossy-ui/MossyIcon';
import TextLink from '@/components/ui/TextLink';
import { cabinWelcome } from '@/lib/cabin-content';

const rooms = [
  {
    href: '/cabin/about',
    icon: 'profile' as const,
    label: 'about',
    teaser: 'who operates this place. id card, specs, a small timeline.',
  },
  {
    href: '/cabin/now',
    icon: 'status' as const,
    label: 'now',
    teaser: 'what is being built, read, and thought about.',
  },
  {
    href: '/cabin/crafting-table',
    icon: 'workbench' as const,
    label: 'crafting table',
    teaser: 'builds, experiments, and honest abandonments.',
  },
  {
    href: '/cabin/recipes',
    icon: 'recipe' as const,
    label: 'recipes',
    teaser: 'cards from the kitchen database.',
  },
  {
    href: '/cabin/contact',
    icon: 'mail' as const,
    label: 'contact',
    teaser: 'the mailbox. establish a connection.',
  },
];

/** /cabin - a personal room note on the shared moss graph paper. */
export default function CabinLandingPage() {
  return (
    <CabinNotebook title="the cabin" subtitle={cabinWelcome.whisper}>
      <section className={styles.welcomeGrid} aria-label="Welcome to the cabin">
        <div className={styles.welcomeArtifact}>
          <span className={styles.tape} aria-hidden="true" />
          <Image
            src="/images/welcome-to-internet.gif"
            alt="A little animated welcome sign"
            width={160}
            height={107}
            unoptimized
            className={styles.welcomeImage}
          />
        </div>
        <div>
          <p className={styles.bodyCopy}>{cabinWelcome.intro}</p>
          <CabinSurprise status={cabinWelcome.doorStatus} />
        </div>
      </section>

      <div className={styles.divider} aria-hidden="true" />

      <section aria-labelledby="cabin-room-map">
        <h2 id="cabin-room-map" className={styles.sectionLabel}>
          what lives here
        </h2>
        <ul className={styles.roomList}>
          {rooms.map((room) => (
            <li key={room.href} className={styles.roomItem}>
              <MossyIcon
                name={room.icon}
                size={16}
                className={styles.roomIcon}
              />
              <p className={styles.roomText}>
                <TextLink href={room.href}>{room.label}</TextLink>
                <span className={styles.roomTeaser}>{room.teaser}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <p className={styles.marginNote}>
        mind the cables. the unfinished projects bite.
      </p>
    </CabinNotebook>
  );
}
