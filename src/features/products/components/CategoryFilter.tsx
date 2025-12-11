/**
 * CategoryFilter Component
 *
 * Kategori filtreleme accordion'ı
 * - Tüm kategorileri checkbox olarak listeler
 * - Kullanıcı birden fazla kategori seçebilir
 */

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: Set<string>;
  onToggle: (category: string) => void;
}

function CategoryFilter({
  categories,
  selectedCategories,
  onToggle,
}: CategoryFilterProps) {
  return (
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
              onChange={() => onToggle(cat)}
              className="h-5 w-5 rounded border-2 border-gray-200 bg-transparent text-indigo-500 accent-indigo-500 focus:ring-0 focus:ring-offset-0 checked:border-indigo-500 checked:bg-indigo-500 cursor-pointer"
              type="checkbox"
            />
            <p className="text-base font-normal text-gray-600 capitalize">
              {cat}
            </p>
          </label>
        ))}
      </div>
    </details>
  );
}

export default CategoryFilter;
