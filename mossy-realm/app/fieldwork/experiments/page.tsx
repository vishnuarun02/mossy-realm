import RetroBox from "@/components/RetroBox";
import UnderConstruction from "@/components/UnderConstruction";

export default function ExperimentsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ experiments }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ the lab, the sandbox, the playground ~
          </p>
          <p className="text-mossy-text">
            Half-baked ideas, prototypes, and things that might break.
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <UnderConstruction />
      </RetroBox>
    </div>
  );
}
