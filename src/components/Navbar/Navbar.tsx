import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiChevronDown,
  FiMenu,
  FiX,
  FiSettings,
} from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { logout } from "../../store/authSlice";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = Boolean(token);

  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const totalItems = 0;

  // Dark mode'da yazı rengi tema rengi, açık modda var(--primary-text)
  const textColor = isDarkMode ? "var(--primary)" : "var(--primary-text)";

  // Dark mode'da arka plan siyah, açık modda tema rengi
  const navBg = isDarkMode ? "#111827" : "var(--primary)";

  return (
    <nav
      className="w-full border-b border-gray-200"
      style={{ backgroundColor: "var(--primary)" }}
    >
      {/* DESKTOP */}
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 text-color:var(--primary-text)">
        {/* LEFT */}
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-md"
              style={{ backgroundColor: "var(--primary)" }}
            />
            <span
              className="text-xl font-semibold"
              style={{ color: isDarkMode ? "#ffffff" : "inherit" }}
            >
              enoca
            </span>
          </Link>

          <div className="hidden md:flex gap-8 text-sm font-medium">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              Home
            </Link>

            <Link
              to="/categories"
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              Categories <FiChevronDown size={14} />
            </Link>

            <Link to="/deals" className="hover:opacity-80 transition-opacity">
              Deals
            </Link>

            <Link
              to="/new-arrivals"
              className="hover:opacity-80 transition-opacity"
            >
              New Arrivals
            </Link>

            {isLoggedIn && (
              <Link to="/orders" className="hover:opacity-80">
                My Orders
              </Link>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <NavIcon to="/settings">
            <FiSettings size={18} />
          </NavIcon>

          <NavIcon to="/wishlist" isDarkMode={isDarkMode}>
            <AiOutlineHeart size={20} />
          </NavIcon>

          <NavIcon to="/cart" isDarkMode={isDarkMode}>
            <FaShoppingCart size={18} />
            {totalItems > 0 && (
              <span
                className="absolute -top-1 -right-1 text-[10px] px-1.5 rounded-full text-white"
                style={{ backgroundColor: "var(--primary)" }}
              >
                {totalItems}
              </span>
            )}
          </NavIcon>

          <Link to="/user/1">
            <div className="hidden md:block w-9 h-9 rounded-full overflow-hidden hover:ring-2 ring-blue-600 cursor-pointer">
              <img
                src="https://i.pravatar.cc/100"
                className="w-full h-full object-cover"
                alt="User"
              />
            </div>
          </Link>

          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-3">
              <span
                className="text-sm"
                style={{ color: isDarkMode ? "#ffffff" : "inherit" }}
              >
                {user?.username}
              </span>
              <button
                onClick={() => dispatch(logout())}
                className="text-sm underline hover:opacity-80 transition-opacity"
                style={{ color: isDarkMode ? "#ef4444" : "inherit" }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm underline hover:opacity-80 transition-opacity"
            >
              Login
            </Link>
          )}

          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            style={{ color: isDarkMode ? "#ffffff" : "inherit" }}
          >
            {open ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div
          className="md:hidden px-4 pb-4 flex flex-col gap-3 border-t transition-colors"
          style={{
            color: textColor,
            borderColor: isDarkMode ? "#374151" : "rgba(0,0,0,0.1)",
          }}
        >
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/categories" onClick={() => setOpen(false)}>
            Categories
          </Link>
          <Link to="/deals" onClick={() => setOpen(false)}>
            Deals
          </Link>
          <Link to="/new-arrivals" onClick={() => setOpen(false)}>
            New Arrivals
          </Link>

          {isLoggedIn && (
            <Link to="/order-history" onClick={() => setOpen(false)}>
              Order History
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

/* ICON WRAPPER */
function NavIcon({
  to,
  children,
  isDarkMode,
}: {
  to: string;
  children: React.ReactNode;
  isDarkMode: boolean;
}) {
  return (
    <Link
      to={to}
      className="relative w-9 h-9 flex items-center justify-center rounded-full transition-colors"
      style={{
        backgroundColor: isDarkMode
          ? "rgba(255,255,255,0.1)"
          : "rgba(0,0,0,0.05)",
        color: isDarkMode ? "var(--primary)" : "inherit",
      }}
    >
      {children}
    </Link>
  );
}
