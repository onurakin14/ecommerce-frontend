import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <main className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto w-full px-4 py-4">
          <Outlet />
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
