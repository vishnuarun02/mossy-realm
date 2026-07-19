import Image from 'next/image';
import EmptyState from './ui/EmptyState';
import Divider from './ui/Divider';

/**
 * UnderConstruction - the realm's favorite room: the one being built.
 *
 * The beloved gif chaos (barricades, workers, caution tape) arranged
 * around the standard EmptyState. The art carries the whimsy; the
 * words stay factual. All construction art is decorative and hidden
 * from assistive tech - the EmptyState text says everything.
 *
 * Used on every unfinished page, so the chaos feels curated
 * rather than copy-pasted: same anatomy, same spacing, per-page
 * message via props.
 */

interface UnderConstructionProps {
  /** One plain sentence about what will live here. */
  message?: string;
}

export default function UnderConstruction({
  message = 'this area is under construction. check back soon.',
}: UnderConstructionProps) {
  return (
    <div className="relative" aria-hidden={false}>
      {/* Decorative chaos - hidden from assistive tech */}
      <div aria-hidden="true">
        {/* Top left - tilted barricade (shrinks on small screens so it never covers the words) */}
        <div className="absolute -top-2 -left-4 -rotate-12 z-10 origin-top-left scale-75 md:scale-100">
          <Image
            src="/images/construction/construction.gif"
            alt=""
            width={120}
            height={90}
            unoptimized
          />
        </div>

        {/* Top right - button strip */}
        <div className="absolute -top-1 right-0 rotate-3 origin-top-right scale-75 md:scale-100">
          <Image
            src="/images/construction/underconstruction-button.gif"
            alt=""
            width={140}
            height={20}
            unoptimized
          />
        </div>

        {/* Another barricade bottom left for chaos */}
        <div className="absolute bottom-4 left-8 rotate-6 origin-bottom-left scale-75 md:scale-100">
          <Image
            src="/images/construction/underconstruction-button.gif"
            alt=""
            width={100}
            height={15}
            unoptimized
          />
        </div>
      </div>

      <div className="py-8">
        <EmptyState
          title="~ watch your step! ~"
          message={message}
        />
      </div>

      <Divider tone="subtle" className="my-2" />

      {/* Bottom - workers planning (offset right) */}
      <div aria-hidden="true" className="flex justify-end mt-2 mr-[-20px]">
        <div className="rotate-2">
          <Image
            src="/images/construction/planning-construction.gif"
            alt=""
            width={150}
            height={180}
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
