import PageShell from "@/components/PageShell";
import Panel from "@/components/ui/Panel";
import UnderConstruction from "@/components/UnderConstruction";

export default function CreditsPage() {
  return (
    <PageShell
      eyebrow="crossroads"
      title="credits"
      deckAccent="~ thank you to ~"
      width="reading"
    >
      <Panel surface="alt">
        <UnderConstruction
          message="People, tools, and inspiration that made this possible. this area is under construction. check back soon."
        />
      </Panel>
    </PageShell>
  );
}
