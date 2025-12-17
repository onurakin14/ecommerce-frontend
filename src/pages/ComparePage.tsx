import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../store/productSlice";
import { fetchProducts } from "../store/productSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function ComparePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { list: products, loading } = useAppSelector(
    state => state.product
  );

  const [selected, setSelected] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const selectedIds = useMemo(
    () => new Set(selected.map(p => p.id)),
    [selected]
  );

  const toggleProduct = (product: Product) => {
    const exists = selectedIds.has(product.id);

    if (exists) {
      setSelected(prev => prev.filter(p => p.id !== product.id));
      return;
    }

    if (selected.length < 3) {
      setSelected(prev => [...prev, product]);
    }
  };

  const goToCompare = () => {
    if (selected.length < 2) return;

    navigate("/compare/result", {
      state: { products: selected },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8 pb-32">
      <h1 className="text-2xl font-bold mb-2">Ürün Karşılaştır</h1>

      <p className="text-gray-600 mb-6">
        Karşılaştırmak için ürün seçin <b>(max 3)</b>
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map(product => {
          const active = selectedIds.has(product.id);
          const disabled = !active && selected.length === 3;

          return (
            <button
              key={product.id}
              onClick={() => toggleProduct(product)}
              disabled={disabled}
              title={disabled ? "En fazla 3 ürün seçebilirsiniz" : ""}
              className={`relative border rounded-xl p-3 text-left transition
                ${active
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200 bg-white hover:border-gray-400"}
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {active && (
                <span className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
                  Seçildi
                </span>
              )}

              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-24 w-full object-contain mb-2"
              />

              <p className="text-sm font-medium line-clamp-2">
                {product.title}
              </p>

              <p className="text-indigo-600 font-semibold mt-1">
                ${product.price}
              </p>
            </button>
          );
        })}
      </div>

      {/* STICKY BAR */}
      {selected.length >= 2 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <p className="font-medium">
                {selected.length} ürün seçildi
              </p>
              <p className="text-xs text-gray-500">
                {selected.map(p => p.title).join(" • ")}
              </p>
            </div>

            <button
              onClick={goToCompare}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
            >
              Karşılaştır
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
