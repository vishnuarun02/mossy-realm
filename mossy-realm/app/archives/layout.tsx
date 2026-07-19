import SiteShell from "@/components/SiteShell";

export default function ArchivesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell>{children}</SiteShell>;
}
