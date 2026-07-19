import RetroBox from './RetroBox';
import Image from 'next/image';
import MediaFrame from './ui/MediaFrame';
import Divider from './ui/Divider';

export default function MainPanel() {
  return (
    <main className="flex flex-col gap-4">
      {/* Main Welcome Box */}
      <RetroBox title="{ what's going on here? }" variant="alt">
        {/* Hero Art with "hello" tag tucked into corner */}
        <MediaFrame
          className="w-full h-40 md:h-52 mb-4"
          cornerTag={
            <Image
              src="/images/hellotags.gif"
              alt=""
              width={100}
              height={20}
              unoptimized
              className="drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]"
            />
          }
        >
          <Image
            src="/forest-fox.png"
            alt="A fox crossing a snowy log bridge in a dark winter forest"
            fill
            className="object-cover"
            priority
          />
        </MediaFrame>

        {/* Welcome Text */}
        <div className="text-fg-primary space-y-3 font-body">
          <p>
            Oh, little traveler! Welcome to <span className="text-fg-heading font-bold">MossyRealm</span>,
            a magical kingdom on the internet where I share my thoughts, art, projects,
            and whatever else I feel like putting here!
          </p>
          <p className="text-fg-heading text-lg text-center py-2 font-accent">
            ~ a cozy place for wandering souls ~
          </p>
          <p>
            This realm exists at a crossroads between dimensions, with visitors from all
            sorts of worlds coming and going, some lost, some simply wandering. Whether
            you&apos;re one of the lost ones or not, I hope you enjoy exploring this strange
            space! You may even come across a secret page or two :)
          </p>
          <p className="text-accent">
            <strong>Realm warnings:</strong> some pages may contain bright colors and
            cozy vibes that could cause overstimulation.
          </p>
        </div>

        <Divider />

        {/* Status Section */}
        <div className="text-center py-3">
          <p className="text-fg-heading-alt text-lg mb-2 font-heading">
            current status:
          </p>
          <p className="text-fg-heading font-body">
            status: deep work
          </p>
          <p className="text-fg-primary font-body">
            quiet notes, careful edits, steady progress
          </p>
        </div>

        <Divider />
      </RetroBox>

      {/* Center bottom intentionally empty - exposes wallpaper */}
    </main>
  );
}
