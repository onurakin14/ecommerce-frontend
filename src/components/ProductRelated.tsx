import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../store/wishlistSlide";
import type { RootState } from "../store/store";
import type { Product } from "../store/productSlice";
import { Heart } from "lucide-react";

const ProductRelated = ({ products }: { products: Product[] }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const isWishlisted = (id: number) => wishlistItems.includes(id);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">You Might Also Like</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative group bg-white rounded-xl shadow-md hover:shadow-lg 
                       transition-all duration-300 cursor-pointer border border-gray-100"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(toggleWishlist(product.id));
              }}
              className="absolute top-3 right-3 z-10"
            >
              <Heart
                className={`w-6 h-6 transition ${
                  isWishlisted(product.id)
                    ? "fill-red-500 stroke-red-500"
                    : "stroke-gray-600 hover:stroke-red-500"
                }`}
              />
            </button>

            {/* PRODUCT IMAGE */}
            <div className="w-full h-60 bg-gray-50 rounded-t-xl overflow-hidden flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-10">
                {product.title}
              </h3>

              <p className="text-lg font-semibold text-gray-900 mt-2">
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRelated;
