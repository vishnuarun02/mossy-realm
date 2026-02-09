import RetroBox from "@/components/RetroBox";
import UnderConstruction from "@/components/UnderConstruction";

export default function CollectedPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ collected }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ digital artifacts ~
          </p>
          <p className="text-mossy-text">
            Pixel art, gifs, clippings, and visual treasures.
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <UnderConstruction />
      </RetroBox>
    </div>
  );
}
