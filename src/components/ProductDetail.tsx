import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, fetchRelated } from "../store/productSlice";
import { useParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../store/store";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import ProductRelated from "./ProductRelated";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { item, related, loading } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
      dispatch(fetchRelated());
    }
  }, [id]);

  if (loading || !item)
    return <p className="text-center py-20 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        Home / Men’s Fashion / <span className="text-gray-700 font-medium">{item.title}</span>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ProductGallery image={item.image} />

        <ProductInfo product={item} />
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <ProductTabs description={item.description} />
      </div>

      {/* Related */}
      <div className="mt-16">
        <ProductRelated products={related} />
      </div>
    </div>
  );
};

export default ProductDetail;
