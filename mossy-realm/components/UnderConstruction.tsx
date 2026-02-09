import Image from 'next/image';

export default function UnderConstruction() {
  return (
    <div className="relative py-8">
      {/* Top left - tilted barricade */}
      <div className="absolute -top-2 -left-4 -rotate-12 z-10">
        <Image 
          src="/images/construction/construction.gif" 
          alt="under construction" 
          width={120} 
          height={90}
          unoptimized
        />
      </div>
      
      {/* Top right - button strip */}
      <div className="absolute -top-1 right-0 rotate-3">
        <Image 
          src="/images/construction/underconstruction-button.gif" 
          alt="construction" 
          width={140} 
          height={20}
          unoptimized
        />
      </div>

      {/* Center content */}
      <div className="text-center py-12 px-4">
        <p className="text-mossy-header font-accent text-xl mb-2">
          ~ watch your step! ~
        </p>
        <p className="text-mossy-text-muted text-sm">
          this area is under construction
        </p>
        <p className="text-mossy-text-muted text-xs mt-1 italic">
          check back soon...
        </p>
      </div>

      {/* Bottom - workers planning (offset right) */}
      <div className="flex justify-end -mt-4 mr-[-20px]">
        <div className="rotate-2">
          <Image 
            src="/images/construction/planning-construction.gif" 
            alt="workers planning" 
            width={150} 
            height={180}
            unoptimized
          />
        </div>
      </div>

      {/* Another barricade bottom left for chaos */}
      <div className="absolute bottom-4 left-8 rotate-6">
        <Image 
          src="/images/construction/underconstruction-button.gif" 
          alt="construction" 
          width={100} 
          height={15}
          unoptimized
        />
      </div>
    </div>
  );
}

