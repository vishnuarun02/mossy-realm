import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import RabbitHoleSwitchboard from '@/components/surprises/RabbitHoleSwitchboard';
import { rabbitHoles } from '@/lib/crossroads-content';

/** /crossroads/rabbit-holes - two optional roads out, opened only by choice. */
export default function RabbitHolesPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { href: '/crossroads', label: 'crossroads' },
          { label: 'rabbit holes' },
        ]}
        eyebrow="crossroads"
        title="rabbit holes"
        deckAccent="~ links worth falling into ~"
      />

      <Panel title="{ surprise switchboard }" surface="alt">
        <p className="mb-4 text-md text-fg-secondary">
          {rabbitHoles.intro}
        </p>
        <RabbitHoleSwitchboard />
      </Panel>
    </>
  );
}
