import { useState } from "react";

interface Props {
  image: string;
}

const ProductGallery = ({ image }: Props) => {
  const [selected, setSelected] = useState(0);
  const thumbnails = [image, image, image, image];

  return (
    <div>
      <div className="w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-md">
        <img
          src={thumbnails[selected]}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-4 gap-3 mt-4">
        {thumbnails.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`aspect-square rounded-xl overflow-hidden border-2 ${
              selected === i
                ? "border-blue-600 scale-105"
                : "border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100"
            } transition`}
          >
            <img src={img} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
