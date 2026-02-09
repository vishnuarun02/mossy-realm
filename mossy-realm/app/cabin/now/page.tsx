import RetroBox from "@/components/RetroBox";
import UnderConstruction from "@/components/UnderConstruction";

export default function NowPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ now }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ what I&apos;m up to these days ~
          </p>
          <p className="text-mossy-text">
            Currently reading, listening, building, thinking about.
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <UnderConstruction />
      </RetroBox>
    </div>
  );
}
