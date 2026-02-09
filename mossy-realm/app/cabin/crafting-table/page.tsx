import RetroBox from "@/components/RetroBox";
import UnderConstruction from "@/components/UnderConstruction";

export default function CraftingTablePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ crafting table }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ projects, wins, and proof of work ~
          </p>
          <p className="text-mossy-text">
            A curated collection of things I&apos;ve built and shipped.
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <UnderConstruction />
      </RetroBox>
    </div>
  );
}
