import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { useCart } from "../../features/shopping-cart/CartContext";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { logout, fetchUser } from "../../store/authSlice";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = Boolean(token);

  const { totalItems } = useCart();

  useEffect(() => {
    if (!token) return;

    dispatch(fetchUser());

    const refresh = () => dispatch(fetchUser());
    window.addEventListener("authChanged", refresh);

    return () => window.removeEventListener("authChanged", refresh);
  }, [token, dispatch]);

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between py-3 px-3 sm:px-6">

        {/* LEFT */}
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md" />
            <span className="text-xl font-semibold">enoca</span>
          </Link>

          <div className="hidden md:flex gap-8 text-gray-600 text-sm font-medium">
            <Link to="/categories" className="hover:text-black flex items-center gap-1">
              Categories <FiChevronDown size={14} />
            </Link>
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

          <button className="lg:hidden">
            <FiSearch size={20} />
          </button>

          {/* Wishlist */}
          <Link to="/wishlist">
            <Icon>
              <AiOutlineHeart size={20} />
            </Icon>
          </Link>

          {/* Cart */}
          <Link to="/cart">
            <Icon>
              <FaShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] px-1.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Icon>
          </Link>

          {/* Avatar */}
          <div className="hidden md:block w-9 h-9 rounded-full overflow-hidden hover:ring-2 ring-blue-600 cursor-pointer">
            <img
              src="https://i.pravatar.cc/100"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Auth */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                {user?.firstName}
              </span>
              <button
                onClick={() => dispatch(logout())}
                className="text-sm text-red-600 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm text-blue-600 hover:underline"
            >
              Login
            </Link>
          )}

          {/* Mobile menu button */}
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

/* Icon Component */
type IconProps = {
  children: React.ReactNode;
};

function Icon({ children }: IconProps) {
  return (
    <div className="relative w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
      {children}
    </div>
  );
}
