interface Props {
  description: string;
}

const ProductTabs = ({ description }: Props) => {
  return (
    <div>
      {/* Tabs */}
      <div className="border-b flex gap-8 text-sm">
        <button className="border-b-2 border-indigo-600 py-3 font-medium text-indigo-600">
          Description
        </button>
        <button className="py-3 text-gray-500">Reviews</button>
        <button className="py-3 text-gray-500">Specifications</button>
      </div>

      {/* Content */}
      <p className="mt-6 text-gray-600 leading-relaxed max-w-3xl">
        {description}
      </p>
    </div>
  );
};

export default ProductTabs;
