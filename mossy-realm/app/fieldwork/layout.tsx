import SiteShell from "@/components/SiteShell";
import BinderTabs from "@/components/fieldwork/BinderTabs";

/**
 * Fieldwork layout: the lab binder.
 *
 * Folder tabs on top mark the sections; every page sits on faint
 * graph paper underneath. Distinct from the cabin's file tree.
 */
export default function FieldworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteShell>
      <BinderTabs />
      <div className="mt-4">
        {children}
      </div>
    </SiteShell>
  );
}
