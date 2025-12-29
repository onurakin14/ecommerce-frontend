import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";

import type { RootState } from "../store/store";
import type { Product } from "../store/productSlice";

export default function WishlistPage() {
  /* ---------------- REDUX ---------------- */
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const navigate = useNavigate();

  /* ---------------- STATE ---------------- */
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [compareMode, setCompareMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    setLoading(true);

    fetch("https://dummyjson.com/products?limit=200")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .finally(() => setLoading(false));
  }, []);

  /* ---------------- FILTER ---------------- */
  const filtered = products.filter((p) => wishlist.includes(p.id));

  /* ---------------- COMPARE ---------------- */
  const toggleSelect = (id: number) => {
    if (!compareMode) return;

    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length === 3) return prev;
      return [...prev, id];
    });
  };

  const goToCompare = () => {
    if (selectedIds.length >= 2) {
      navigate("/compare", { state: { selectedIds } });
    }
  };

  /* ---------------- LOADING (SKELETON) ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 animate-pulse"
            >
              <div className="h-44 bg-gray-200 rounded-xl mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
              <div className="h-10 bg-gray-200 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Heart className="text-red-500 fill-red-500" />
              Favorilerim
            </h1>
            <p className="text-gray-500 mt-1">{filtered.length} ürün</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {!compareMode ? (
              <button
                onClick={() => setCompareMode(true)}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
              >
                Ürün Karşılaştır
              </button>
            ) : (
              <>
                <button
                  disabled={selectedIds.length < 2}
                  onClick={goToCompare}
                  className={`px-6 py-3 rounded-xl
                    ${
                      selectedIds.length < 2
                        ? "bg-gray-300 text-gray-500"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                >
                  Karşılaştır ({selectedIds.length}/3)
                </button>

                <button
                  onClick={() => {
                    setCompareMode(false);
                    setSelectedIds([]);
                  }}
                  className="px-6 py-3 bg-white border rounded-xl"
                >
                  İptal
                </button>
              </>
            )}

            <Link
              to="/products"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              Alışverişe Devam
            </Link>
          </div>
        </div>

        {/* EMPTY */}
        {filtered.length === 0 && (
          <div className="text-center py-24 bg-white rounded-2xl">
            <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold mb-3">
              Favori listeniz boş
            </h2>
            <Link
              to="/products"
              className="px-8 py-3 bg-blue-600 text-white rounded-xl"
            >
              Ürünleri Keşfet
            </Link>
          </div>
        )}

        {/* GRID */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => {
              const isSelected = selectedIds.includes(product.id);
              const isDisabled =
                compareMode &&
                selectedIds.length === 3 &&
                !isSelected;

              const hasDiscount =
                (product.discountPercentage ?? 0) > 0;

              return (
                <div
                  key={product.id}
                  onClick={() => toggleSelect(product.id)}
                  className={`bg-white rounded-2xl p-4 flex flex-col border-2 transition
                    ${compareMode ? "cursor-pointer" : ""}
                    ${isSelected ? "border-purple-600 bg-purple-50" : "border-transparent hover:shadow-lg"}
                    ${isDisabled ? "opacity-40 pointer-events-none" : ""}
                  `}
                >
                  <div className="h-44 bg-gray-50 rounded-xl flex items-center justify-center">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-32 object-contain"
                    />
                  </div>

                  <div className="mt-4 flex-1">
                    <h3 className="font-semibold text-sm line-clamp-2">
                      {product.title}
                    </h3>

                    <p className="font-bold text-lg mt-2">
                      ${product.price}
                    </p>

                    {/* 🔴 SADECE BURADA İNDİRİM */}
                    {hasDiscount && (
                      <p className="text-xs text-red-500 font-medium">
                        %{product.discountPercentage!.toFixed(0)} indirim
                      </p>
                    )}

                    {product.rating && (
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">
                          {product.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                    className="mt-4 w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  >
                    Ürünü İncele
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}