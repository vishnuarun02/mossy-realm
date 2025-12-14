import RetroBox from './RetroBox';

export default function SidebarLeft() {
  return (
    <aside className="flex flex-col gap-4">
      {/* Updates Section */}
      <RetroBox title="updates" titleIcon="✦">
        <div className="space-y-4 font-body">
          <div>
            <p className="text-mossy-header text-sm mb-1 font-heading">
              December 13th, 2025
            </p>
            <p className="text-mossy-text">
              Welcome to the realm! Just planted the first seeds of this little corner of the web~
            </p>
          </div>
          <div>
            <p className="text-mossy-header text-sm mb-1 font-heading">
              December 12th, 2025
            </p>
            <p className="text-mossy-text">
              Working on the site design. It&apos;s going to be cozy!
            </p>
          </div>
        </div>
      </RetroBox>

      {/* To Do Section */}
      <RetroBox title="to do" titleIcon="◇">
        <ul className="list-none space-y-1 text-mossy-text font-body">
          <li><span className="text-mossy-accent mr-2">&#9656;</span>Add more pages</li>
          <li><span className="text-mossy-accent mr-2">&#9656;</span>Draw site mascot</li>
          <li><span className="text-mossy-accent mr-2">&#9656;</span>Make a guestbook</li>
          <li><span className="text-mossy-accent mr-2">&#9656;</span>Create pixel art buttons</li>
          <li><span className="text-mossy-accent mr-2">&#9656;</span>Find cool web badges</li>
          <li><span className="text-mossy-accent mr-2">&#9656;</span>Add background music</li>
        </ul>
      </RetroBox>

      {/* Little decoration box */}
      <RetroBox title="realm guardian" titleIcon="❧">
        <div className="text-center">
          <div
            className="
              w-24 h-24 
              mx-auto 
              bg-mossy-bg-box-alt 
              border-2 border-dashed border-mossy-border
              flex items-center justify-center
              text-2xl text-mossy-border
            "
          >
            [sprite]
          </div>
          <p className="text-mossy-text-muted text-sm mt-2 italic font-body">
            A friendly guardian watches over the realm
          </p>
        </div>
      </RetroBox>
    </aside>
  );
}
