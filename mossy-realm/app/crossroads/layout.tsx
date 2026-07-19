import SiteShell from "@/components/SiteShell";
import SubNav from "@/components/SubNav";

const crossroadsLinks = [
  { href: '/crossroads/rabbit-holes', label: 'rabbit holes' },
  { href: '/crossroads/guestbook', label: 'guestbook' },
  { href: '/crossroads/credits', label: 'credits' },
];

export default function CrossroadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteShell subNav={<SubNav links={crossroadsLinks} label="Crossroads sections" />}>
      {children}
    </SiteShell>
  );
}
