import SiteShell from "@/components/SiteShell";
import CatalogTabs from "@/components/archives/CatalogTabs";

/**
 * Archives layout: the basement file cabinet.
 *
 * Catalog tabs mark the drawers. Everything below is catalogued,
 * accessioned, and slightly dusty.
 */
export default function ArchivesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteShell>
      <CatalogTabs />
      {children}
    </SiteShell>
  );
}
