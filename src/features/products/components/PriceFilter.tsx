/**
 * PriceFilter Component
 *
 * Fiyat aralığı filtreleme accordion'ı
 * - Dual-range slider ile min ve max fiyat seçimi
 * - Slider değiştirildiğinde anlık filtreler
 * - 0-1000 aralığında çalışır
 */

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

function PriceFilter({
  minPrice,
  maxPrice,
  maxValue,
  onMinChange,
  onMaxChange,
}: PriceFilterProps) {
  return (
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
                  left: `${(minPrice / maxValue) * 100}%`,
                  right: `${100 - (maxPrice / maxValue) * 100}%`,
                }}
              ></div>
              {/* Min Range Slider */}
              <input
                type="range"
                min="0"
                max={maxValue}
                value={minPrice}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value < maxPrice) {
                    onMinChange(value);
                  }
                }}
                className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
              />
              {/* Max Range Slider */}
              <input
                type="range"
                min="0"
                max={maxValue}
                value={maxPrice}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value > minPrice) {
                    onMaxChange(value);
                  }
                }}
                className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </details>
  );
}

export default PriceFilter;
