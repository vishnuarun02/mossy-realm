import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// SubNav removed - using card buttons on page instead

export default function GardenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="site-container">
      <NavBar />
      <main className="site-main">
        {children}
      </main>
      <Footer />
    </div>
  );
}

