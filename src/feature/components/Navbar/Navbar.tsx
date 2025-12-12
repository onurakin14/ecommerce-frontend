import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store/store";
import { logout, fetchUser } from "../../../store/authSlice";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = !!token;


  useEffect(() => {
    if (!token) return;               // token yoksa çalışmıyor
    dispatch(fetchUser());            // sayfa yenilendiğinde kullanıcıyı getirriyor

    const refresh = () => dispatch(fetchUser());
    window.addEventListener("authChanged", refresh);

    return () => window.removeEventListener("authChanged", refresh);
  }, [token, dispatch]);

  // Debug 
  console.log("NAVBAR USER:", user);
  console.log("NAVBAR TOKEN:", token);

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between py-3 px-3 sm:px-6">

        {/* LEFT — Logo + Menü */}
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md"></div>
            <span className="text-xl font-semibold">enoca</span>
          </Link>

          {/* Desktop Menü */}
          <div className="hidden md:flex gap-8 text-gray-600 text-sm font-medium">
            <Link to="/categories" className="hover:text-black flex items-center gap-1">
              Categories <FiChevronDown size={14} />
            </Link>
          </div>
        </div>

        {/* RIGHT — Search + Icons + Login/Logout */}
        <div className="flex items-center gap-3">

          {/* Desktop Search */}
          <div className="hidden lg:flex bg-gray-100 items-center gap-2 px-3 py-2 rounded-lg w-[250px]">
            <FiSearch className="text-gray-500" />
            <input className="bg-transparent outline-none w-full text-sm" placeholder="Search products..." />
          </div>

          {/* Mobile Search */}
          <button className="lg:hidden">
            <FiSearch size={20} />
          </button>

          {/* Icons */}
          <Icon icon={<AiOutlineHeart size={20} />} />
          <Icon icon={<FaShoppingCart size={18} />}>
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] px-1 rounded-full">3</span>
          </Icon>

          {/* Auth UI */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">{user?.firstName}</span>

              <button
                onClick={() => dispatch(logout())}
                className="text-sm text-red-600 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-sm text-blue-600 hover:underline">Login</Link>
          )}

          {/* Hamburger */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menü */}
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

/* Global Icon Component */
function Icon({ icon, children }: any) {
  return (
    <button className="relative w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
      {icon}
      {children}
    </button>
  );
}
