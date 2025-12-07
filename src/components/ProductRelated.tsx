import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import type { Product } from "../store/productSlice";

interface Props {
  products: Product[];
}

const ProductRelated = ({ products }: Props) => {
  const navigate = useNavigate();

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        You Might Also Like
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <button
            key={p.id}
            onClick={() => handleProductClick(p.id)}
            className="group flex flex-col gap-3 text-left transition-transform hover:scale-105 duration-200"
          >
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow border border-gray-200">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm text-gray-700 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {p.title}
              </h3>

              {p.rating && (
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 ${
                        star <= Math.round(p.rating!.rate)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              )}

              <p className="font-bold text-gray-900 text-lg">
                ${p.price.toFixed(2)}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductRelated;
