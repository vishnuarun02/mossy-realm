import PageShell from "@/components/PageShell";
import Panel from "@/components/ui/Panel";
import UnderConstruction from "@/components/UnderConstruction";

export default function CraftingTablePage() {
  return (
    <PageShell
      eyebrow="my cabin"
      title="crafting table"
      deckAccent="~ projects, wins, and proof of work ~"
      width="reading"
    >
      <Panel surface="alt">
        <UnderConstruction
          message="A curated collection of things I've built and shipped. this area is under construction. check back soon."
        />
      </Panel>
    </PageShell>
  );
}
