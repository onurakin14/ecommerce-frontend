/**
 * ProductCard Component
 *
 * Tek bir ürünün kart görünümü
 * - Ürün resmi, başlık, fiyat ve rating gösterir
 * - Hover efekti ile resim büyür ve gölgelenir
 */

import type { Product } from "../../../store/productSlice";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-lg">
      <div className="aspect-square w-full overflow-hidden bg-white flex items-center justify-center p-4">
        <img
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          alt={product.title}
          src={product.image}
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
          <span className="text-yellow-400">★</span>
          <span className="text-yellow-400">★</span>
          <span className="text-yellow-400">★</span>
          <span className="text-yellow-400">★</span>
          <span className="text-gray-300">★</span>
          <span className="ml-1">({product.rating.count})</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
