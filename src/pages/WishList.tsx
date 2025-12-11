import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart, ShoppingBag, Loader2, Star } from "lucide-react";
import type { RootState } from "../store/store";
import type { Product } from "../store/productSlice";
import { toggleWishlist } from "../store/wishlistSlice";

export default function WishlistPage() {
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/products?limit=200")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const filtered = products.filter((p) => wishlist.includes(p.id));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Favoriler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto py-8 sm:py-12 px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-red-500 fill-red-500" />
              Favorilerim
            </h1>
            <p className="text-gray-600 mt-2">
              {filtered.length} ürün listeleniyor
            </p>
          </div>

          <Link
            to="/"
            className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm sm:text-base font-medium"
          >
            Alışverişe Devam
          </Link>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 sm:py-24 bg-white rounded-2xl shadow-sm">
            <ShoppingBag className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
              Favori listeniz boş
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto px-4">
              Beğendiğiniz ürünleri favorilere ekleyerek daha sonra kolayca
              bulabilirsiniz.
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
            >
              Ürünleri Keşfet
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-4 sm:p-5">

                  <div
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="
                      bg-gray-50 rounded-xl overflow-hidden
                      h-44 sm:h-52 flex items-center justify-center cursor-pointer
                      group-hover:scale-105 transition-all duration-300
                    "
                  >
                    <img
                      src={product.images?.[0] || product.thumbnail}
                      alt={product.title}
                      className="w-36 h-36 sm:w-44 sm:h-44 object-contain"
                    />
                  </div>

                  <div
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="mt-4 cursor-pointer"
                  >
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-2 min-h-10 sm:min-h-12">
                      {product.title}
                    </h3>

                    {product.brand && (
                      <p className="text-xs text-gray-500 mt-1">
                        {product.brand}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <p className="font-bold text-lg sm:text-xl text-gray-900">
                          ${product.price}
                        </p>
                        {product.discountPercentage > 0 && (
                          <p className="text-xs text-red-500 font-medium">
                            %{product.discountPercentage.toFixed(0)} indirim
                          </p>
                        )}
                      </div>

                      {product.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
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
                      className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 rounded-xl text-sm font-medium transition active:scale-95"
                    >
                      Ürünü İncele
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
