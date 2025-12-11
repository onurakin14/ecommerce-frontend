import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b border-gray-200 bg-white">

      <div className="w-full flex items-center justify-between py-3">

        {/* LEFT */}
        <div className="flex items-center gap-8 md:gap-10 pl-0">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 pl-2 md:pl-4">
            <div className="w-8 h-8 bg-blue-600 rounded-md"></div>
            <span className="text-xl md:text-2xl font-semibold">enoca</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium text-sm">
            <Link to="/categories" className="hover:text-black flex items-center gap-1">
              Categories <FiChevronDown size={14}/>
            </Link>
            <Link to="/deals" className="hover:text-black">Deals</Link>
            <Link to="/new-arrivals" className="hover:text-black">New Arrivals</Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 md:gap-4 pr-2 md:pr-4">

          {/* Search desktop */}
          <div className="
            hidden lg:flex items-center bg-gray-100 px-3 py-2 rounded-lg gap-2
            w-[220px] md:w-[300px] xl:w-[380px] 2xl:w-[460px]
          ">
            <FiSearch className="text-gray-500"/>
            <input placeholder="Search products..." className="w-full outline-none bg-transparent text-sm"/>
          </div>

          {/* Mobile Search */}
          <button className="lg:hidden text-gray-600">
            <FiSearch size={22}/>
          </button>

          {/* Icons */}
          <Icon icon={<AiOutlineHeart size={20}/>}/>
          <Icon icon={<FaShoppingCart size={18}/>}>
            <span className="absolute -top-[6px] -right-[6px] bg-blue-600 text-white text-[10px] px-[6px] rounded-full">3</span>
          </Icon>

          {/* Avatar */}
          <div className="hidden md:block w-9 h-9 rounded-full overflow-hidden hover:ring-2 ring-blue-600 cursor-pointer">
            <img src="https://i.pravatar.cc/100" className="w-full h-full object-cover"/>
          </div>

          {/* Mobile menu */}
          <button onClick={() => setOpen(!open)} className="md:hidden">
            {open ? <FiX size={26}/> : <FiMenu size={26}/>}
          </button>
        </div>
      </div>

      {open && (
  <div className="md:hidden flex flex-col px-4 pb-4 gap-3 text-gray-700 text-[15px] font-medium border-t border-gray-200">
    <Link to="/" onClick={() => setOpen(false)}>Home</Link>
    <Link to="/categories" onClick={() => setOpen(false)}>Categories</Link>
    <Link to="/deals" onClick={() => setOpen(false)}>Deals</Link>
    <Link to="/new-arrivals" onClick={() => setOpen(false)}>New Arrivals</Link>
  </div>
)}

    </nav>
  );
}

const Icon = ({ children, icon }: any) => (
  <button className="relative w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
    {icon}
    {children}
  </button>
);
