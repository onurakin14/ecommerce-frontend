import type { Product } from "../store/productSlice";

interface Props {
  products: Product[];
}

const ProductRelated = ({ products }: Props) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">
        You Might Also Like
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {products.map((p) => (
          <div key={p.id} className="group flex flex-col gap-2">
            <div
              className="aspect-square bg-cover bg-center rounded-xl border shadow-sm"
              style={{ backgroundImage: `url(${p.image})` }}
            ></div>

            <h3 className="text-sm text-gray-700">{p.title}</h3>
            <p className="font-medium text-gray-900">${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRelated;
