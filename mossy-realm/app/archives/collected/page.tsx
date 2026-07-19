import PageShell from "@/components/PageShell";
import Panel from "@/components/ui/Panel";
import UnderConstruction from "@/components/UnderConstruction";

export default function CollectedPage() {
  return (
    <PageShell
      eyebrow="archives"
      title="collected"
      deckAccent="~ digital artifacts ~"
      width="reading"
    >
      <Panel surface="alt">
        <UnderConstruction
          message="Pixel art, gifs, clippings, and visual treasures. this area is under construction. check back soon."
        />
      </Panel>
    </PageShell>
  );
}
