/**
 * ProductHeader Component
 *
 * Sayfa başlığı ve sıralama dropdown'ı
 * - Kaç ürün gösteriliyor bilgisi
 * -  Sort By -- ürünleri sıralama
 */

interface ProductHeaderProps {
  startIndex: number;
  endIndex: number;
  totalResults: number;
  sortBy: string;
  onSortChange: (value: string) => void;
}

function ProductHeader({
  startIndex,
  endIndex,
  totalResults,
  sortBy,
  onSortChange,
}: ProductHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-4xl font-black tracking-tighter">
            Shop All Products
          </p>
          <p className="text-base font-normal text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, totalResults)} of{" "}
            {totalResults} results
          </p>
        </div>
        <div>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ProductHeader;