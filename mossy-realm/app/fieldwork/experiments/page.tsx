import PageShell from "@/components/PageShell";
import Panel from "@/components/ui/Panel";
import UnderConstruction from "@/components/UnderConstruction";

export default function ExperimentsPage() {
  return (
    <PageShell
      eyebrow="fieldwork"
      title="experiments"
      deckAccent="~ the lab, the sandbox, the playground ~"
      width="reading"
    >
      <Panel surface="alt">
        <UnderConstruction
          message="Half-baked ideas, prototypes, and things that might break. this area is under construction. check back soon."
        />
      </Panel>
    </PageShell>
  );
}
