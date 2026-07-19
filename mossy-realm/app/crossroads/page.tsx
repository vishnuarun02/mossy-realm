import { Suspense } from 'react';
import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import TextLink from '@/components/ui/TextLink';
import SignalWindow from '@/components/crossroads/SignalWindow';
import { junction } from '@/lib/crossroads-content';

/**
 * /crossroads - the junction.
 *
 * Where the realm opens outward: the signposts, the signal window,
 * and the roads to rabbit holes, the guestbook, and the credits.
 */
export default function CrossroadsLanding() {
  return (
    <>
      <PageHeader
        eyebrow="crossroads"
        title="the junction"
        deckAccent={junction.whisper}
      />

      <div className="space-y-5">
        <Panel title="{ where the roads meet }" surface="alt">
          <p className="text-fg-primary">{junction.intro}</p>
        </Panel>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Signal window: server-fetched, always falls back gracefully */}
          <Panel title="{ the signal window }">
            <Suspense
              fallback={
                <div className="readout-row">
                  <span className="readout-label">reading</span>
                  <span className="readout-value">listening...</span>
                </div>
              }
            >
              <SignalWindow />
            </Suspense>
          </Panel>

          {/* The roads */}
          <Panel title="{ the roads }">
            <ul className="space-y-2 text-sm">
              <li>
                <TextLink href="/crossroads/rabbit-holes" arrow>rabbit holes</TextLink>
                <span className="text-fg-secondary"> — destinations worth falling into.</span>
              </li>
              <li>
                <TextLink href="/crossroads/guestbook" arrow>guestbook</TextLink>
                <span className="text-fg-secondary"> — the bulletin board by the road.</span>
              </li>
              <li>
                <TextLink href="/crossroads/credits" arrow>credits</TextLink>
                <span className="text-fg-secondary"> — the plaque wall.</span>
              </li>
              <li>
                <TextLink href="/cabin/contact" arrow>the cabin mailbox</TextLink>
                <span className="text-fg-secondary"> — letters reach the operator here.</span>
              </li>
            </ul>
          </Panel>
        </div>
      </div>
    </>
  );
}
