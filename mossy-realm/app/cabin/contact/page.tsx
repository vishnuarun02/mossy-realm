import RetroBox from "@/components/RetroBox";

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

        <div className="space-y-4 text-center">
          <p className="text-mossy-text-muted">
            contact details loading...
          </p>
        </div>
      </RetroBox>
    </div>
  );
}

