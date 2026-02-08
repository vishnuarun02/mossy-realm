import RetroBox from "@/components/RetroBox";

export default function FieldNotesPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ field notes }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ shorter observations, quick thoughts ~
          </p>
          <p className="text-mossy-text">
            Not everything needs a full writeup. These are quick observations,
            micro-posts, and passing thoughts worth noting down.
          </p>
          <p className="text-mossy-text-muted text-sm italic">
            the scratchpad of the fieldwork
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <div className="space-y-4 text-center">
          <p className="text-mossy-text-muted">
            notes accumulating...
          </p>
        </div>
      </RetroBox>
    </div>
  );
}

