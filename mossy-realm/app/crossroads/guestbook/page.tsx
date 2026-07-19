import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import TextLink from '@/components/ui/TextLink';
import { guestbook } from '@/lib/crossroads-content';

/**
 * /crossroads/guestbook - the bulletin board.
 *
 * Transmissions pinned by hand. Signing goes through the cabin
 * mailbox: write "guestbook" in the letter and it gets pinned on
 * the next pass. The old moderated way.
 */
export default function GuestbookPage() {
  return (
    <>
      <PageHeader
        eyebrow="crossroads"
        title="guestbook"
        deckAccent="~ leave your mark ~"
      />

      <div className="space-y-5">
        <Panel title="{ the bulletin board }" surface="alt">
          <p className="text-sm text-fg-secondary mb-4">{guestbook.intro}</p>

          <ul className="space-y-4">
            {guestbook.transmissions.map((t, i) => (
              <li key={i} className="relative border-panel border-border-structural bg-surface-panel p-3">
                <span className="bulletin-pin absolute -top-1 left-1/2 -translate-x-1/2" aria-hidden="true" />
                <p className="text-sm text-fg-primary mt-1">&quot;{t.message}&quot;</p>
                <p className="font-nav text-meta uppercase tracking-wider text-fg-secondary mt-2">
                  — {t.name} · {t.date}
                  {t.sample && <span className="text-fg-warning ml-2">sample</span>}
                </p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="{ sign the board }">
          <p className="text-sm text-fg-primary">{guestbook.howToSign}</p>
          <p className="mt-3 text-sm">
            <TextLink href="/cabin/contact" arrow>to the cabin mailbox</TextLink>
          </p>
        </Panel>
      </div>
    </>
  );
}
