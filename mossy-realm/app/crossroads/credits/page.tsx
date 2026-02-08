import RetroBox from "@/components/RetroBox";

export default function CreditsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ credits }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ thank you notes ~
          </p>
          <p className="text-mossy-text">
            Nothing is built alone. This page acknowledges the tools,
            libraries, and inspirations that helped make MossyRealm happen.
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <div className="space-y-6">
          <div>
            <h3 className="font-heading text-mossy-header text-sm uppercase tracking-wider mb-3">
              stack
            </h3>
            <ul className="space-y-2 text-sm text-mossy-text-muted">
              <li>Next.js + React</li>
              <li>Tailwind CSS</li>
              <li>Vercel hosting</li>
              <li>Cloudflare DNS + R2</li>
              <li>Howler.js for audio</li>
              <li>Zustand for state</li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-mossy-header text-sm uppercase tracking-wider mb-3">
              fonts
            </h3>
            <ul className="space-y-2 text-sm text-mossy-text-muted">
              <li>Cinzel Decorative (titles)</li>
              <li>Cinzel (headings)</li>
              <li>Cormorant (navigation)</li>
              <li>Lora (body text)</li>
              <li>Mystery Quest (accents)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-mossy-header text-sm uppercase tracking-wider mb-3">
              inspirations
            </h3>
            <ul className="space-y-2 text-sm text-mossy-text-muted">
              <li>neocities community</li>
              <li>old geocities sites</li>
              <li>cozy games aesthetic</li>
              <li>90s web nostalgia</li>
            </ul>
          </div>
        </div>
      </RetroBox>
    </div>
  );
}

