import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart, Loader2 } from "lucide-react"; 
import type { RootState } from "../store/store";
import type { Product } from "../store/productSlice";

export default function WishlistPage() {
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [compareMode, setCompareMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=200")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  const filtered = products.filter((p) => wishlist.includes(p.id));

  const toggleSelect = (id: number) => {
    if (!compareMode) return;

    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length === 3) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const goToCompare = () => {
    navigate("/compare", {
      state: { selectedIds },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-10 px-4">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Heart className="text-red-500 fill-red-500" />
              Favorilerim
            </h1>
            <p className="text-gray-500 mt-1">
              {filtered.length} ürün
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {!compareMode ? (
              <button
                onClick={() => setCompareMode(true)}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
              >
                Ürün Karşılaştır
              </button>
            ) : (
              <>
                <button
                  disabled={selectedIds.length < 2}
                  onClick={goToCompare}
                  className={`
                    px-6 py-3 rounded-xl font-medium transition
                    ${selectedIds.length < 2
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-purple-600 text-white hover:bg-purple-700"}
                  `}
                >
                  Karşılaştır ({selectedIds.length}/3)
                </button>

                <button
                  onClick={() => {
                    setCompareMode(false);
                    setSelectedIds([]);
                  }}
                  className="px-6 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition"
                >
                  İptal
                </button>
              </>
            )}

            <Link
              to="/products"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Alışverişe Devam
            </Link>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => {
            const isSelected = selectedIds.includes(product.id);
            const isDisabled = compareMode && selectedIds.length === 3 && !isSelected;

            return (
              <div
                key={product.id}
                onClick={() => toggleSelect(product.id)}
                className={`
                  relative bg-white rounded-2xl p-4 transition flex flex-col border-2
                  ${compareMode ? "cursor-pointer" : "cursor-default"}
                  ${isSelected ? "border-purple-600 bg-purple-50" : "border-transparent hover:shadow-md"}
                  ${isDisabled ? "opacity-40 pointer-events-none" : ""}
                `}
              >
                {compareMode && (
                  <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition
                    ${isSelected ? "bg-purple-600 border-purple-600 text-white" : "bg-white border-gray-300"}`}>
                    {isSelected && <span className="text-xs font-bold">✓</span>}
                  </div>
                )}

                <div className="h-44 flex items-center justify-center bg-gray-50 rounded-xl">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-32 object-contain"
                  />
                </div>

                <div className="mt-4 grow">
                  <h3 className="font-semibold text-sm line-clamp-2 min-h-10">
                    {product.title}
                  </h3>
                  <p className="font-bold text-xl mt-2 text-gray-900">
                    ${product.price}
                  </p>
                </div>

                {/* ÜRÜNÜ İNCELE BUTONU (Mavi Renkli ve İkonsuz) */}
                <Link
                  to={`/product/${product.id}`}
                  onClick={(e) => e.stopPropagation()} 
                  className="mt-4 w-full py-3 bg-blue-600 text-white rounded-xl font-semibold text-center hover:bg-blue-700 transition shadow-sm active:scale-[0.98]"
                >
                  Ürünü İncele
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}