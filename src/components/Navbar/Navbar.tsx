import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiSearch,
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

  const totalItems = 0;

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
              style={{ backgroundColor: "var(--brand-primary)" }}
            />
            <span className="text-xl font-semibold">enoca</span>
          </Link>

          <div className="hidden md:flex gap-8 text-sm font-medium">
            <Link to="/" className="hover:opacity-80">
              Home
            </Link>

            <Link
              to="/categories"
              className="flex items-center gap-1 hover:opacity-80"
            >
              Categories <FiChevronDown size={14} />
            </Link>

            <Link to="/deals" className="hover:opacity-80">
              Deals
            </Link>

            <Link to="/new-arrivals" className="hover:opacity-80">
              New Arrivals
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* SEARCH */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-black/5">
            <FiSearch className="text-current" />
            <input
              className="bg-transparent outline-none text-sm placeholder-gray-400 text-current"
              placeholder="Search products..."
            />
          </div>

          <NavIcon to="/settings">
            <FiSettings size={18} />
          </NavIcon>

          <NavIcon to="/wishlist">
            <AiOutlineHeart size={20} />
          </NavIcon>

          <NavIcon to="/cart">
            <FaShoppingCart size={18} />
            {totalItems > 0 && (
              <span
                className="absolute -top-1 -right-1 text-[10px] px-1.5 rounded-full text-white"
                style={{ backgroundColor: "var(--brand-primary)" }}
              >
                {totalItems}
              </span>
            )}
          </NavIcon>

          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm">{user?.username}</span>
              <button
                onClick={() => dispatch(logout())}
                className="text-sm underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-sm underline">
              Login
            </Link>
          )}

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div
          className="md:hidden px-4 pb-4 flex flex-col gap-3 border-t"
          style={{ color: "var(--primary-text)" }}
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
        </div>
      )}
    </nav>
  );
}

/* ICON WRAPPER */
function NavIcon({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="relative w-9 h-9 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-current"
    >
      {children}
    </Link>
  );
}