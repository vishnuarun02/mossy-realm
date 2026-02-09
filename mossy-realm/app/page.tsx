import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";
import MainPanel from "@/components/MainPanel";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="site-container relative">
      {/* 
        Header frame decorations - anchored to corners
        Macro symmetry: left/right balance
        Micro asymmetry: different gifs, slight offsets
      */}
      
      {/* Top-left corner of frame - welcome sign, snapped to edge */}
      <div className="absolute top-[8px] left-[8px] z-30 rotate-[-3deg]">
        <Image 
          src="/images/welcome-to-internet.gif" 
          alt="" 
          width={75} 
          height={24}
          className="md:w-[90px]"
          unoptimized
        />
      </div>

      {/* Top-right corner of frame - construction button for balance */}
      <div className="absolute top-[8px] right-[8px] z-30 rotate-[2deg]">
        <Image 
          src="/images/construction/underconstruction-button.gif" 
          alt="" 
          width={70} 
          height={14}
          className="md:w-[90px]"
          unoptimized
        />
      </div>

      {/* Header with title and nav */}
      <NavBar />

      {/* Main content area */}
      <main className="site-main">
        {/* Desktop Layout (lg and up) */}
        <div
          className="hidden lg:grid gap-4"
          style={{ gridTemplateColumns: '190px 1fr 190px' }}
        >
          <SidebarLeft />
          <MainPanel />
          <SidebarRight />
        </div>

        {/* Tablet Layout (md to lg) */}
        <div className="hidden md:grid lg:hidden gap-4 grid-cols-[190px_1fr]">
          <div className="space-y-4">
            <SidebarLeft />
            <SidebarRight />
          </div>
          <MainPanel />
        </div>

        {/* Mobile Layout (below md) */}
        <div className="md:hidden space-y-4">
          <SidebarLeft />
          <MainPanel />
          <SidebarRight />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
