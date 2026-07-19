import SiteShell from "@/components/SiteShell";

export default function CrossroadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell>{children}</SiteShell>;
}
