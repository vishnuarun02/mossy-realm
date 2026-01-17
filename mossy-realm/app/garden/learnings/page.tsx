import RetroBox from "@/components/RetroBox";

export default function LearningsPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-[190px_1fr_190px] md:grid-cols-[190px_1fr]">
      
      {/* LEFT SIDEBAR */}
      <aside className="flex flex-col gap-4 order-2 md:order-1">
        
        {/* Why Share This */}
        <RetroBox title="[ why share this? ]">
          <div className="text-sm leading-relaxed">
            <p>
              Building a personal site is a journey of trial and error. 
              I&apos;m documenting my mistakes so other retro web builders 
              don&apos;t have to repeat them.
            </p>
            <p className="mt-3 italic text-mossy-text-muted text-center">
              &quot;The best design is the one you don&apos;t notice.&quot;
            </p>
          </div>
        </RetroBox>

        {/* Quick Jump */}
        <RetroBox title="[ quick jump ]">
          <ul className="text-sm space-y-2">
            <li className="border-b border-dashed border-mossy-border pb-2">
              <a href="#cursors" className="hover:text-mossy-link-hover">cursors & effects</a>
            </li>
            <li className="border-b border-dashed border-mossy-border pb-2">
              <a href="#palette" className="hover:text-mossy-link-hover">color palette</a>
            </li>
            <li className="border-b border-dashed border-mossy-border pb-2">
              <a href="#fonts" className="hover:text-mossy-link-hover">typography</a>
            </li>
            <li>
              <span className="text-mossy-text-muted">more coming...</span>
            </li>
          </ul>
        </RetroBox>
      </aside>

      {/* MAIN CONTENT */}
      <main className="order-1 md:order-2">
        <RetroBox title="{ learnings from the swamp }" variant="alt">
          
          {/* Intro */}
          <div className="text-center mb-6 pb-5 border-b-2 border-mossy-border">
            <p className="font-accent text-mossy-header text-lg">
              ~ wisdom dug up through trial and error ~
            </p>
            <p className="text-sm text-mossy-text-muted italic mt-1">
              things I learned so you don&apos;t have to
            </p>
          </div>

          {/* Timeline */}
          <div className="relative pl-6 border-l-2 border-mossy-border/40">

            {/* Entry 1: Cursors */}
            <article className="relative mb-8" id="cursors">
              {/* Timeline dot */}
              <div className="absolute -left-[29px] top-1 w-3 h-3 bg-mossy-border rounded-full border-2 border-mossy-bg-box"></div>
              
              <p className="font-heading text-mossy-header text-xs uppercase tracking-wider mb-1">
                January 16, 2026
              </p>
              <h3 className="font-heading text-mossy-header text-lg mb-3">
                The Great Cursor & Effects Experiment
              </h3>
              
              <div className="space-y-3 text-mossy-text">
                <p>
                  Tried adding fancy cursors, sparkle trails, fireflies, and click 
                  animations to make the site feel more magical. The result? 
                  It turned into a circus.
                </p>

                {/* Lesson Quote */}
                <blockquote className="italic text-mossy-link border-l-[3px] border-mossy-border bg-mossy-bg-box/50 pl-4 py-3 my-4">
                  &quot;More effects does not equal better vibes. Dense layouts need simple interactions.&quot;
                </blockquote>

                <p>
                  I always thought old websites had simple interactions because of 
                  technical limitations. But actually, when you have a visually dense 
                  layout with lots of boxes, borders, and patterns, simple interactions 
                  make sense. The complexity is in the <em>layout</em>, not the <em>behavior</em>.
                </p>

                <p>
                  Modern sites flip this — minimal layouts but fancy animations. 
                  You can&apos;t have both maxed out without it feeling overwhelming.
                </p>

                {/* Details */}
                <div className="mt-4 pt-4 border-t border-dashed border-mossy-border">
                  <h4 className="font-heading text-mossy-header-alt text-sm mb-2">what I tried:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-mossy-text-muted">
                    <li>Pressed flower cursor that opens on hover</li>
                    <li>Wax seal stamp cursor with click animation</li>
                    <li>Sparkle trail following the cursor</li>
                    <li>Fireflies floating around the page</li>
                    <li>Windows 95 bevel buttons</li>
                  </ul>
                </div>

                <div className="mt-4 pt-4 border-t border-dashed border-mossy-border">
                  <h4 className="font-heading text-mossy-header-alt text-sm mb-2">what I learned:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-mossy-text-muted">
                    <li>Animated cursors (.ani) don&apos;t work in most browsers</li>
                    <li>Custom cursors need to be small — 32px max recommended</li>
                    <li>New effects need to match existing vibe, not fight against it</li>
                    <li>The satisfying click animation I imagined was actually distracting</li>
                  </ul>
                </div>

                <div className="mt-4 pt-4 border-t border-dashed border-mossy-border">
                  <h4 className="font-heading text-mossy-header-alt text-sm mb-2">decision:</h4>
                  <p className="text-sm">
                    Reverted everything. The site doesn&apos;t need fancy effects right now. 
                    Maybe later with a lighter touch.
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-xs px-2 py-0.5 bg-mossy-bg-box-alt border border-mossy-border text-mossy-text-muted font-nav">cursors</span>
                  <span className="text-xs px-2 py-0.5 bg-mossy-bg-box-alt border border-mossy-border text-mossy-text-muted font-nav">effects</span>
                  <span className="text-xs px-2 py-0.5 bg-mossy-bg-box-alt border border-mossy-border text-mossy-text-muted font-nav">90s web</span>
                  <span className="text-xs px-2 py-0.5 bg-mossy-bg-box-alt border border-mossy-border text-mossy-text-muted font-nav">reverted</span>
                </div>
              </div>
            </article>

            {/* Entry 2: Palette */}
            <article className="relative mb-8" id="palette">
              <div className="absolute -left-[29px] top-1 w-3 h-3 bg-mossy-border rounded-full border-2 border-mossy-bg-box"></div>
              
              <p className="font-heading text-mossy-header text-xs uppercase tracking-wider mb-1">
                December 2025
              </p>
              <h3 className="font-heading text-mossy-header text-lg mb-3">
                Finding the Right Color Palette
              </h3>
              
              <div className="space-y-3 text-mossy-text">
                <p>
                  Explored six different color palettes before landing on &quot;Sunlit Glade.&quot; 
                  The journey taught me a lot about what makes colors feel cozy versus clinical.
                </p>

                <blockquote className="italic text-mossy-link border-l-[3px] border-mossy-border bg-mossy-bg-box/50 pl-4 py-3 my-4">
                  &quot;Warm amber plus forest green equals cozy. Cool blue plus green equals clinical.&quot;
                </blockquote>

                <p>
                  Cool-toned palettes looked nice in isolation but felt sterile when 
                  applied to the site. Warm amber accents made all the difference — 
                  they added that &quot;sunlight through trees&quot; feeling I was going for.
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-xs px-2 py-0.5 bg-mossy-bg-box-alt border border-mossy-border text-mossy-text-muted font-nav">colors</span>
                  <span className="text-xs px-2 py-0.5 bg-mossy-bg-box-alt border border-mossy-border text-mossy-text-muted font-nav">palette</span>
                  <span className="text-xs px-2 py-0.5 bg-mossy-bg-box-alt border border-mossy-border text-mossy-text-muted font-nav">aesthetic</span>
                </div>
              </div>
            </article>

            {/* Entry 3: Fonts */}
            <article className="relative mb-8" id="fonts">
              <div className="absolute -left-[29px] top-1 w-3 h-3 bg-mossy-border rounded-full border-2 border-mossy-bg-box"></div>
              
              <p className="font-heading text-mossy-header text-xs uppercase tracking-wider mb-1">
                December 2025
              </p>
              <h3 className="font-heading text-mossy-header text-lg mb-3">
                Choosing Fonts That Feel Right
              </h3>
              
              <div className="space-y-3 text-mossy-text">
                <p>
                  Tested multiple font combinations. Learned that serif fonts 
                  carry the &quot;old book&quot; vibe better than anything else.
                </p>

                <blockquote className="italic text-mossy-link border-l-[3px] border-mossy-border bg-mossy-bg-box/50 pl-4 py-3 my-4">
                  &quot;Cinzel plus Lora equals fantasy storybook. Hierarchy matters more than variety.&quot;
                </blockquote>

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-xs px-2 py-0.5 bg-mossy-bg-box-alt border border-mossy-border text-mossy-text-muted font-nav">typography</span>
                  <span className="text-xs px-2 py-0.5 bg-mossy-bg-box-alt border border-mossy-border text-mossy-text-muted font-nav">fonts</span>
                </div>
              </div>
            </article>

            {/* More coming */}
            <div className="relative opacity-60">
              <div className="absolute -left-[29px] top-1 w-3 h-3 bg-mossy-border rounded-full border-2 border-mossy-bg-box"></div>
              <p className="font-heading text-mossy-header text-xs uppercase tracking-wider mb-1">
                earlier...
              </p>
              <p className="text-mossy-text-muted italic text-center py-4">
                ~ more learnings growing here soon ~
              </p>
            </div>

          </div>
        </RetroBox>
      </main>

      {/* RIGHT SIDEBAR - Hidden on mobile/tablet */}
      <aside className="hidden lg:flex flex-col gap-4 order-3">
        
        {/* Topics */}
        <RetroBox title="[ topics ]">
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-xs px-2 py-0.5 bg-mossy-bg-box-alt border border-mossy-border text-mossy-text-muted font-nav">cursors</span>
            <span className="text-xs px-2 py-0.5 bg-mossy-bg-box-alt border border-mossy-border text-mossy-text-muted font-nav">effects</span>
            <span className="text-xs px-2 py-0.5 bg-mossy-bg-box-alt border border-mossy-border text-mossy-text-muted font-nav">colors</span>
            <span className="text-xs px-2 py-0.5 bg-mossy-bg-box-alt border border-mossy-border text-mossy-text-muted font-nav">fonts</span>
            <span className="text-xs px-2 py-0.5 bg-mossy-bg-box-alt border border-mossy-border text-mossy-text-muted font-nav">90s web</span>
            <span className="text-xs px-2 py-0.5 bg-mossy-bg-box-alt border border-mossy-border text-mossy-text-muted font-nav">layout</span>
          </div>
        </RetroBox>

        {/* Key Insight */}
        <RetroBox title="[ key insight ]">
          <div className="text-sm text-center space-y-2">
            <p className="text-mossy-header italic">
              90s sites had complex layouts but simple interactions.
            </p>
            <p className="text-mossy-text-muted">
              Modern sites flip this — minimal layouts, fancy animations.
            </p>
            <p className="text-mossy-accent font-semibold">
              You can&apos;t max out both.
            </p>
          </div>
        </RetroBox>

      </aside>
    </div>
  );
}

