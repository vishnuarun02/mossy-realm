'use client';

import { usePathname } from 'next/navigation';
import { AudioEngine } from '@/lib/player/AudioEngine';
import { RealmRadioDock } from './RealmRadioDock';
import { RealmRadioMobileBar } from './RealmRadioMobileBar';
import { RealmRadioMobileSheet } from './RealmRadioMobileSheet';

/**
 * RealmRadioProvider - Global player wrapper
 * 
 * This component should be mounted in the root layout.
 * It handles:
 * - Audio engine (persistent across routes)
 * - Floating dock on non-homepage desktop
 * - Mobile bar on all routes
 * - Mobile sheet expansion
 */
export function RealmRadioProvider() {
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  const isPlayerPage = pathname === '/player';

  return (
    <>
      {/* Audio engine - always mounted */}
      <AudioEngine />

      {/* Desktop: Show floating dock on non-homepage (excluding /player which has its own UI) */}
      {!isHomepage && !isPlayerPage && <RealmRadioDock />}

      {/* Mobile: Always show bar + sheet (excluding /player) */}
      {!isPlayerPage && (
        <>
          <RealmRadioMobileBar />
          <RealmRadioMobileSheet />
        </>
      )}
    </>
  );
}

