import RetroBox from './RetroBox';
import Image from 'next/image';
import TextLink from './ui/TextLink';
import Button from './ui/Button';
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
          <p className="text-fg-heading mb-3 text-center font-heading">
            Which unlived life do you wonder about most?
          </p>
          <div className="space-y-2">
            {['The career you almost chose', 'The place you almost moved to', 'The person you almost became', 'The risk you never took, but should have'].map((option) => (
              <label
                key={option}
                className="
                  flex items-center gap-2
                  cursor-pointer
                  hover:text-link
                  transition-colors duration-fast
                "
              >
                <input
                  type="radio"
                  name="season"
                  className="accent-accent w-4 h-4"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <Button size="sm" className="flex-1 font-bold text-xs">
              Vote
            </Button>
            <Button variant="ghost" size="sm" className="flex-1 text-xs">
              View
            </Button>
          </div>
        </div>
      </RetroBox>

      {/* Web Badges */}
      <RetroBox title="[ badges ]">
        <div className="flex flex-wrap gap-2 justify-center">
          <Image
            src="/images/badges/valid-html401.png"
            alt="Valid HTML 4.01 badge"
            width={88}
            height={31}
            className="border-hairline border-border-structural"
            unoptimized
          />
          <Image
            src="/images/badges/valid-css.png"
            alt="Valid CSS badge"
            width={88}
            height={31}
            className="border-hairline border-border-structural"
            unoptimized
          />
          <Image
            src="/images/badges/valid-xhtml11.png"
            alt="Valid XHTML 1.1 badge"
            width={88}
            height={31}
            className="border-hairline border-border-structural"
            unoptimized
          />
        </div>
      </RetroBox>

      {/* Latest Art - an honest empty frame until the gallery opens */}
      <RetroBox title="[ latest art ]">
        <div
          className="
            w-full
            border-2 border-dashed border-border-structural
            px-3 py-5
            mb-2
            text-center
          "
        >
          <p className="text-fg-secondary text-xs italic font-body">
            nothing hung yet. the gallery is being framed.
          </p>
        </div>
        <TextLink href="/fieldwork/gallery" arrow className="text-sm">
          view gallery
        </TextLink>
      </RetroBox>
    </aside>
  );
}
