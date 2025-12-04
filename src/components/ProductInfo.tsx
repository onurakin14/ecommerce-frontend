import type { Product } from "../store/productSlice";

interface Props {
  product: Product;
}

const ProductInfo = ({ product }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <h1 className="text-4xl font-semibold text-gray-900">{product.title}</h1>

      {/* Short Description */}
      <p className="text-gray-600 text-sm leading-relaxed max-w-md">
        {product.description.slice(0, 120)}...
      </p>

      {/* Rating */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        ⭐ {product.rating?.rate} / 5
        <span className="text-gray-400">({product.rating?.count} reviews)</span>
      </div>

      {/* Price */}
      <p className="text-4xl font-bold text-gray-900">${product.price}</p>

      {/* Quantity */}
      <div>
        <p className="text-sm mb-2 text-gray-700">Quantity</p>
        <div className="flex items-center border rounded-lg w-fit">
          <button className="px-3 py-2 hover:bg-gray-100">-</button>
          <span className="px-5">1</span>
          <button className="px-3 py-2 hover:bg-gray-100">+</button>
        </div>
      </div>

      {/* Add to Cart */}
      <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-center font-medium transition">
        🛒 Add to Cart
      </button>
    </div>
  );
};

export default ProductInfo;
