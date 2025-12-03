import { FiSearch, FiChevronDown } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";

const Navbar = () => {
  return (
    <nav className="w-full border-b border-gray-300 bg-gray-50 px-6 py-4 flex items-center justify-between">
      
      {/* Sol taraf: Logo + enoca + Menü */}
      <div className="flex items-center gap-8">

        {/* Logo + enoca */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0000ff] rounded-md"></div>
          <span className="text-2xl font-semibold leading-none translate-y-[-3px]">
            enoca
          </span>
        </div>

        {/* Menü */}
        <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium text-sm ml-4">
          
          <button className="hover:text-black transition flex items-center gap-1">
            Categories
            <FiChevronDown size={14} className="mt-[2px]" />
          </button>

          <button className="hover:text-black transition">
            Deals
          </button>

          <button className="hover:text-black transition">
            New Arrivals
          </button>

        </div>
      </div>

      {/* Sağ taraf: Arama + Favori + Sepet + Profil */}
      <div className="flex items-center gap-4">

        {/* Arama Kutusu */}
        <div className="hidden md:flex items-center bg-gray-200 px-4 py-2 rounded-lg gap-2 w-[400px]">
          <FiSearch size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        {/* Favoriler */}
        <div className="w-10 h-10 bg-gray-200 hover:bg-gray-300 cursor-pointer 
                        rounded-full flex items-center justify-center transition">
          <AiOutlineHeart size={22} className="text-gray-700" />
        </div>

        {/* Sepet */}
        <div className="relative w-10 h-10 bg-gray-200 hover:bg-gray-300 cursor-pointer 
                        rounded-full flex items-center justify-center transition">
          <FaShoppingCart size={20} className="text-gray-700" />
          <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-xs 
                           px-1.5 py-0.5 rounded-full">
            3
          </span>
        </div>

        {/* Profil Avatarı */}
        <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
          <img
            src="https://i.pravatar.cc/100"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
