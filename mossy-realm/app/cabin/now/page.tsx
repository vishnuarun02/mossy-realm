import RetroBox from "@/components/RetroBox";

export default function NowPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ now }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ what I&apos;m up to these days ~
          </p>
          <p className="text-mossy-text">
            Currently reading, listening to, working on. A snapshot of the present moment.
          </p>
          <p className="text-mossy-text-muted text-sm italic">
            this page will be updated regularly
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <div className="space-y-6">
          <div>
            <h3 className="font-heading text-mossy-header text-sm uppercase tracking-wider mb-2">
              currently reading
            </h3>
            <p className="text-mossy-text-muted text-sm italic">coming soon...</p>
          </div>

          <div>
            <h3 className="font-heading text-mossy-header text-sm uppercase tracking-wider mb-2">
              currently listening
            </h3>
            <p className="text-mossy-text-muted text-sm italic">check realm radio →</p>
          </div>

          <div>
            <h3 className="font-heading text-mossy-header text-sm uppercase tracking-wider mb-2">
              currently working on
            </h3>
            <p className="text-mossy-text-muted text-sm italic">coming soon...</p>
          </div>
        </div>
      </RetroBox>
    </div>
  );
}

