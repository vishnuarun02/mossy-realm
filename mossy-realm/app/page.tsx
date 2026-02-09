import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";
import MainPanel from "@/components/MainPanel";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="site-container relative">
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
