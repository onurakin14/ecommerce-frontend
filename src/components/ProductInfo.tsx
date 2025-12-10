import { useState } from "react";
import { Star, ShoppingCart, Minus, Plus, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../store/wishlistSlide";
import type { Product } from "../store/productSlice";
import type { RootState } from "../store/store";

interface Props {
  product: Product;
}

const ProductInfo = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
        {product.title}
      </h1>
      <p className="text-gray-600 text-base leading-relaxed">
        {product.description.slice(0, 150)}...
      </p>
      <div className="flex items-center gap-3">
        {product.rating && (
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(product.rating!.rate)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
        )}
        <span className="text-sm text-gray-600">
          ({product.rating?.count} reviews)
        </span>
      </div>
      <div className="text-4xl sm:text-5xl font-bold text-gray-900">
        ${product.price.toFixed(2)}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>

        <div className="flex items-center border-2 border-gray-300 rounded-lg w-fit overflow-hidden">
          <button
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            className="px-4 py-2 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>

          <span className="px-6 py-2 min-w-[50px] text-center border-x-2 border-gray-200 font-medium">
            {quantity}
          </span>

          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 hover:bg-gray-100 transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={handleAddToCart}
          className={`flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-200 ${
            addedToCart
              ? "bg-green-600 scale-95"
              : "bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95"
          } shadow-lg`}
        >
          <ShoppingCart className="w-5 h-5" />
          {addedToCart ? "Added!" : "Add to Cart"}
        </button>

        {/* FAVORITE BUTTON */}
        <button
          onClick={() => dispatch(toggleWishlist(product.id))}
          className="p-4 rounded-xl border-2 border-gray-300 hover:border-red-500 transition shadow-sm hover:shadow-md"
        >
          <Heart
            className={`w-6 h-6 transition ${
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-400 hover:text-red-500"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
