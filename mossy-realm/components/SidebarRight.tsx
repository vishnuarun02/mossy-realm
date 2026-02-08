import RetroBox from './RetroBox';
import Link from 'next/link';
import { NatureFactWidget } from './VaultWidgets';
import { RealmRadioWidget } from './player';

export default function SidebarRight() {
  return (
    <aside className="flex flex-col gap-4">
      {/* Radio/Music Section - Now a working player! */}
      <RealmRadioWidget />

      {/* Nature Fact - now powered by vault */}
      <NatureFactWidget />

      {/* Poll Section */}
      <RetroBox title="[ monthly poll ]">
        <div className="font-body text-sm">
          <p className="text-mossy-header mb-3 text-center font-heading">
            Which unlived life do you wonder about most?
          </p>
          <div className="space-y-2">
            {['The career you almost chose', 'The place you almost moved to', 'The person you almost became', 'The risk you never took, but should have'].map((option) => (
              <label
                key={option}
                className="
                  flex items-center gap-2 
                  cursor-pointer
                  hover:text-mossy-link
                  transition-colors
                "
              >
                <input
                  type="radio"
                  name="season"
                  className="accent-mossy-accent w-4 h-4"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <button
              className="
                font-nav
                flex-1
                bg-mossy-border
                border-2 border-mossy-border-glow
                px-3 py-1
                text-mossy-bg-box
                font-bold
                hover:bg-mossy-border-glow
                transition-colors
                text-xs
              "
            >
              Vote
            </button>
            <button
              className="
                font-nav
                flex-1
                bg-mossy-bg-box-alt
                border-2 border-mossy-border
                px-3 py-1
                text-mossy-link
                hover:bg-mossy-border
                hover:text-mossy-bg-box
                transition-colors
                text-xs
              "
            >
              View
            </button>
          </div>
        </div>
      </RetroBox>

      {/* Web Badges placeholder */}
      <RetroBox title="[ badges ]">
        <div className="flex flex-wrap gap-2 justify-center">
          <div className="bg-mossy-bg-box-alt border border-mossy-border px-2 py-1 text-xs text-mossy-text-muted">
            [badge 1]
          </div>
          <div className="bg-mossy-bg-box-alt border border-mossy-border px-2 py-1 text-xs text-mossy-text-muted">
            [badge 2]
          </div>
          <div className="bg-mossy-bg-box-alt border border-mossy-border px-2 py-1 text-xs text-mossy-text-muted">
            [badge 3]
          </div>
        </div>
      </RetroBox>

      {/* Latest Art - moved from MainPanel */}
      <RetroBox title="[ latest art ]">
        <Link href="/fieldwork/gallery" className="block no-underline group">
          <div
            className="
              w-full h-32
              bg-mossy-bg-box 
              border-2 border-dashed border-mossy-border
              flex items-center justify-center
              mb-2
              group-hover:border-mossy-link
              transition-colors
            "
          >
            <div className="text-center text-mossy-text-muted">
              <div className="text-base mb-1 font-body">[ img ]</div>
              <p className="text-xs italic font-body">
                [art preview]
              </p>
            </div>
          </div>
          <span className="text-mossy-link underline group-hover:text-mossy-link-hover text-sm">
            view gallery →
          </span>
        </Link>
      </RetroBox>
    </aside>
  );
}
