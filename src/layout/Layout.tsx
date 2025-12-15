import type { ReactNode } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* NAVBAR */}
      <Navbar />
      {/* CONTENT AREA */}
      <main className="flex-1 bg-white">
        <div className="max-w-7x4 mx-auto w-full px-4 py-">{children}</div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
