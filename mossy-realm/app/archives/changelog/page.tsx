import RetroBox from "@/components/RetroBox";

export default function ChangelogPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ changelog }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ what changed and when ~
          </p>
          <p className="text-mossy-text">
            A log of updates, fixes, and new additions to MossyRealm.
          </p>
          <p className="text-mossy-text-muted text-sm italic">
            for the curious and the completionists
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <div className="space-y-4 text-center">
          <p className="text-mossy-text-muted">
            changelog loading...
          </p>
        </div>
      </RetroBox>
    </div>
  );
}

