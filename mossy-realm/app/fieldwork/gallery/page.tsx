import PageShell from "@/components/PageShell";
import Panel from "@/components/ui/Panel";
import UnderConstruction from "@/components/UnderConstruction";

export default function GalleryPage() {
  return (
    <PageShell
      eyebrow="fieldwork"
      title="gallery"
      deckAccent="~ visual field notes ~"
      width="reading"
    >
      <Panel surface="alt">
        <UnderConstruction
          message="Photos, screenshots, and things I've seen. this area is under construction. check back soon."
        />
      </Panel>
    </PageShell>
  );
}
