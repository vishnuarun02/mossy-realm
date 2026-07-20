import Image from 'next/image';
import SiteShell from '@/components/SiteShell';
import CabinDrawer from '@/components/cabin/CabinDrawer';
import styles from '@/components/cabin/CabinNotebook.module.css';

/**
 * Cabin layout: one slim index joined to the room's page surface.
 *
 * Desktop keeps a 186px notebook/cabinet spine. Smaller viewports use
 * the same index as an expandable row above the current page.
 */
export default function CabinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteShell>
      <div className={styles.workspace}>
        <Image
          src="/assets/mossy-ui/hardware/screw.svg"
          alt=""
          width={12}
          height={12}
          unoptimized
          aria-hidden="true"
          className={`${styles.frameScrew} ${styles.frameScrewTopLeft}`}
        />
        <Image
          src="/assets/mossy-ui/hardware/screw.svg"
          alt=""
          width={12}
          height={12}
          unoptimized
          aria-hidden="true"
          className={`${styles.frameScrew} ${styles.frameScrewTopRight}`}
        />
        <Image
          src="/assets/mossy-ui/hardware/screw.svg"
          alt=""
          width={12}
          height={12}
          unoptimized
          aria-hidden="true"
          className={`${styles.frameScrew} ${styles.frameScrewBottomLeft}`}
        />
        <Image
          src="/assets/mossy-ui/hardware/screw.svg"
          alt=""
          width={12}
          height={12}
          unoptimized
          aria-hidden="true"
          className={`${styles.frameScrew} ${styles.frameScrewBottomRight}`}
        />
        <CabinDrawer />
        <div className={styles.content}>{children}</div>
      </div>
    </SiteShell>
  );
}
