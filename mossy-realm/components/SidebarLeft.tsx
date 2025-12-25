import RetroBox from './RetroBox';
import Link from 'next/link';

export default function SidebarLeft() {
  return (
    <aside className="flex flex-col gap-4">
      {/* Updates Section */}
      <RetroBox title="[ updates ]">
        <div className="space-y-4 font-body">
          <div>
            <p className="text-mossy-header text-sm mb-1 font-heading">
              December 13th, 2025
            </p>
            <p className="text-mossy-text">
              Welcome to the realm! Just planted the first seeds of this little corner of the web~
            </p>
          </div>
          <div>
            <p className="text-mossy-header text-sm mb-1 font-heading">
              December 12th, 2025
            </p>
            <p className="text-mossy-text">
              Working on the site design. It&apos;s going to be cozy!
            </p>
          </div>
        </div>
      </RetroBox>

      {/* To Do Section */}
      <RetroBox title="[ to do ]">
        <ul className="list-disc list-inside space-y-1 text-mossy-text marker:text-mossy-accent font-body">
          <li>Add more pages</li>
          <li>Draw site mascot</li>
          <li>Make a guestbook</li>
          <li>Create pixel art buttons</li>
          <li>Find cool web badges</li>
          <li>Add background music</li>
        </ul>
      </RetroBox>

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
              text-4xl
            "
          >
            ?
          </div>
          <p className="text-mossy-text-muted text-sm mt-2 italic font-body">
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
          <p className="text-mossy-header-alt text-sm italic mb-2 font-body">
            December 13th, 2025
          </p>
          <p className="text-mossy-text mb-3 font-body">
            Whew, what a year it&apos;s been! I finally decided to make my own
            little corner of the internet and here we are...
          </p>
          <span className="text-mossy-link underline group-hover:text-mossy-link-hover">
            read more →
          </span>
        </Link>
      </RetroBox>
    </aside>
  );
}
