import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../store/wishlistSlice";
import type { RootState } from "../store/store";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  images?: string[];
  rating?: number;
  discountPercentage?: number;
}

interface ProductRelatedProps {
  products: Product[];
}

export default function ProductRelated({ products }: ProductRelatedProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  const [startIndex, setStartIndex] = useState(0);

  if (!products || products.length === 0) return null;

  const itemsToShow = 4;
  const maxIndex = Math.max(0, products.length - itemsToShow);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - itemsToShow));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxIndex, prev + itemsToShow));
  };

  const visibleProducts = products.slice(startIndex, startIndex + itemsToShow);
  const featuredProducts = visibleProducts.slice(0, 4);

  return (
    <div className="mt-16 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Benzer Ürünler
        </h2>

        {products.length > itemsToShow && (
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className="p-2 rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label="previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={startIndex >= maxIndex}
              className="p-2 rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label="next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {featuredProducts.map((product, index) => {
          const liked = wishlist.includes(product.id);
          const isFeatured = index < 4;

          return (
            <div
              key={product.id}
              className={`
                bg-white rounded-2xl shadow-sm hover:shadow-xl
                transition-all duration-300 group relative overflow-hidden
                ${isFeatured ? "border-2 border-blue-100" : ""}
              `}
            >
              {isFeatured && (
                <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-br-lg z-10">
                  ÖNE ÇIKAN
                </div>
              )}

              <div className="p-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleWishlist(product.id));
                  }}
                  className="absolute z-10 right-4 top-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition"
                >
                  <Heart
                    size={18}
                    className={
                      liked ? "fill-red-500 text-red-500" : "text-gray-500"
                    }
                  />
                </button>

                <div
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="
                    bg-gray-50 rounded-xl overflow-hidden
                    h-44 sm:h-48 flex items-center justify-center cursor-pointer
                    group-hover:scale-105 transition-all duration-300
                  "
                >
                  <img
                    src={product.images?.[0] || product.thumbnail}
                    alt={product.title}
                    className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
                  />
                </div>

                <div
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="mt-4 cursor-pointer"
                >
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2 min-h-10">
                    {product.title}
                  </h3>

                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <p className="text-xl font-bold text-gray-900">
                        ${product.price}
                      </p>
                      {product.discountPercentage && product.discountPercentage > 0 && (
                        <p className="text-xs text-red-500 font-medium">
                          %{product.discountPercentage.toFixed(0)} indirim
                        </p>
                      )}
                    </div>

                    {product.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-700">
                          {product.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {products.length > itemsToShow && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: Math.ceil(products.length / itemsToShow) }).map(
            (_, i) => (
              <button
                key={i}
                onClick={() => setStartIndex(i * itemsToShow)}
                className={`w-2 h-2 rounded-full transition ${
                  Math.floor(startIndex / itemsToShow) === i
                    ? "bg-blue-600 w-8"
                    : "bg-gray-300"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
