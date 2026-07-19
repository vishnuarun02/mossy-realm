import PageShell from "@/components/PageShell";
import Panel from "@/components/ui/Panel";
import UnderConstruction from "@/components/UnderConstruction";

export default function RecipesPage() {
  return (
    <PageShell
      eyebrow="my cabin"
      title="recipes"
      deckAccent="~ things I cook when the mood strikes ~"
      width="reading"
    >
      <Panel surface="alt">
        <UnderConstruction
          message="No filler, no life stories before the ingredients. this area is under construction. check back soon."
        />
      </Panel>
    </PageShell>
  );
}
