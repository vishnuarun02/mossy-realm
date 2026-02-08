import RetroBox from "@/components/RetroBox";

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
            The highlights reel without the fluff.
          </p>
          <p className="text-mossy-text-muted text-sm italic">
            resume-lite, portfolio-adjacent
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <div className="space-y-4 text-center">
          <p className="text-mossy-text-muted">
            crafting in progress...
          </p>
        </div>
      </RetroBox>
    </div>
  );
}

