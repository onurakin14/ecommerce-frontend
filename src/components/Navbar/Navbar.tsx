import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
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

  // 🛒 cart slice henüz yok
  const totalItems = 0;

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between py-3 px-3 sm:px-6">

        {/* LEFT */}
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md" />
            <span className="text-xl font-semibold">enoca</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-gray-600 text-sm font-medium">
            <Link to="/" className="hover:text-black">Home</Link>

            <Link to="/categories" className="hover:text-black flex items-center gap-1">
              Categories <FiChevronDown size={14} />
            </Link>

            <Link to="/deals" className="hover:text-black">Deals</Link>
            <Link to="/new-arrivals" className="hover:text-black">New Arrivals</Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <div className="hidden lg:flex bg-gray-100 items-center gap-2 px-3 py-2 rounded-lg w-[250px]">
            <FiSearch className="text-gray-500" />
            <input
              className="bg-transparent outline-none w-full text-sm"
              placeholder="Search products..."
            />
          </div>

          {/* Wishlist */}
          <Link to="/wishlist">
            <Icon icon={<AiOutlineHeart size={20} />} />
          </Link>

          {/* Cart */}
          <Link to="/cart">
            <Icon icon={<FaShoppingCart size={18} />}>
              {totalItems > 0 && (
                <span className="absolute -top-[6px] -right-[6px] bg-blue-600 text-white text-[10px] px-[6px] rounded-full">
                  {totalItems}
                </span>
              )}
            </Icon>
          </Link>

          {/* Auth */}
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                {user?.username}
              </span>

              <button
                onClick={() => dispatch(logout())}
                className="text-sm text-red-600 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-sm text-blue-600 hover:underline">
              Login
            </Link>
          )}

          {/* Hamburger */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col px-4 pb-4 gap-3 text-gray-700 text-[15px] font-medium border-t">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/categories" onClick={() => setOpen(false)}>Categories</Link>
          <Link to="/deals" onClick={() => setOpen(false)}>Deals</Link>
          <Link to="/new-arrivals" onClick={() => setOpen(false)}>New Arrivals</Link>
        </div>
      )}
    </nav>
  );
}

/* Reusable Icon */
function Icon({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <button className="relative w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
      {icon}
      {children}
    </button>
  );
}
