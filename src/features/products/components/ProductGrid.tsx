/**
 * ProductGrid Component
 *
 * Ürünlerin grid layout'ı
 * - Yüklenme sırasında skeleton loader
 * - Responsive: mobil 1, tablet 2, pc 3 sütun
 * - Her ürün için ProductCard'ı renderlar
 */

import type { Product } from "../../../store/productSlice";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

function ProductGrid({ products, loading }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {!loading &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

      {loading && [1, 2, 3, 4, 5, 6].map((i) => <ProductSkeleton key={i} />)}
    </div>
  );
}

export default ProductGrid;
