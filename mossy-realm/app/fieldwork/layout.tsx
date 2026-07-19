import SiteShell from "@/components/SiteShell";

export default function FieldworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell>{children}</SiteShell>;
}
