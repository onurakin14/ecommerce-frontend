import { useState } from 'react';

interface Props {
  image: string;
}

const ProductGallery = ({ image }: Props) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const thumbnails = [image, image, image, image];

  return (
    <div>
      <div className="w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
        <img
          src={thumbnails[selectedImage]}
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-4 gap-3 mt-4">
        {thumbnails.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(i)}
            className={`aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
              i === selectedImage
                ? "border-blue-600 ring-2 ring-blue-200 scale-105"
                : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
