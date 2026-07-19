import SiteShell from "@/components/SiteShell";
import SubNav from "@/components/SubNav";

const archivesLinks = [
  { href: '/archives/collected', label: 'collected' },
  { href: '/archives/changelog', label: 'changelog' },
  { href: '/archives/sitemap', label: 'sitemap' },
];

export default function ArchivesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteShell subNav={<SubNav links={archivesLinks} label="Archives sections" />}>
      {children}
    </SiteShell>
  );
}
