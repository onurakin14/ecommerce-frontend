import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import Sidebar from "../components/Sidebar/Sidebar";
import { FiSearch, FiBell, FiHelpCircle } from "react-icons/fi";

export default function AdminLayout() {
  const token = useSelector((state: RootState) => state.auth.token);

  // 🔐 AUTH GUARD
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <Sidebar />

      {/* RIGHT CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR */}
<div className="h-16 bg-white flex items-center justify-between px-6 shadow-sm">

  
  {/* LEFT (şimdilik boş – breadcrumb eklenebilir) */}
  <div />

  {/* RIGHT */}
  <div className="flex items-center gap-6">
    
    {/* SEARCH */}
    <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg w-64">
      <FiSearch className="text-gray-400" />
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent outline-none text-sm w-full"
      />
    </div>

    {/* ICONS */}
    <FiBell className="cursor-pointer text-gray-500 hover:text-black" size={18} />
    <FiHelpCircle className="cursor-pointer text-gray-500 hover:text-black" size={18} />
  </div>
</div>


        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
