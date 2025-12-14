import RetroBox from './RetroBox';

export default function SidebarLeft() {
  return (
    <aside className="flex flex-col gap-4">
      {/* Updates Section */}
      <RetroBox title="updates">
        <div className="space-y-4 font-body">
          <div>
            <p className="text-mossy-header text-sm mb-1 font-heading ascii-underline inline-block">
              December 13th, 2025
            </p>
            <p className="text-mossy-text mt-2">
              Welcome to the realm! Just planted the first seeds of this little corner of the web~
            </p>
          </div>
          <div className="pixel-bar" />
          <div>
            <p className="text-mossy-header text-sm mb-1 font-heading ascii-underline inline-block">
              December 12th, 2025
            </p>
            <p className="text-mossy-text mt-2">
              Working on the site design. It&apos;s going to be cozy!
            </p>
          </div>
        </div>
      </RetroBox>

      {/* To Do Section */}
      <RetroBox title="to do">
        <ul className="list-none space-y-2 text-mossy-text font-body">
          <li><span className="tiny-star mr-2" />Add more pages</li>
          <li><span className="tiny-star mr-2" />Draw site mascot</li>
          <li><span className="tiny-star mr-2" />Make a guestbook</li>
          <li><span className="tiny-star mr-2" />Create pixel art buttons</li>
          <li><span className="tiny-star mr-2" />Find cool web badges</li>
          <li><span className="tiny-star mr-2" />Add background music</li>
        </ul>
        <div className="pixel-bar-double mt-3" />
      </RetroBox>

      {/* Little decoration box */}
      <RetroBox title="realm guardian">
        <div className="text-center corner-deco">
          <div
            className="
              w-24 h-24 
              mx-auto 
              bg-mossy-bg-box-alt 
              border-2 border-dashed border-mossy-border
              flex items-center justify-center
              text-sm text-mossy-text-muted
            "
          >
            [sprite]
          </div>
          <p className="text-mossy-text-muted text-sm mt-2 italic font-body">
            <span className="sparkle">*</span> A friendly guardian watches over the realm <span className="sparkle">*</span>
          </p>
        </div>
      </RetroBox>
    </aside>
  );
}
