import RetroBox from './RetroBox';
import ScrollBox from './ScrollBox';
import Link from 'next/link';
import Image from 'next/image';
import { getUpdates } from '@/lib/updates';

export default function SidebarLeft() {
  const updates = getUpdates(10); // Latest 10 updates

  return (
    <aside className="flex flex-col gap-4">
      {/* Updates Section - Now with scrolling */}
      <ScrollBox title="[ updates ]" maxHeight="200px">
        <div className="space-y-4 font-body text-sm">
          {updates.map((update, index) => (
            <div key={`${update.formattedDate}-${index}`}>
              <p className="text-mossy-header text-xs mb-1 font-heading">
                {update.formattedDate}
                <span className="text-mossy-text-muted font-body"> · {update.formattedTime}</span>
              </p>
              <p className="text-mossy-text">{update.message}</p>
            </div>
          ))}
        </div>
      </ScrollBox>

      {/* Question of the Day Section */}
      <RetroBox title="[ question of the day ]">
        <div className="text-center font-body text-sm px-1">
          <p className="text-mossy-text italic leading-relaxed">
            &quot;Would you climb The Mount Everest, if no one else in the world knew that you did?&quot;
          </p>
          <div className="mt-3 text-mossy-accent text-xs">
            ~ food for thought ~
          </div>
        </div>
      </RetroBox>

      {/* Little decoration box */}
      <RetroBox title="< realm guardian >">
        <div className="text-center">
          <Image
            src="/realm-guardian.gif"
            alt="Once a humble booger. Now the realm's fiercest protector."
            width={100}
            height={100}
            className="mx-auto border-2 border-dashed border-mossy-border rounded-sm"
            unoptimized
          />
          <p className="text-mossy-header text-xs mt-2 italic font-body font-bold uppercase">
            Sir Mucus McSniff
          </p>
          <p className="text-mossy-text-muted text-xs italic font-body">
            Once a humble booger. Now the realm&apos;s fiercest protector.
          </p>
        </div>
      </RetroBox>

      {/* Latest Post */}
      <RetroBox title="[ latest post ]">
        <div>
          <h3 className="text-mossy-header font-bold mb-1 font-heading">
            The Great Cursor & Effects Experiment
          </h3>
          <p className="text-mossy-header-alt text-xs italic mb-2 font-body">
            January 16th, 2026
          </p>
          <p className="text-mossy-text mb-3 font-body text-sm">
            Tried adding fancy cursors, sparkle trails, and fireflies.
            Learned why 90s sites kept interactions simple...
          </p>
          <Link href="/garden/learnings" className="text-mossy-link underline hover:text-mossy-link-hover text-sm">
            read more →
          </Link>
        </div>
      </RetroBox>
    </aside>
  );
}
