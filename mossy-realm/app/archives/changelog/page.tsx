import RetroBox from "@/components/RetroBox";
import UnderConstruction from "@/components/UnderConstruction";

export default function ChangelogPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ changelog }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ what changed and when ~
          </p>
          <p className="text-mossy-text">
            A log of updates, fixes, and new additions.
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <UnderConstruction />
      </RetroBox>
    </div>
  );
}
