import PageShell from "@/components/PageShell";
import Panel from "@/components/ui/Panel";
import UnderConstruction from "@/components/UnderConstruction";

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="my cabin"
      title="contact"
      deckAccent="~ ways to reach me ~"
      width="reading"
    >
      <Panel surface="alt">
        <UnderConstruction
          message="I'm always happy to hear from fellow travelers. the contact desk is still being built. check back soon."
        />
      </Panel>
    </PageShell>
  );
}
