import { useState } from 'react';
import { Star, ShoppingCart, Minus, Plus } from 'lucide-react';
import type { Product } from "../store/productSlice";

interface Props {
  product: Product;
}

const ProductInfo = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const renderStars = (rate: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.round(rate)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-gray-900 leading-tight">
        {product.title}
      </h1>

      <p className="text-gray-600 text-base leading-relaxed">
        {product.description.slice(0, 150)}...
      </p>

      <div className="flex items-center gap-3">
        {product.rating && renderStars(product.rating.rate)}
        <span className="text-sm text-gray-600">
          ({product.rating?.count} reviews)
        </span>
      </div>

      <div className="text-5xl font-bold text-gray-900">
        ${product.price.toFixed(2)}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Quantity
        </label>
        <div className="flex items-center border-2 border-gray-300 rounded-lg w-fit overflow-hidden">
          <button
            onClick={handleDecrement}
            className="px-4 py-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-6 py-2 font-medium min-w-[60px] text-center border-x-2 border-gray-300">
            {quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="px-4 py-2 hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className={`mt-4 flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-200 transform ${
          addedToCart
            ? "bg-green-600 scale-95"
            : "bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95"
        } shadow-lg hover:shadow-xl`}
      >
        <ShoppingCart className="w-5 h-5" />
        {addedToCart ? "Added to Cart!" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductInfo;
