import RetroBox from "@/components/RetroBox";

export default function ExperimentsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ experiments }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ the lab, the sandbox, the playground ~
          </p>
          <p className="text-mossy-text">
            Half-baked ideas, prototypes, and things that might break.
            Where I tinker before things become real.
          </p>
          <p className="text-mossy-text-muted text-sm italic">
            proceed with curiosity
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <div className="space-y-4 text-center">
          <p className="text-mossy-text-muted">
            experiments loading...
          </p>
        </div>
      </RetroBox>
    </div>
  );
}

