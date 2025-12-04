interface Props {
  image: string;
}

const ProductGallery = ({ image }: Props) => {
  const thumbnails = [image, image, image, image];

  return (
    <div>
      {/* Main Image */}
      <div
        className="w-full aspect-square bg-cover bg-center rounded-2xl shadow-sm border"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        {thumbnails.map((img, i) => (
          <div
            key={i}
            className={`aspect-square bg-cover bg-center rounded-xl border cursor-pointer hover:opacity-100 transition ${
              i === 0 ? "opacity-100 border-blue-500 border-2" : "opacity-50"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
