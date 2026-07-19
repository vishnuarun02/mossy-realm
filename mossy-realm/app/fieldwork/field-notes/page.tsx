import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import Badge from '@/components/ui/Badge';
import { fieldNotes } from '@/lib/fieldwork-content';

/**
 * /fieldwork/field-notes - the micro log.
 *
 * Dated one-liners from the bench. No essays here. The newest note
 * pins itself to the top of the strip.
 */
export default function FieldNotesPage() {
  return (
    <>
      <PageHeader
        eyebrow="fieldwork"
        title="field notes"
        deckAccent="~ dated one-liners ~"
      />

      <Panel title="{ the note strip }" surface="alt" className="graph-paper-faint">
        <ul className="divide-y divide-dashed divide-border-subtle">
          {fieldNotes.map((note, i) => (
            <li key={`${note.date}-${i}`} className="py-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-nav text-meta uppercase tracking-wider text-fg-secondary whitespace-nowrap">
                {note.date}
              </span>
              <span className="text-sm text-fg-primary flex-1 min-w-0">{note.note}</span>
              {note.tag && <Badge variant="pill">{note.tag}</Badge>}
            </li>
          ))}
        </ul>
      </Panel>

      <p className="text-center text-caption text-fg-secondary italic mt-5">
        short on purpose. the long versions live in learnings.
      </p>
    </>
  );
}
