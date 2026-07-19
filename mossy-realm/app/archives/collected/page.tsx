import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import TextLink from '@/components/ui/TextLink';
import { artifacts } from '@/lib/archives-content';

/**
 * /archives/collected - the artifact catalog.
 *
 * Every artifact a catalog card: accession number, the object (when
 * it exists as a file), its current duty in the realm. Cards open
 * the full artifact view.
 */
export default function CollectedPage() {
  return (
    <>
      <PageHeader
        eyebrow="archives"
        title="collected"
        deckAccent="~ digital artifacts ~"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        {artifacts.map((artifact) => (
          <Panel key={artifact.slug} padding="sm">
            <div className="flex gap-3">
              {artifact.src ? (
                <TextLink
                  href={`/archives/collected/${artifact.slug}`}
                  underline={false}
                  className="shrink-0 border-hairline border-border-subtle bg-surface-panel p-1"
                >
                  <Image
                    src={artifact.src}
                    alt={artifact.title}
                    width={64}
                    height={64}
                    unoptimized
                    className="block object-contain max-w-16 max-h-16"
                  />
                </TextLink>
              ) : (
                <div className="shrink-0 w-16 h-16 border-2 border-dashed border-border-subtle flex items-center justify-center">
                  <span className="text-micro text-fg-secondary italic text-center px-1">unfiled</span>
                </div>
              )}
              <div className="min-w-0">
                <span className="accession-tag">{artifact.accession}</span>
                <p className="mt-1">
                  <TextLink href={`/archives/collected/${artifact.slug}`} className="font-heading text-sm">
                    {artifact.title}
                  </TextLink>
                </p>
                <p className="artifact-duty mt-0.5">{artifact.duty}</p>
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <p className="text-center text-caption text-fg-secondary italic mt-5">
        accession numbers are forever. duties may change.
      </p>
    </>
  );
}
