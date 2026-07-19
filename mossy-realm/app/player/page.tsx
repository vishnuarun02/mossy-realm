import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import PageHeader from '@/components/PageHeader';
import TextLink from '@/components/ui/TextLink';
import PlayerDeck from '@/components/player/PlayerDeck';

export const metadata: Metadata = {
  title: 'Realm Radio - MossyRealm',
  description: 'The full cassette deck. Tapes collected from around the realm.',
};

export default function PlayerPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="now broadcasting"
        title="realm radio"
        deckAccent="~ the realm's cassette deck ~"
      />
      <div className="max-w-xl mx-auto">
        <PlayerDeck />
        <p className="text-center mt-4">
          <TextLink href="/" back className="text-xs font-nav">
            back to realm
          </TextLink>
        </p>
      </div>
    </SiteShell>
  );
}
