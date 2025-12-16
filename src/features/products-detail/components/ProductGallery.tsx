import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
}

export default function ProductGallery({ images }: Props) {
  const [selected, setSelected] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-50 rounded-xl flex items-center justify-center">
        <span className="text-gray-400">No images</span>
      </div>
    );
  }

  const handlePrev = () => {
    setSelected((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelected((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full h-96 bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center shadow-sm group">
        <img
          src={images[selected]}
          alt={`product-${selected}`}
          className="w-full h-full object-contain p-4"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"
              aria-label="previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"
              aria-label="next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`h-16 sm:h-20 rounded-xl overflow-hidden border-2 transition-all focus:outline-none ${
              i === selected
                ? "border-blue-600 scale-105 shadow-md"
                : "border-transparent hover:border-gray-300"
            }`}
            aria-label={`select-image-${i}`}
          >
            <img src={img} className="w-full h-full object-contain p-1" alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}
