import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import TextLink from '@/components/ui/TextLink';
import { binder, experiments, fieldNotes } from '@/lib/fieldwork-content';

/**
 * /fieldwork - the binder cover.
 *
 * What a visitor sees when the lab binder opens: what this place is,
 * the newest specimens, and where the sections live (the folder
 * tabs above do the navigating).
 */
export default function FieldworkLanding() {
  const newest = experiments.slice(0, 3);
  const latestNotes = fieldNotes.slice(0, 3);

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'fieldwork' }]}
        eyebrow="fieldwork"
        title="the lab binder"
        deckAccent={binder.whisper}
      />

      <div className="space-y-5">
        <Panel title="{ on the cover }" surface="alt" className="graph-paper-faint">
          <p className="text-fg-primary">{binder.intro}</p>
          <p className="text-caption text-fg-secondary italic mt-2">{binder.indexNote}</p>
        </Panel>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Newest specimens */}
          <Panel title="{ newest specimens }">
            <ul className="space-y-3">
              {newest.map((exp) => (
                <li key={exp.slug}>
                  <span className="accession-tag">{exp.accession}</span>
                  <p className="mt-1">
                    <TextLink href={`/fieldwork/experiments/${exp.slug}`} className="font-heading text-sm">
                      {exp.title}
                    </TextLink>
                  </p>
                  <p className="text-caption text-fg-secondary">{exp.area} · {exp.status}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              <TextLink href="/fieldwork/experiments" arrow>the full index</TextLink>
            </p>
          </Panel>

          {/* Latest field notes */}
          <Panel title="{ latest field notes }">
            <ul className="space-y-2.5 text-sm">
              {latestNotes.map((note, i) => (
                <li key={`${note.date}-${i}`} className="flex gap-2.5">
                  <span className="font-nav text-meta text-fg-secondary whitespace-nowrap pt-0.5">
                    {note.date}
                  </span>
                  <span className="text-fg-primary">{note.note}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              <TextLink href="/fieldwork/field-notes" arrow>all notes</TextLink>
            </p>
          </Panel>
        </div>

        {/* Sections */}
        <Panel title="{ inside the binder }">
          <ul className="space-y-2 text-sm">
            <li>
              <TextLink href="/fieldwork/learnings" arrow>learnings</TextLink>
              <span className="text-fg-secondary"> — long-form. what the work taught.</span>
            </li>
            <li>
              <TextLink href="/fieldwork/experiments" arrow>experiments</TextLink>
              <span className="text-fg-secondary"> — test logs with honest measurements.</span>
            </li>
            <li>
              <TextLink href="/fieldwork/field-notes" arrow>field notes</TextLink>
              <span className="text-fg-secondary"> — dated one-liners from the bench.</span>
            </li>
            <li>
              <TextLink href="/fieldwork/gallery" arrow>gallery</TextLink>
              <span className="text-fg-secondary"> — the contact sheet. things mid-test.</span>
            </li>
          </ul>
        </Panel>
      </div>
    </>
  );
}
