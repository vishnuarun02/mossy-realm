import RetroBox from "@/components/RetroBox";
import UnderConstruction from "@/components/UnderConstruction";

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ contact }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ ways to reach me ~
          </p>
          <p className="text-mossy-text">
            I&apos;m always happy to hear from fellow travelers.
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <UnderConstruction />
      </RetroBox>
    </div>
  );
}
