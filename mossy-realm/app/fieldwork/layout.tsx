import SiteShell from "@/components/SiteShell";
import SubNav from "@/components/SubNav";

const fieldworkLinks = [
  { href: '/fieldwork/learnings', label: 'learnings' },
  { href: '/fieldwork/experiments', label: 'experiments' },
  { href: '/fieldwork/field-notes', label: 'field notes' },
  { href: '/fieldwork/gallery', label: 'gallery' },
];

export default function FieldworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteShell subNav={<SubNav links={fieldworkLinks} label="Fieldwork sections" />}>
      {children}
    </SiteShell>
  );
}
