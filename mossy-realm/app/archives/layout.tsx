import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function ArchivesLayout({
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

