import RetroBox from './RetroBox';
import ScrollBox from './ScrollBox';
import Link from 'next/link';
import Image from 'next/image';

export default function SidebarLeft() {
  return (
    <aside className="flex flex-col gap-4">
      {/* Updates Section - Now with scrolling */}
      <ScrollBox title="[ updates ]" maxHeight="200px">
        <div className="space-y-4 font-body text-sm">
          <div>
            <p className="text-mossy-header text-xs mb-1 font-heading">
              December 31st, 2025
            </p>
            <p className="text-mossy-text">
              The realm has a guardian now. His name is Sir Mucus McSniff. He&apos;s a booger.
            </p>
          </div>
          <div>
            <p className="text-mossy-header text-xs mb-1 font-heading">
              December 30th, 2025
            </p>
            <p className="text-mossy-text">
              Renamed some nav links. &quot;Rabbit Holes&quot; sounds better than &quot;Links&quot;, etc.
            </p>
          </div>
          <div>
            <p className="text-mossy-header text-xs mb-1 font-heading">
              December 29th, 2025
            </p>
            <p className="text-mossy-text">
              Replaced the to-do list with a daily thought.
            </p>
          </div>
          <div>
            <p className="text-mossy-header text-xs mb-1 font-heading">
              December 25th, 2025
            </p>
            <p className="text-mossy-text">
              Added flowing marquee text and scrollable boxes! The site is coming alive~
            </p>
          </div>
          <div>
            <p className="text-mossy-header text-xs mb-1 font-heading">
              December 13th, 2025
            </p>
            <p className="text-mossy-text">
              Welcome to the realm! Just planted the first seeds of this little corner of the web~
            </p>
          </div>
          <div>
            <p className="text-mossy-header text-xs mb-1 font-heading">
              December 12th, 2025
            </p>
            <p className="text-mossy-text">
              Working on the site design. It&apos;s going to be cozy!
            </p>
          </div>
          <div>
            <p className="text-mossy-header text-xs mb-1 font-heading">
              December 11th, 2025
            </p>
            <p className="text-mossy-text">
              Started planning the layout. Thinking about what pages to add first.
            </p>
          </div>
          <div>
            <p className="text-mossy-header text-xs mb-1 font-heading">
              December 10th, 2025
            </p>
            <p className="text-mossy-text">
              Gathering inspiration from old websites. The 90s aesthetic is calling to me.
            </p>
          </div>
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

      {/* Latest Blog Post - moved from MainPanel */}
      <RetroBox title="[ latest blog post ]">
        <Link href="/blog" className="block no-underline group">
          <h3 className="text-mossy-header font-bold mb-1 group-hover:text-mossy-link transition-colors font-heading">
            A Look Back and a Look Forward
          </h3>
          <p className="text-mossy-header-alt text-xs italic mb-2 font-body">
            December 13th, 2025
          </p>
          <p className="text-mossy-text mb-3 font-body text-sm">
            Whew, what a year it&apos;s been! I finally decided to make my own
            little corner of the internet and here we are...
          </p>
          <span className="text-mossy-link underline group-hover:text-mossy-link-hover text-sm">
            read more →
          </span>
        </Link>
      </RetroBox>
    </aside>
  );
}
