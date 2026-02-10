import RetroBox from "@/components/RetroBox";
import UnderConstruction from "@/components/UnderConstruction";

export default function RabbitHolesPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ rabbit holes }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ links worth falling into ~
          </p>
          <p className="text-mossy-text">
            Curated corners of the internet I keep coming back to.
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <UnderConstruction />
      </RetroBox>
    </div>
  );
}
