import RetroBox from './RetroBox';
import ScrollBox from './ScrollBox';
import Link from 'next/link';

export default function SidebarLeft() {
  return (
    <aside className="flex flex-col gap-4">
      {/* Updates Section - Now with scrolling */}
      <ScrollBox title="[ updates ]" maxHeight="200px">
        <div className="space-y-4 font-body text-sm">
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

      {/* To Do Section - Now with scrolling */}
      <ScrollBox title="[ to do ]" maxHeight="200px">
        <ul className="list-disc list-inside space-y-1 text-mossy-text marker:text-mossy-accent font-body text-sm">
          <li>Add more pages</li>
          <li>Draw site mascot</li>
          <li>Make a guestbook</li>
          <li>Create pixel art buttons</li>
          <li>Find cool web badges</li>
          <li>Add background music</li>
          <li>Write about favorite books</li>
          <li>Create a links page</li>
          <li>Design a 404 page</li>
          <li>Add more nature facts</li>
        </ul>
      </ScrollBox>

      {/* Little decoration box */}
      <RetroBox title="<< realm guardian >>">
        <div className="text-center">
          <div
            className="
              w-24 h-24 
              mx-auto 
              bg-mossy-bg-box-alt 
              border-2 border-dashed border-mossy-border
              flex items-center justify-center
              text-3xl
            "
          >
            ?
          </div>
          <p className="text-mossy-text-muted text-xs mt-2 italic font-body">
            A friendly mushroom watches over the realm
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
