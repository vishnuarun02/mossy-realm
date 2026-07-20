import SiteShell from "@/components/SiteShell";
import CabinDrawer from "@/components/cabin/CabinDrawer";

/**
 * Cabin layout: the room's shell.
 *
 * The cabinet index sits on the left (sticky on desktop, a compact
 * drawer selector on mobile); the page content sits beside it.
 * Paper-surface pages attach flush to the cabinet with -ml-4.
 */
export default function CabinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteShell>
      <div className="grid gap-4 lg:grid-cols-[212px_1fr]">
        <CabinDrawer />
        <div className="min-w-0">
          {children}
        </div>
      </div>
    </SiteShell>
  );
}
