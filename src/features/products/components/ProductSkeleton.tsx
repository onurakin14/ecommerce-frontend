/**
 * ProductSkeleton Component

 */

function ProductSkeleton() {
  return (
    <div className="flex animate-pulse flex-col rounded-xl border border-gray-200 bg-white">
      <div className="aspect-square w-full bg-gray-200"></div>
      <div className="p-4">
        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
        <div className="mt-2 h-5 w-1/4 rounded bg-gray-200"></div>
        <div className="mt-3 h-4 w-1/2 rounded bg-gray-200"></div>
      </div>
    </div>
  );
}

export default ProductSkeleton;
