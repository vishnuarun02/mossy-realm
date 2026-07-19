import PageShell from "@/components/PageShell";
import Panel from "@/components/ui/Panel";
import UnderConstruction from "@/components/UnderConstruction";

export default function GuestbookPage() {
  return (
    <PageShell
      eyebrow="crossroads"
      title="guestbook"
      deckAccent="~ leave your mark ~"
      width="reading"
    >
      <Panel surface="alt">
        <UnderConstruction
          message="Sign in, say hi, let me know you were here. the guestbook desk is still being built. check back soon."
        />
      </Panel>
    </PageShell>
  );
}
