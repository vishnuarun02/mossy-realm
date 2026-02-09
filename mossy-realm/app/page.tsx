import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";
import MainPanel from "@/components/MainPanel";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="site-container relative">
      {/* Welcome to internet - top left, tilted */}
      <div className="hidden md:block absolute top-[70px] left-3 z-20 rotate-[-5deg]">
        <Image 
          src="/images/welcome-to-internet.gif" 
          alt="welcome to the internet" 
          width={85} 
          height={28}
          unoptimized
        />
      </div>

      {/* Hello tag - top right area, slight tilt */}
      <div className="hidden md:block absolute top-[75px] right-4 z-20 rotate-3">
        <Image 
          src="/images/hellotags.gif" 
          alt="hello" 
          width={120} 
          height={25}
          unoptimized
        />
      </div>

      {/* Header with title and nav */}
      <NavBar />

      {/* Main content area */}
      <main className="site-main">
        {/* 
          Three-column layout:
          - Desktop: Left Sidebar (190px) | Main (1fr) | Right Sidebar (190px)
          - Tablet: Two columns
          - Mobile: Single column, stacked
        */}

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
