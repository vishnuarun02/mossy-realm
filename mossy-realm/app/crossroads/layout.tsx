import SiteShell from "@/components/SiteShell";
import SignpostNav from "@/components/crossroads/SignpostNav";

/**
 * Crossroads layout: the junction.
 *
 * Signpost planks mark the roads out. Each page is its own
 * destination board; the planks stay above them all.
 */
export default function CrossroadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteShell>
      <SignpostNav />
      {children}
    </SiteShell>
  );
}
