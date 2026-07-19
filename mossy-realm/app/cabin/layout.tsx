import SiteShell from "@/components/SiteShell";
import CabinDirectory from "@/components/cabin/CabinDirectory";

/**
 * Cabin layout: the room's shell.
 *
 * No horizontal submenu. The CabinDirectory hangs on the left wall
 * (sticky on desktop, a fold-away folder on mobile) and the page
 * content occupies the rest of the room.
 */
export default function CabinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteShell>
      <div className="grid gap-4 lg:grid-cols-[210px_1fr]">
        <CabinDirectory />
        <div className="min-w-0">
          {children}
        </div>
      </div>
    </SiteShell>
  );
}
