import RetroBox from "@/components/RetroBox";
import Link from "next/link";

export default function SitemapPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ sitemap }" variant="alt">
        <div className="text-center space-y-4 mb-6">
          <p className="font-accent text-mossy-header text-lg">
            ~ all paths through the realm ~
          </p>
          <p className="text-mossy-text">
            A complete map of everything on this site.
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <div className="space-y-6">
          {/* Outpost */}
          <div>
            <h3 className="font-heading text-mossy-header text-sm uppercase tracking-wider mb-2">
              outpost
            </h3>
            <ul className="space-y-1 text-sm pl-4">
              <li>
                <Link href="/" className="text-mossy-link hover:text-mossy-link-hover">
                  / (home)
                </Link>
              </li>
            </ul>
          </div>

          {/* The Cabin */}
          <div>
            <h3 className="font-heading text-mossy-header text-sm uppercase tracking-wider mb-2">
              the cabin
            </h3>
            <ul className="space-y-1 text-sm pl-4">
              <li>
                <Link href="/cabin/about" className="text-mossy-link hover:text-mossy-link-hover">
                  /cabin/about
                </Link>
                <span className="text-mossy-text-muted ml-2">about me</span>
              </li>
              <li>
                <Link href="/cabin/now" className="text-mossy-link hover:text-mossy-link-hover">
                  /cabin/now
                </Link>
                <span className="text-mossy-text-muted ml-2">current state</span>
              </li>
              <li>
                <Link href="/cabin/trophy-shelf" className="text-mossy-link hover:text-mossy-link-hover">
                  /cabin/trophy-shelf
                </Link>
                <span className="text-mossy-text-muted ml-2">projects & wins</span>
              </li>
            </ul>
          </div>

          {/* Fieldwork */}
          <div>
            <h3 className="font-heading text-mossy-header text-sm uppercase tracking-wider mb-2">
              fieldwork
            </h3>
            <ul className="space-y-1 text-sm pl-4">
              <li>
                <Link href="/fieldwork/learnings" className="text-mossy-link hover:text-mossy-link-hover">
                  /fieldwork/learnings
                </Link>
                <span className="text-mossy-text-muted ml-2">long-form writing</span>
              </li>
              <li>
                <Link href="/fieldwork/field-notes" className="text-mossy-link hover:text-mossy-link-hover">
                  /fieldwork/field-notes
                </Link>
                <span className="text-mossy-text-muted ml-2">micro-posts</span>
              </li>
              <li>
                <Link href="/fieldwork/gallery" className="text-mossy-link hover:text-mossy-link-hover">
                  /fieldwork/gallery
                </Link>
                <span className="text-mossy-text-muted ml-2">visual notes</span>
              </li>
            </ul>
          </div>

          {/* Crossroads */}
          <div>
            <h3 className="font-heading text-mossy-header text-sm uppercase tracking-wider mb-2">
              crossroads
            </h3>
            <ul className="space-y-1 text-sm pl-4">
              <li>
                <Link href="/crossroads/rabbit-holes" className="text-mossy-link hover:text-mossy-link-hover">
                  /crossroads/rabbit-holes
                </Link>
                <span className="text-mossy-text-muted ml-2">curated links</span>
              </li>
              <li>
                <Link href="/crossroads/guestbook" className="text-mossy-link hover:text-mossy-link-hover">
                  /crossroads/guestbook
                </Link>
                <span className="text-mossy-text-muted ml-2">visitor signatures</span>
              </li>
              <li>
                <Link href="/crossroads/credits" className="text-mossy-link hover:text-mossy-link-hover">
                  /crossroads/credits
                </Link>
                <span className="text-mossy-text-muted ml-2">acknowledgements</span>
              </li>
            </ul>
          </div>

          {/* Archives */}
          <div>
            <h3 className="font-heading text-mossy-header text-sm uppercase tracking-wider mb-2">
              archives
            </h3>
            <ul className="space-y-1 text-sm pl-4">
              <li>
                <Link href="/archives/collected" className="text-mossy-link hover:text-mossy-link-hover">
                  /archives/collected
                </Link>
                <span className="text-mossy-text-muted ml-2">visual artifacts</span>
              </li>
              <li>
                <Link href="/archives/sitemap" className="text-mossy-link hover:text-mossy-link-hover">
                  /archives/sitemap
                </Link>
                <span className="text-mossy-text-muted ml-2">you are here</span>
              </li>
            </ul>
          </div>

          {/* Other */}
          <div>
            <h3 className="font-heading text-mossy-header text-sm uppercase tracking-wider mb-2">
              other
            </h3>
            <ul className="space-y-1 text-sm pl-4">
              <li>
                <Link href="/player" className="text-mossy-link hover:text-mossy-link-hover">
                  /player
                </Link>
                <span className="text-mossy-text-muted ml-2">realm radio (full player)</span>
              </li>
            </ul>
          </div>
        </div>
      </RetroBox>
    </div>
  );
}

