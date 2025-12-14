import RetroBox from './RetroBox';

export default function SidebarRight() {
  return (
    <aside className="flex flex-col gap-4">
      {/* Radio/Music Section */}
      <RetroBox title="🎵 realm radio">
        <div className="text-center">
          <div
            className="
              w-full h-20
              bg-mossy-bg-box-alt 
              border-2 border-dashed border-mossy-border
              flex items-center justify-center
              text-2xl
              mb-2
            "
          >
            📻 ♪♫♪
          </div>
          <p className="text-mossy-text-muted text-sm italic font-body">
            Music player coming soon~
          </p>
        </div>
      </RetroBox>

      {/* Random Fact Section */}
      <RetroBox title="🌿 nature fact!">
        <div className="text-center font-body">
          <div className="text-3xl mb-2">🌱</div>
          <p className="text-mossy-text">
            Moss can hold up to <span className="text-mossy-accent font-bold">20 times</span> its weight in water! That&apos;s why forests stay so cool and misty~
          </p>
          <button
            className="
              font-nav
              mt-3
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
            new fact
          </button>
        </div>
      </RetroBox>

      {/* Poll Section */}
      <RetroBox title="📊 monthly poll">
        <div className="font-body">
          <p className="text-mossy-header mb-3 text-center font-heading">
            What&apos;s your favorite season?
          </p>
          <div className="space-y-2">
            {['🌸 Spring', '☀️ Summer', '🍂 Autumn', '❄️ Winter'].map((option) => (
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
      <RetroBox title="🏷️ badges">
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
    </aside>
  );
}
