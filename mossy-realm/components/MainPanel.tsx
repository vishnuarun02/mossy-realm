import RetroBox from './RetroBox';
import Link from 'next/link';

export default function MainPanel() {
  return (
    <main className="flex flex-col gap-4">
      {/* Main Welcome Box */}
      <RetroBox title="🌲 what's going on here?" variant="alt">
        {/* Hero Art Placeholder */}
        <div
          className="
            w-full h-40 md:h-52
            bg-mossy-bg-box 
            border-2 border-dashed border-mossy-border
            flex items-center justify-center
            mb-4
            text-mossy-text-muted
          "
        >
          <div className="text-center">
            <div className="text-5xl mb-2">🏡🌲🌲</div>
            <p className="text-sm italic font-body">
              [cozy cabin art coming soon]
            </p>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="text-mossy-text space-y-3 font-body">
          <p>
            Hello, dear traveler! Welcome to <span className="text-mossy-header font-bold">MossyRealm</span>,
            my little home on the internet where I share my thoughts, art, projects,
            and whatever else I feel like putting here!
          </p>
          <p className="text-mossy-header text-lg text-center py-2 font-accent">
            ~ a cozy place for wandering souls ~
          </p>
          <p>
            This realm exists at a crossroads between dimensions, with visitors from all
            sorts of worlds coming and going, some lost, some simply wandering. Whether
            you&apos;re one of the lost ones or not, I hope you enjoy exploring this strange
            space! You may even come across a secret page or two :)
          </p>
          <p className="text-mossy-accent">
            <strong>Realm warnings:</strong> some pages may contain bright colors and
            cozy vibes that could cause excessive relaxation~
          </p>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-mossy-border my-4"></div>

        {/* Status Section */}
        <div className="text-center py-3">
          <p className="text-mossy-header-alt text-lg mb-2 font-heading">
            current status:
          </p>
          <p className="text-mossy-header font-body">
            realm keeper 🌻 <span className="text-mossy-text-muted">just now</span>
          </p>
          <p className="text-mossy-text font-body">
            feeling sunny today! ☀️ working on making this place cozy~
          </p>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-mossy-border my-4"></div>
      </RetroBox>

      {/* Bottom Grid - Blog and Art */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Latest Blog Post */}
        <RetroBox title="📖 latest blog post">
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

        {/* Latest Art */}
        <RetroBox title="🎨 latest art">
          <Link href="/gallery" className="block no-underline group">
            <div
              className="
                w-full h-32
                bg-mossy-bg-box 
                border-2 border-dashed border-mossy-border
                flex items-center justify-center
                mb-2
                group-hover:border-mossy-link
                transition-colors
              "
            >
              <div className="text-center text-mossy-text-muted">
                <div className="text-3xl mb-1">🖼️</div>
                <p className="text-sm italic font-body">
                  [art preview]
                </p>
              </div>
            </div>
            <span className="text-mossy-link underline group-hover:text-mossy-link-hover">
              view gallery →
            </span>
          </Link>
        </RetroBox>
      </div>

      {/* Random Nature Fact - Mobile Only (appears in main on mobile) */}
      <div className="md:hidden">
        <RetroBox title="🌿 quick fact">
          <p className="text-mossy-text text-center font-body">
            🌱 Did you know? The oldest known moss fossil is over
            <span className="text-mossy-accent font-bold"> 470 million years old!</span>
          </p>
        </RetroBox>
      </div>
    </main>
  );
}
