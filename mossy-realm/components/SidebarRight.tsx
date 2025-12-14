import RetroBox from './RetroBox';

export default function SidebarRight() {
  return (
    <aside className="flex flex-col gap-4">
      {/* Radio/Music Section */}
      <RetroBox title="realm radio">
        <div className="text-center">
          <div
            className="
              w-full h-20
              bg-mossy-bg-box-alt 
              border-2 border-dashed border-mossy-border
              flex items-center justify-center
              text-lg text-mossy-text-muted
              mb-2
            "
          >
            [ player ]
          </div>
          <p className="text-mossy-text-muted text-sm italic font-body">
            <span className="blink">|</span> Music player coming soon~
          </p>
        </div>
      </RetroBox>

      {/* Random Fact Section */}
      <RetroBox title="nature fact!">
        <div className="text-center font-body corner-deco">
          <p className="text-mossy-border text-lg mb-2">~ <span className="sparkle">*</span> ~</p>
          <p className="text-mossy-text">
            Moss can hold up to <span className="text-mossy-accent font-bold">20 times</span> its weight in water! That&apos;s why forests stay so cool and misty~
          </p>
          <div className="pixel-bar mt-3 mb-3" />
          <button
            className="
              font-nav
              bg-mossy-bg-box-alt
              border-2 border-mossy-border
              px-3 py-1
              text-mossy-link
              hover:bg-mossy-border
              hover:text-mossy-bg-box
              transition-colors
              text-sm
            "
          >
            [ new fact ]
          </button>
        </div>
      </RetroBox>

      {/* Poll Section */}
      <RetroBox title="monthly poll">
        <div className="font-body">
          <p className="text-mossy-header mb-3 text-center font-heading">
            What&apos;s your favorite season?
          </p>
          <div className="pixel-bar mb-3" />
          <div className="space-y-2">
            {[
              { label: 'Spring', symbol: '*' },
              { label: 'Summer', symbol: '+' },
              { label: 'Autumn', symbol: '~' },
              { label: 'Winter', symbol: 'o' },
            ].map((option) => (
              <label
                key={option.label}
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
                <span className="text-mossy-border mr-1">[{option.symbol}]</span>
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          <div className="pixel-bar-double mt-3 mb-3" />
          <div className="flex gap-2">
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
                text-sm
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
                text-sm
              "
            >
              View
            </button>
          </div>
        </div>
      </RetroBox>

      {/* Web Badges placeholder */}
      <RetroBox title="badges">
        <div className="flex flex-wrap gap-2 justify-center">
          <div className="bg-mossy-bg-box-alt border border-mossy-border px-2 py-1 text-xs text-mossy-text-muted">
            [88x31]
          </div>
          <div className="bg-mossy-bg-box-alt border border-mossy-border px-2 py-1 text-xs text-mossy-text-muted">
            [88x31]
          </div>
          <div className="bg-mossy-bg-box-alt border border-mossy-border px-2 py-1 text-xs text-mossy-text-muted">
            [88x31]
          </div>
        </div>
        <p className="text-center text-mossy-text-muted text-xs mt-2 italic">
          collecting badges...
        </p>
      </RetroBox>
    </aside>
  );
}
