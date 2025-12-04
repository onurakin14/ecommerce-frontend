import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchProducts, clearFilters } from "../store/productSlice";

function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("featured");
  const itemsPerPage = 6;

  // API'den ürünleri yükle
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filtrelenmiş ürünleri hesapla
  const filteredProducts = products.filter((product) => {
    // Arama filtresi
    if (
      searchQuery &&
      !product.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Kategori filtresi
    if (
      selectedCategories.size > 0 &&
      !selectedCategories.has(product.category)
    ) {
      return false;
    }

    // Fiyat filtresi
    if (product.price < minPrice || product.price > maxPrice) {
      return false;
    }

    return true;
  });

  // Pagination hesaplamaları
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Sort uygula
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Sayfa değiştiğinde en üste scroll
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Benzersiz kategorileri al
  const categories = Array.from(new Set(products.map((p) => p.category)));

  const handleCategoryToggle = (category: string) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(category)) {
      newSelected.delete(category);
    } else {
      newSelected.add(category);
    }
    setSelectedCategories(newSelected);
  };

  const handleResetFilters = () => {
    dispatch(clearFilters());
    setMinPrice(0);
    setMaxPrice(1000);
    setSelectedCategories(new Set());
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      {/* Header */}

      <main className="container mx-auto flex-grow px-4 py-8">
        {/* Breadcrumbs and Heading */}
        <div className="mb-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-4xl font-black tracking-tighter">
                Shop All Products
              </p>
              <p className="text-base font-normal text-gray-600">
                Showing {startIndex + 1}-
                {Math.min(endIndex, filteredProducts.length)} of{" "}
                {filteredProducts.length} results
              </p>
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
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

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="space-y-6">
              {/* Categories Accordion */}
              <details className="flex flex-col border-b border-gray-200 group">
                <summary className="flex cursor-pointer items-center justify-between gap-2 py-4 text-lg font-bold">
                  Categories
                  <svg
                    className="w-4 h-4 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="space-y-2 pb-4">
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-x-3 py-1 cursor-pointer"
                    >
                      <input
                        checked={selectedCategories.has(cat)}
                        onChange={() => handleCategoryToggle(cat)}
                        className="h-5 w-5 rounded-lg border-2 border-gray-200 bg-transparent text-indigo-500 accent-indigo-500  focus:ring-offset-0 cursor-pointer"
                        type="checkbox"
                      />
                      <p className="text-base font-normal text-gray-600 capitalize">
                        {cat}
                      </p>
                    </label>
                  ))}
                </div>
              </details>

              {/* Price Accordion */}
              <details className="flex flex-col border-b border-gray-200 group">
                <summary className="flex cursor-pointer items-center justify-between gap-2 py-4 text-lg font-bold">
                  Price
                  <svg
                    className="w-4 h-4 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="pb-4 pt-2">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Min: ${minPrice}</span>
                        <span>Max: ${maxPrice}</span>
                      </div>
                      <div className="relative h-2">
                        {/* Track */}
                        <div className="absolute w-full h-2 bg-gray-200 rounded-full"></div>
                        {/* Active Range */}
                        <div
                          className="absolute h-2 bg-indigo-500 rounded-full"
                          style={{
                            left: `${(minPrice / 1000) * 100}%`,
                            right: `${100 - (maxPrice / 1000) * 100}%`,
                          }}
                        ></div>
                        {/* Min Range Slider */}
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          value={minPrice}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            if (value < maxPrice) {
                              setMinPrice(value);
                              setCurrentPage(1);
                            }
                          }}
                          className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
                        />
                        {/* Max Range Slider */}
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          value={maxPrice}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            if (value > minPrice) {
                              setMaxPrice(value);
                              setCurrentPage(1);
                            }
                          }}
                          className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </details>

              <button
                onClick={handleResetFilters}
                className="w-full rounded-xl bg-indigo-500/20 py-2.5 text-sm font-semibold text-indigo-500 hover:bg-indigo-500/30"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {!loading &&
                currentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-lg"
                  >
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
                ))}

              {/* Skeleton Loader Cards when loading */}
              {loading &&
                [1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="flex animate-pulse flex-col rounded-xl border border-gray-200 bg-white"
                  >
                    <div className="aspect-square w-full bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                      <div className="mt-2 h-5 w-1/4 rounded bg-gray-200"></div>
                      <div className="mt-3 h-4 w-1/2 rounded bg-gray-200"></div>
                    </div>
                  </div>
                ))}
            </div>

            {/* No Products Found */}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-xl">
                  No products found matching your filters.
                </p>
              </div>
            )}

            {/* Pagination */}
            {!loading && filteredProducts.length > 0 && (
              <nav className="mt-12 flex items-center justify-center">
                <ul className="flex items-center -space-x-px text-sm">
                  <li>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                      className="flex h-9 items-center justify-center rounded-l-xl border border-gray-200 bg-white px-3 leading-tight text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    // Sadece ilk 3, son 3 ve mevcut sayfa civarındaki sayfaları göster
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <li key={pageNum}>
                          <button
                            onClick={() => setCurrentPage(pageNum)}
                            className={`flex h-9 items-center justify-center border border-gray-200 px-3 leading-tight ${
                              currentPage === pageNum
                                ? "bg-indigo-500/20 font-semibold text-indigo-500"
                                : "bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {pageNum}
                          </button>
                        </li>
                      );
                    } else if (
                      pageNum === currentPage - 2 ||
                      pageNum === currentPage + 2
                    ) {
                      return (
                        <li key={pageNum}>
                          <span className="flex h-9 items-center justify-center border border-gray-200 bg-white px-3 leading-tight text-gray-600">
                            ...
                          </span>
                        </li>
                      );
                    }
                    return null;
                  })}
                  <li>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="flex h-9 items-center justify-center rounded-r-xl border border-gray-200 bg-white px-3 leading-tight text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductList;
