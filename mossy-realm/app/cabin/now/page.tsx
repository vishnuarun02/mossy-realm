import PageShell from "@/components/PageShell";
import Panel from "@/components/ui/Panel";
import UnderConstruction from "@/components/UnderConstruction";

export default function NowPage() {
  return (
    <PageShell
      eyebrow="my cabin"
      title="now"
      deckAccent="~ what I'm up to these days ~"
      width="reading"
    >
      <Panel surface="alt">
        <UnderConstruction
          message="Currently reading, listening, building, thinking about. this area is under construction. check back soon."
        />
      </Panel>
    </PageShell>
  );
}
