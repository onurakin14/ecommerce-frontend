import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ThemeApplier from "../components/theme/ThemeApplier";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--app-bg)] dark:bg-gray-900 transition-colors">
      <ThemeApplier />

      <Navbar />
      <main className="flex-1 bg-(--app-bg)">
        <div className="max-w-7xl mx-auto w-full px-4 py-4">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
