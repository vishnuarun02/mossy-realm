import RetroBox from "@/components/RetroBox";

export default function CollectedPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <RetroBox title="{ collected }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ pixel art, gifs, clippings, visual artifacts ~
          </p>
          <p className="text-mossy-text">
            A condensed archive of visual things I&apos;ve saved or made.
            The digital equivalent of a shoebox full of ephemera.
          </p>
          <p className="text-mossy-text-muted text-sm italic">
            organized chaos, curated junk
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        {/* Placeholder sections */}
        <div className="space-y-8">
          <div>
            <h3 className="font-heading text-mossy-header text-sm uppercase tracking-wider mb-3">
              pixel art
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-mossy-bg-box border border-mossy-border flex items-center justify-center"
                >
                  <span className="text-mossy-text-muted text-xs">px</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-mossy-header text-sm uppercase tracking-wider mb-3">
              gifs
            </h3>
            <p className="text-mossy-text-muted text-sm italic">loading...</p>
          </div>

          <div>
            <h3 className="font-heading text-mossy-header text-sm uppercase tracking-wider mb-3">
              clippings
            </h3>
            <p className="text-mossy-text-muted text-sm italic">loading...</p>
          </div>
        </div>
      </RetroBox>
    </div>
  );
}

