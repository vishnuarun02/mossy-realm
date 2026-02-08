import RetroBox from "@/components/RetroBox";

export default function RecipesPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ recipes }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ things I cook when the mood strikes ~
          </p>
          <p className="text-mossy-text">
            A collection of recipes I actually make. 
            No filler, no life stories before the ingredients.
          </p>
          <p className="text-mossy-text-muted text-sm italic">
            comfort food, experiments, family favorites
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <div className="space-y-4 text-center">
          <p className="text-mossy-text-muted">
            recipes simmering...
          </p>
        </div>
      </RetroBox>
    </div>
  );
}

