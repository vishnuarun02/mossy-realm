import PageShell from "@/components/PageShell";
import Panel from "@/components/ui/Panel";
import UnderConstruction from "@/components/UnderConstruction";

export default function ChangelogPage() {
  return (
    <PageShell
      eyebrow="archives"
      title="changelog"
      deckAccent="~ what changed and when ~"
      width="reading"
    >
      <Panel surface="alt">
        <UnderConstruction
          message="this area is under construction. check back soon."
        />
      </Panel>
    </PageShell>
  );
}
