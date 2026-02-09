import RetroBox from "@/components/RetroBox";
import UnderConstruction from "@/components/UnderConstruction";

export default function CreditsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ credits }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ thank you to ~
          </p>
          <p className="text-mossy-text">
            People, tools, and inspiration that made this possible.
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <UnderConstruction />
      </RetroBox>
    </div>
  );
}
