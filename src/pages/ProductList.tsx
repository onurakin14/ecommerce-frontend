/**
 * ProductList Sayfası
 *
 * Bu sayfa tüm ürünleri listeler ve kullanıcıların filtreleme yapmasını sağlar.
 * - FakeStore API'den ürünleri çeker
 * - Kategori, fiyat ve arama filtreleri sunar
 * - Sıralama (fiyat, yenilik) desteği vardır
 * - Sayfalama ile sayfa başına 6 ürün gösterir
 */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchProducts, clearFilters } from "../store/productSlice";
import ProductHeader from "../features/products/components/ProductHeader";
import FilterSidebar from "../features/products/components/FilterSidebar";
import ProductGrid from "../features/products/components/ProductGrid";
import Pagination from "../features/products/components/Pagination";

function ProductList() {
  // Redux store'dan ürünleri ve yükleme durumunu al
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  // Filtre ve sayfa state'leri
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("featured");
  const itemsPerPage = 6;

  // Sayfa yüklenince ürünleri API'den çek
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Ürünleri filtreleme: arama, kategori ve fiyat filtrelerini uygula
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

  // Sayfalama hesaplamaları: kaç sayfa olacağını ve mevcut sayfadaki ürünleri hesapla
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Sıralama uygula: fiyata veya yeniliğe göre sırala
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

  // Mevcut sayfada gösterilecek ürünleri al
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Sayfa değiştiğinde sayfanın başına kaydır
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Tüm ürünlerden benzersiz kategorileri çıkar
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Kategori seçildiğinde/seçim kaldırıldığında çalışır
  const handleCategoryToggle = (category: string) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(category)) {
      newSelected.delete(category);
    } else {
      newSelected.add(category);
    }
    setSelectedCategories(newSelected);
    setCurrentPage(1); // Filtre değişince ilk sayfaya dön
  };

  // Minimum fiyat değiştiğinde çalışır
  const handleMinPriceChange = (value: number) => {
    setMinPrice(value);
    setCurrentPage(1); // Filtre değişince ilk sayfaya dön
  };

  // Maksimum fiyat değiştiğinde çalışır
  const handleMaxPriceChange = (value: number) => {
    setMaxPrice(value);
    setCurrentPage(1); // Filtre değişince ilk sayfaya dön
  };

  // Tüm filtreleri sıfırla ve varsayılan değerlere dön
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
      <main className="container mx-auto flex-grow px-4 py-8">
        <ProductHeader
          startIndex={startIndex}
          endIndex={endIndex}
          totalResults={filteredProducts.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <FilterSidebar
            categories={categories}
            selectedCategories={selectedCategories}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onCategoryToggle={handleCategoryToggle}
            onMinPriceChange={handleMinPriceChange}
            onMaxPriceChange={handleMaxPriceChange}
            onResetFilters={handleResetFilters}
          />

          <div className="lg:col-span-3">
            <ProductGrid products={currentProducts} loading={loading} />

            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-xl">
                  No products found matching your filters.
                </p>
              </div>
            )}

            {!loading && filteredProducts.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductList;
