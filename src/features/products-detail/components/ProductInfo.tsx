import { useState } from "react";
import { ShoppingCart, Minus, Plus, Heart, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../../store/wishlistSlice";
import type { RootState } from "../../../store/store";
import type { Product } from "../../../store/productSlice";
import { useCart } from "../../shopping-cart/CartContext";
import Notification from "./Notification";

interface Props {
  product: Product;
}

export default function ProductInfo({ product }: Props) {
  const dispatch = useDispatch();
  const wishlist = useSelector((s: RootState) => s.wishlist.items);
  const isWishlisted = wishlist.includes(product.id);
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState<number>(1);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "wishlist" | "error";
  } | null>(null);

  const discountedPrice: number = product.discountPercentage
    ? Number((product.price * (1 - product.discountPercentage / 100)).toFixed(2))
    : Number(product.price.toFixed(2));

  function handleAddToCart() {
    addItem({
      id: product.id.toString(),
      name: product.title,
      price: discountedPrice,
      quantity: quantity,
      image: product.thumbnail,
    });
    setNotification({
      message: `${product.title} added to cart!`,
      type: "success",
    });
    setQuantity(1);
  }

  function handleToggleWishlist() {
    dispatch(toggleWishlist(product.id));
    setNotification({
      message: isWishlisted
        ? `${product.title} removed from favorites`
        : `${product.title} added to favorites!`,
      type: "wishlist",
    });
  }

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="flex flex-col gap-6">
        {/* Başlık ve Marka */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            {product.title}
          </h1>
          {product.brand && (
            <p className="text-sm text-gray-500 mt-2 font-medium">
              Marka: {product.brand}
            </p>
          )}
        </div>

        {/* Açıklama */}
        <p className="text-gray-600 text-base leading-relaxed">
          {product.description}
        </p>

        {/* Yıldızlar, Puan ve Stok Durumu */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-4 h-4 ${
                  s <= Math.round(product.rating ?? 0)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 fill-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 font-bold">
            {product.rating?.toFixed(1) ?? "0"}
          </span>
          <span className="text-sm text-gray-400">|</span>
          <span className="text-sm">
            <span
              className={
                (product.stock ?? 0) > 0
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
              }
            >
              {(product.stock ?? 0) > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </span>
        </div>

          {/* Fiyat Bilgisi */}
        <div className="flex items-center gap-4">
          {(product.discountPercentage ?? 0) > 0 ? (
            <div className="flex items-center gap-3">
              <div className="text-4xl font-black text-gray-900">
                ${discountedPrice.toFixed(2)}
              </div>
              <div className="flex flex-col">
                <span className="text-lg text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm font-bold text-red-500">
                  %{(product.discountPercentage ?? 0).toFixed(0)} discount
                </span>
              </div>
            </div>
          ) : (
            <div className="text-4xl font-black text-gray-900">
              ${product.price.toFixed(2)}
            </div>
          )}
        </div>

        {/* Etiketler */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.tags.slice(0, 4).map((tag: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Miktar Seçici */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Amount
          </label>
          <div className="inline-flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-4 py-3 hover:bg-gray-50 disabled:opacity-30 transition"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>

            <div className="px-6 py-3 border-x-2 border-gray-200 font-bold min-w-16 text-center">
              {quantity}
            </div>

            <button
              onClick={() => setQuantity((q) => Math.min(product.stock ?? 0, q + 1))}
              className="px-4 py-3 hover:bg-gray-50 disabled:opacity-30 transition"
              disabled={quantity >= (product.stock ?? 0)}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Aksiyon Butonları */}
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <button
            onClick={handleAddToCart}
            disabled={(product.stock ?? 0) === 0}
            className="flex-1 px-8 py-4 rounded-xl flex items-center justify-center gap-3 text-white font-bold transition-all bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed active:scale-[0.98] shadow-lg shadow-blue-500/20"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>

          <button
            onClick={handleToggleWishlist}
            className="p-4 rounded-xl border-2 border-gray-200 hover:border-red-200 hover:bg-red-50 transition-all active:scale-[0.98]"
          >
            <Heart
              className={`w-6 h-6 transition-colors ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>
      </div>
    </>
  );
}