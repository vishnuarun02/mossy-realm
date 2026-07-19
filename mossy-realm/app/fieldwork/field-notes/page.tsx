import PageShell from "@/components/PageShell";
import Panel from "@/components/ui/Panel";
import UnderConstruction from "@/components/UnderConstruction";

export default function FieldNotesPage() {
  return (
    <PageShell
      eyebrow="fieldwork"
      title="field notes"
      deckAccent="~ quick thoughts from the trail ~"
      width="reading"
    >
      <Panel surface="alt">
        <UnderConstruction
          message="Shorter observations, micro-posts, passing thoughts. this area is under construction. check back soon."
        />
      </Panel>
    </PageShell>
  );
}
