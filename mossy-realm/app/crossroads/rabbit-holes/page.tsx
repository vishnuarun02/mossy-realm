import PageShell from "@/components/PageShell";
import Panel from "@/components/ui/Panel";
import UnderConstruction from "@/components/UnderConstruction";

export default function RabbitHolesPage() {
  return (
    <PageShell
      eyebrow="crossroads"
      title="rabbit holes"
      deckAccent="~ links worth falling into ~"
      width="reading"
    >
      <Panel surface="alt">
        <UnderConstruction
          message="Curated corners of the internet I keep coming back to. this area is under construction. check back soon."
        />
      </Panel>
    </PageShell>
  );
}
