/**
 * FilterSidebar Component
 *
 * Tüm filtreleri içeren yan menü
 * - CategoryFilter ve PriceFilter componentlerini birleştirir
 * - Reset Filters butonu ile tüm filtreleri temizler
 */

import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";

interface FilterSidebarProps {
  categories: string[];
  selectedCategories: Set<string>;
  minPrice: number;
  maxPrice: number;
  onCategoryToggle: (category: string) => void;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  onResetFilters: () => void;
}

function FilterSidebar({
  categories,
  selectedCategories,
  minPrice,
  maxPrice,
  onCategoryToggle,
  onMinPriceChange,
  onMaxPriceChange,
  onResetFilters,
}: FilterSidebarProps) {
  return (
    <aside className="lg:col-span-1">
      <div className="space-y-6">
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onToggle={onCategoryToggle}
        />
        <PriceFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinChange={onMinPriceChange}
          onMaxChange={onMaxPriceChange}
        />
        <button
          onClick={onResetFilters}
          className="w-full rounded-xl bg-indigo-500/20 py-2.5 text-sm font-semibold text-indigo-500 hover:bg-indigo-500/30"
        >
          Reset Filters
        </button>
      </div>
    </aside>
  );
}

export default FilterSidebar;
