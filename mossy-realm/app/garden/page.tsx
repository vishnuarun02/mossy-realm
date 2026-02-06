import RetroBox from "@/components/RetroBox";
import Link from "next/link";

export default function GardenPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ swamp treasures }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ wisdom dug up through time and effort ~
          </p>
          <p className="text-mossy-text">
            Welcome to the swamp! This is where I keep the treasures I&apos;ve collected:
            learnings from trial and error, resources I&apos;ve found useful, and interesting 
            discoveries along the way.
          </p>
          <p className="text-mossy-text-muted text-sm italic">
            Treasures aren&apos;t just shiny objects. They&apos;re things you had to dig for.
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/garden/learnings" className="no-underline group">
            <div className="bg-mossy-bg-box border-2 border-mossy-border p-4 text-center hover:border-mossy-border-glow">
              <h3 className="font-heading text-mossy-header mb-2 group-hover:text-mossy-link-hover">
                Learnings
              </h3>
              <p className="text-mossy-text-muted text-sm">
                Lessons from building this site
              </p>
            </div>
          </Link>

          <div className="bg-mossy-bg-box border-2 border-mossy-border p-4 text-center opacity-50">
            <h3 className="font-heading text-mossy-header mb-2">
              Resources
            </h3>
            <p className="text-mossy-text-muted text-sm">
              coming soon~
            </p>
          </div>

          <div className="bg-mossy-bg-box border-2 border-mossy-border p-4 text-center opacity-50">
            <h3 className="font-heading text-mossy-header mb-2">
              Finds
            </h3>
            <p className="text-mossy-text-muted text-sm">
              coming soon~
            </p>
          </div>
        </div>
      </RetroBox>
    </div>
  );
}

