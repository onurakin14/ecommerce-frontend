/**
 * ProductCard Component
 *
 * Tek bir ürünün kart görünümü
 * - Ürün resmi, başlık, fiyat ve rating gösterir
 * - Hover efekti ile resim büyür ve gölgelenir
 * - Add to Cart butonu ile sepete ekleme özelliği
 */

import { useState } from "react";
import type { Product } from "../../../store/productSlice";
import { useCart } from "../../shopping-cart/CartContext";
import RatingStars from "../../../components/RatingStars";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const isInCart = items.some((item) => item.id === product.id.toString());

  const handleAddToCart = async () => {
    if (isInCart) return;

    setIsAdding(true);
    addItem({
      id: product.id.toString(),
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.thumbnail,
    });

    // Loading state'i 1 saniye sonra kaldır
    setTimeout(() => setIsAdding(false), 1000);
  };
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-lg">
      <div className="aspect-square w-full overflow-hidden bg-white flex items-center justify-center p-4">
        <img
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          alt={product.title}
          src={product.thumbnail}
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2">
          {product.title}
        </h3>
        <p className="mt-1 text-lg font-bold text-indigo-500">
          ${product.price.toFixed(2)}
        </p>
        <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
          <RatingStars id={product.id} rate={product.rating} />
          <span className="ml-1">({product.rating})</span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isInCart || isAdding}
          className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            isInCart
              ? "bg-green-100 text-green-700 border border-green-200 cursor-not-allowed"
              : isAdding
              ? "bg-indigo-100 text-indigo-700 border border-indigo-200 cursor-wait"
              : "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800"
          }`}
        >
          {isInCart ? (
            <>
              <span className="material-symbols-outlined text-sm">
                check_circle
              </span>
              Added to Cart
            </>
          ) : isAdding ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              Adding...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-sm">
                add_shopping_cart
              </span>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
