import RetroBox from "@/components/RetroBox";
import UnderConstruction from "@/components/UnderConstruction";

export default function RecipesPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ recipes }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ things I cook when the mood strikes ~
          </p>
          <p className="text-mossy-text">
            No filler, no life stories before the ingredients.
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <UnderConstruction />
      </RetroBox>
    </div>
  );
}
