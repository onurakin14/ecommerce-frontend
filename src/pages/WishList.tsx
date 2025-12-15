import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../store/wishlistSlide";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store/store";
import type { Product } from "../store/productSlice"

export default function Wishlist() {
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const filtered = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-10">My Wishlist</h1>

      {filtered.length === 0 ? (
        <p className="text-gray-600 text-lg">No items in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition relative cursor-pointer"
            >
              {/* Wishlist button */}
              <button
                onClick={() => dispatch(toggleWishlist(product.id))}
                className="absolute right-3 top-3 text-xl"
              >
                ❤️
              </button>

              {/* Image */}
              <img
                src={product.image}
                alt={product.title}
                onClick={() => navigate(`/product/${product.id}`)}
                className="h-44 mx-auto object-contain"
              />

              {/* Title */}
              <h3 className="mt-3 font-semibold text-sm line-clamp-2">
                {product.title}
              </h3>

              {/* Price */}
              <p className="font-medium mt-2 text-gray-800">
                ${product.price}
              </p>

              {/* Go to product button */}
              <button
                onClick={() => navigate(`/product/${product.id}`)}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm"
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
