import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import EmptyState from '@/components/ui/EmptyState';
import { gallery } from '@/lib/fieldwork-content';

/**
 * /fieldwork/gallery - the contact sheet.
 *
 * Photographs of things mid-test, printed as a contact sheet.
 * Unexposed frames stay honest until real photographs exist.
 */
export default function GalleryPage() {
  const exposed = gallery.frames.filter((f) => f.src);
  const unexposed = gallery.frames.filter((f) => !f.src);

  return (
    <>
      <PageHeader
        eyebrow="fieldwork"
        title="gallery"
        deckAccent="~ the contact sheet ~"
      />

      <Panel
        title="{ contact sheet }"
        surface="alt"
        titleRight={<span>{exposed.length}/{gallery.frames.length} exposed</span>}
      >
        <p className="text-sm text-fg-secondary mb-4">{gallery.intro}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {exposed.map((frame) => (
            <figure key={frame.id} className="border-panel border-border-structural bg-surface-panel p-1.5">
              {/* exposed frames render here once src exists */}
              <figcaption className="text-micro text-fg-secondary mt-1 text-center">
                {frame.title}
              </figcaption>
            </figure>
          ))}

          {unexposed.map((frame) => (
            <div
              key={frame.id}
              className="
                border-2 border-dashed border-border-subtle
                aspect-[4/3]
                flex items-center justify-center text-center p-2
              "
            >
              <p className="text-micro text-fg-secondary italic">
                {frame.title}
                {frame.sample && <span className="block not-italic text-fg-warning">sample</span>}
              </p>
            </div>
          ))}
        </div>

        {exposed.length === 0 && (
          <EmptyState
            title="~ film still in the camera ~"
            message="no photographs developed yet. frames appear here as tests get documented."
          />
        )}
      </Panel>
    </>
  );
}
