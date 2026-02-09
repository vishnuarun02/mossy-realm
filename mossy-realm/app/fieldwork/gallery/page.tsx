import RetroBox from "@/components/RetroBox";
import UnderConstruction from "@/components/UnderConstruction";

export default function GalleryPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ gallery }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ visual field notes ~
          </p>
          <p className="text-mossy-text">
            Photos, screenshots, and things I&apos;ve seen.
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <UnderConstruction />
      </RetroBox>
    </div>
  );
}
