import SiteShell from "@/components/SiteShell";
import SubNav from "@/components/SubNav";

const cabinLinks = [
  { href: '/cabin/about', label: 'about' },
  { href: '/cabin/now', label: 'now' },
  { href: '/cabin/crafting-table', label: 'crafting table' },
  { href: '/cabin/recipes', label: 'recipes' },
  { href: '/cabin/contact', label: 'contact' },
];

export default function CabinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteShell subNav={<SubNav links={cabinLinks} label="Cabin sections" />}>
      {children}
    </SiteShell>
  );
}
