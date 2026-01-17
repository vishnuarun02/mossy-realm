import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SubNav from "@/components/SubNav";

const gardenLinks = [
  { href: '/garden/learnings', label: 'Learnings' },
  { href: '/garden/resources', label: 'Resources' },
  { href: '/garden/finds', label: 'Finds' },
];

export default function GardenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="site-container">
      <NavBar />
      <SubNav links={gardenLinks} />
      <main className="site-main">
        {children}
      </main>
      <Footer />
    </div>
  );
}

