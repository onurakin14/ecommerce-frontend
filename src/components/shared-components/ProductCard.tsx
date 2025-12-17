/**
 * ProductCard Component
 *
 * Tek bir ürünün kart görünümü
 * - Ürün resmi, başlık, fiyat ve rating gösterir
 * - Hover efekti ile resim büyür ve gölgelenir
 * - Add to Cart butonu ile sepete ekleme özelliği
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../store/productSlice";
import { useCart } from "../../features/shopping-cart/CartContext";
import RatingStars from "./RatingStars";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleWishlist } from "../../store/wishlistSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.includes(product.id);

  const isInCart = items.some((item) => item.id === product.id.toString());

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };
  return (
    <div
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-lg cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="aspect-square w-full overflow-hidden bg-white flex items-center justify-center p-4 relative">
        <img
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          alt={product.title}
          src={product.thumbnail}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleWishlist(product.id));
          }}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow opacity-0 group-hover:opacity-100"
        >
          {isInWishlist ? (
            <AiFillHeart className="w-5 h-5 text-red-500" />
          ) : (
            <AiOutlineHeart className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2">
          {product.title}
        </h3>
        {product.discountPercentage && product.discountPercentage > 0 ? (
          <div className="flex flex-col">
            <p className="text-lg font-bold text-indigo-500">
              $
              {(product.price * (1 - product.discountPercentage / 100)).toFixed(
                2
              )}
            </p>
            <p className="text-sm text-gray-400 line-through">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-xs text-red-500 font-medium">
              %{product.discountPercentage.toFixed(0)} indirim
            </p>
          </div>
        ) : (
          <p className="text-lg font-bold text-indigo-500">
            ${product.price.toFixed(2)}
          </p>
        )}
        <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
          <RatingStars id={product.id} rate={product.rating || 0} />
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
