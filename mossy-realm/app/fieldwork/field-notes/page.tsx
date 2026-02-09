import RetroBox from "@/components/RetroBox";
import UnderConstruction from "@/components/UnderConstruction";

export default function FieldNotesPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ field notes }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ quick thoughts from the trail ~
          </p>
          <p className="text-mossy-text">
            Shorter observations, micro-posts, passing thoughts.
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <UnderConstruction />
      </RetroBox>
    </div>
  );
}
