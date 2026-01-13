import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { X, Plus, Star } from "lucide-react";

// TİPLER VE REDUX
import type { RootState } from "../store/store";
import type { Product } from "../store/productSlice";
import { useCart } from "../features/shopping-cart/CartContext";
import Notification from "../features/products-detail/components/Notification";

const FEATURES = [
  {
    label: "Rating",
    getValue: (p: Product) => `${p.rating} / 5`
  },
  {
    label: "Stock",
    getValue: (p: Product) => `${p.stock} available`
  },
  {
    label: "Brand",
    getValue: (p: Product) => p.brand ?? "—"
  },
  {
    label: "Return Policy",
    getValue: (p: Product) => p.returnPolicy ?? "—"
  }
];

export default function ComparePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const wishlistIds = useSelector((state: RootState) => state.wishlist.items);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [favProducts, setFavProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "wishlist" | "error" } | null>(null);

  const [selectedIds, setSelectedIds] = useState<number[]>(() => {
    const stateIds = location.state?.selectedIds;
    if (stateIds) {
      localStorage.setItem("compare_cache", JSON.stringify(stateIds));
      return stateIds;
    }
    const cache = localStorage.getItem("compare_cache");
    return cache ? JSON.parse(cache) : [];
  });

  useEffect(() => {
    if (selectedIds.length === 0) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const fetchPromises = selectedIds.map(id => 
      fetch(`https://dummyjson.com/products/${id}`).then(res => res.json())
    );
    Promise.all(fetchPromises)
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedIds]);

  useEffect(() => {
    if (wishlistIds.length === 0) {
      setFavProducts([]);
      return;
    }
    const fetchFavs = wishlistIds.map(id => 
      fetch(`https://dummyjson.com/products/${id}`).then(res => res.json())
    );
    Promise.all(fetchFavs)
      .then(data => setFavProducts(data))
      .catch(err => console.error("Favorites could not be loaded:", err));
  }, [wishlistIds]);

  const handleAddToCart = (product: Product) => {
    const discountedPrice = product.discountPercentage
      ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
      : product.price.toString();

    addItem({
      id: product.id.toString(),
      name: product.title,
      price: parseFloat(discountedPrice),
      quantity: 1,
      image: product.thumbnail,
    });
    setNotification({ message: `${product.title} added to cart!`, type: "success" });
  };

  const removeProduct = (id: number) => {
    const next = selectedIds.filter(i => i !== id);
    setSelectedIds(next);
    localStorage.setItem("compare_cache", JSON.stringify(next));
    if (next.length === 0) navigate("/");
  };

  const availableToCompare = favProducts.filter(p => !selectedIds.includes(p.id));

  if (loading) return <div className="p-20 text-center font-bold text-[#6467f2]">Loading Comparison...</div>;

  return (
    <div className="max-w-[1400px] mx-auto py-12 px-6 sm:px-12 bg-[#f6f6f8] min-h-screen font-sans text-gray-900">
      {notification && (
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
      )}

      <div className="flex justify-between items-center mb-12">
        <h1 className="text-[40px] font-black tracking-tight">Compare Products</h1>
        <button onClick={() => navigate("/")} className="text-gray-500 hover:text-black font-bold text-sm transition-colors">← Back to Shop</button>
      </div>

      <div className="overflow-x-auto pb-10">
        <table className="w-full border-collapse min-w-[1000px] table-fixed">
          <thead>
            <tr>
              <th className="text-left align-bottom pb-12 font-bold text-gray-400 text-xs uppercase tracking-widest w-48">Features</th>
              
              {products.map(product => (
                <th key={product.id} className="px-4 pb-12 text-left align-top">
                  <div className="flex flex-col h-full">
                    {/* Ürün Görseli */}
                    <div className="relative aspect-4/3 bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 mb-6 group">
                      <img src={product.thumbnail} className="w-full h-full object-contain p-6 transition-transform duration-300 group-hover:scale-105" alt={product.title} />
                      <button 
                        onClick={() => removeProduct(product.id)}
                        className="absolute top-4 right-4 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors"
                      >
                        <X size={16} className="text-gray-500" />
                      </button>
                    </div>

                    {/* Ürün Bilgileri */}
                    <div className="flex flex-col grow">
                      <h3 className="text-xl font-extrabold text-gray-900 line-clamp-2 leading-tight min-h-14">
                        {product.title}
                      </h3>
                      
                      <div className="flex items-center gap-1 mt-2 mb-3">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={16} className={s <= Math.round(product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
                        ))}
                        <span className="text-sm text-gray-400 font-bold ml-1">{product.rating}</span>
                      </div>

                      <div className="text-2xl font-black text-gray-900 mt-auto">
                        ${product.price}
                      </div>
                    </div>
                  </div>
                </th>
              ))}

              {/* Boş Kart Slotu */}
              {products.length < 4 && (
                <th className="px-4 pb-12 align-top">
                  <div className="border-2 border-dashed border-gray-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center gap-4 h-[340px] bg-white/40">
                    <div className="space-y-1">
                      <p className="font-black text-gray-900 text-lg">Add Another Product</p>
                      <p className="text-xs text-gray-400 font-medium px-4">From your favorites list</p>
                    </div>
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-xl text-sm transition-all active:scale-95"
                    >
                      Add Product
                    </button>
                  </div>
                </th>
              )}

              {/* Tabloyu 4 sütuna tamamlamak için hayalet hücreler */}
              {Array.from({ length: Math.max(0, 3 - products.length) }).map((_, i) => (
                <th key={`empty-${i}`} className="px-4 pb-12 w-72"></th>
              ))}
            </tr>
          </thead>

          <tbody className="text-sm">
            {FEATURES.map((feature, idx) => (
              <tr key={feature.label} className={`${idx % 2 === 0 ? "bg-white/60" : "bg-transparent"} transition-colors hover:bg-white/80`}>
                <td className="py-7 px-6 font-bold text-gray-800 border-b border-gray-100/50">{feature.label}</td>
                {products.map(p => (
                  <td key={p.id} className="py-7 px-6 text-gray-600 border-b border-gray-100/50 font-medium">
                    {feature.getValue(p)}
                  </td>
                ))}
                {/* Boş sütunları doldur */}
                {Array.from({ length: 4 - products.length }).map((_, i) => (
                  <td key={`td-empty-${i}`} className="border-b border-gray-100/50"></td>
                ))}
              </tr>
            ))}
            
            {/* Alt Butonlar */}
            <tr>
              <td></td>
              {products.map(product => (
                <td key={product.id} className="py-12 px-4">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-[#6467f2] hover:bg-[#5356d4] text-white h-12 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                  >
                    Add to Cart
                  </button>
                </td>
              ))}
              {Array.from({ length: 4 - products.length }).map((_, i) => (
                <td key={`btn-empty-${i}`}></td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* MODAL - FAVORİLER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl transform animate-in zoom-in-95 duration-200">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-2xl font-black text-gray-900">Your Favorites</h2>
               <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black">
                <X size={20}/>
               </button>
             </div>
             
             <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
               {availableToCompare.length > 0 ? (
                 availableToCompare.map(item => (
                   <div 
                     key={item.id}
                     onClick={() => {
                       setSelectedIds(prev => {
                         const updated = [...prev, item.id];
                         localStorage.setItem("compare_cache", JSON.stringify(updated));
                         return updated;
                       });
                       setIsModalOpen(false);
                     }}
                     className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:border-[#6467f2] hover:bg-[#6467f2]/5 cursor-pointer transition-all group"
                   >
                     <div className="size-16 bg-gray-50 rounded-xl overflow-hidden p-2 shrink-0 ">
                        <img src={item.thumbnail} className="w-full h-full object-contain" alt={item.title} />
                     </div>
                     <div className="flex-1 min-w-0">
                       <p className="font-bold text-sm text-gray-900 truncate">{item.title}</p>
                       <p className="text-[#6467f2] font-black text-sm mt-0.5">${item.price}</p>
                     </div>
                     <Plus size={20} className="text-gray-300 group-hover:text-[#6467f2] transition-colors" />
                   </div>
                 ))
               ) : (
                 <div className="text-center py-10 px-6">
                   <p className="text-gray-900 font-bold mb-1">No products to add</p>
                   <p className="text-xs text-gray-400 font-medium">Add products to your favorites first to compare them here.</p>
                 </div>
               )}
             </div>
          </div>
        </div>
      )}
    </div>
  );
}