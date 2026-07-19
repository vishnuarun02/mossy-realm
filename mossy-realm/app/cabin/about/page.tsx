import PageShell from "@/components/PageShell";
import Panel from "@/components/ui/Panel";
import UnderConstruction from "@/components/UnderConstruction";

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="my cabin"
      title="about"
      deckAccent="~ the person behind the moss ~"
      width="reading"
    >
      <Panel surface="alt">
        <UnderConstruction
          message="Soon: background info, how I think, and what drives me. building in public, one moss patch at a time."
        />
      </Panel>
    </PageShell>
  );
}
