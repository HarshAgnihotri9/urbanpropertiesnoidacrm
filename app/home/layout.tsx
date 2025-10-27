import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* ✅ Navbar visible on all home pages */}
      <Navbar />

      {/* ✅ Main content of /home pages */}
      <main className="min-h-screen pt-16">
        {children}
      </main>

      {/* ✅ Footer visible on all home pages */}
      <Footer />
    </>
  );
}
