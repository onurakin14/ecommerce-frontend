import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiBox,
  FiUsers,
  FiShoppingCart,
  FiSettings,
  FiHelpCircle,
} from "react-icons/fi";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white flex flex-col justify-between shadow-sm">

      
      {/* TOP */}
      <div>
        <div className="px-6 py-5 text-lg font-bold">Admin Panel</div>

        {/* DASHBOARD */}
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 text-sm ${
              isActive ? "bg-blue-100 text-blue-600" : "text-gray-600"
            }`
          }
        >
          <FiGrid /> Dashboard
        </NavLink>

        {/* MANAGEMENT */}
        <p className="px-6 mt-6 mb-2 text-xs font-semibold text-gray-400">
          MANAGEMENT
        </p>

        <SidebarLink to="/admin/products" icon={<FiBox />} label="Products" />
        <SidebarLink to="/admin/orders" icon={<FiShoppingCart />} label="Orders" />
        <SidebarLink to="/admin/users" icon={<FiUsers />} label="Users" />

        {/* SYSTEM */}
        <p className="px-6 mt-6 mb-2 text-xs font-semibold text-gray-400">
          SYSTEM
        </p>

        <SidebarLink to="/admin/settings" icon={<FiSettings />} label="Settings" />
        <SidebarLink to="/admin/support" icon={<FiHelpCircle />} label="Support" />
      </div>

      {/* PROFILE */}
      <div className="px-6 py-4 flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/40"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-sm font-medium">Tom Cook</p>
          <p className="text-xs text-gray-500">tom@example.com</p>
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-6 py-3 text-sm ${
          isActive ? "bg-blue-100 text-blue-600" : "text-gray-600"
        }`
      }
    >
      {icon} {label}
    </NavLink>
  );
}
