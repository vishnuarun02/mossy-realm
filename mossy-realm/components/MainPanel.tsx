import RetroBox from './RetroBox';

export default function MainPanel() {
  return (
    <main className="flex flex-col gap-4">
      {/* Main Welcome Box */}
      <RetroBox title="{ what's going on here? }" variant="alt">
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
            <div className="text-xl mb-2 font-body">[ cabin art placeholder ]</div>
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
            realm keeper * <span className="text-mossy-text-muted">just now</span>
          </p>
          <p className="text-mossy-text font-body">
            feeling bright today! ~ working on making this place cozy~
          </p>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-mossy-border my-4"></div>
      </RetroBox>

      {/* Center bottom intentionally empty - exposes wallpaper */}

      {/* Random Nature Fact - Mobile Only (appears in main on mobile) */}
      <div className="md:hidden">
        <RetroBox title="{ quick fact }">
          <p className="text-mossy-text text-center font-body">
            Did you know? The oldest known moss fossil is over
            <span className="text-mossy-accent font-bold"> 470 million years old!</span>
          </p>
        </RetroBox>
      </div>
    </main>
  );
}
