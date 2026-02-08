import RetroBox from "@/components/RetroBox";

export default function RabbitHolesPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ rabbit holes }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ curated links worth following ~
          </p>
          <p className="text-mossy-text">
            Sites, tools, and resources I&apos;ve found interesting.
            The kind of stuff you bookmark and actually go back to.
          </p>
          <p className="text-mossy-text-muted text-sm italic">
            careful, some of these are deep
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <div className="space-y-6">
          <div>
            <h3 className="font-heading text-mossy-header text-sm uppercase tracking-wider mb-3">
              personal sites & web gardens
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="border-b border-dashed border-mossy-border pb-2">
                <a href="https://neocities.org" target="_blank" rel="noopener noreferrer" className="text-mossy-link hover:text-mossy-link-hover">
                  neocities.org
                </a>
                <span className="text-mossy-text-muted ml-2">the old web lives</span>
              </li>
              <li className="border-b border-dashed border-mossy-border pb-2">
                <a href="https://webamp.org" target="_blank" rel="noopener noreferrer" className="text-mossy-link hover:text-mossy-link-hover">
                  webamp.org
                </a>
                <span className="text-mossy-text-muted ml-2">winamp in your browser</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-mossy-header text-sm uppercase tracking-wider mb-3">
              tools & resources
            </h3>
            <p className="text-mossy-text-muted text-sm italic">more links coming...</p>
          </div>
        </div>
      </RetroBox>
    </div>
  );
}

