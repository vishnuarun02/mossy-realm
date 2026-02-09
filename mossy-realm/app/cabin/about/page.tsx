import RetroBox from "@/components/RetroBox";

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ about }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ the person behind the moss ~
          </p>
          <p className="text-mossy-text">
            This page is under construction. Soon it will contain background info,
            how I think, and what drives me.
          </p>
          <p className="text-mossy-text-muted text-sm italic">
            building in public, one moss patch at a time
          </p>
        </div>
      </RetroBox>
    </div>
  );
}

