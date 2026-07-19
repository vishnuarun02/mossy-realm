import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";
import MainPanel from "@/components/MainPanel";
import SiteShell from "@/components/SiteShell";

export default function Home() {
  return (
    <SiteShell className="relative">
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
    </SiteShell>
  );
}
