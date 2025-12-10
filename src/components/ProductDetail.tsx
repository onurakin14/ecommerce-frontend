import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, fetchRelated } from "../store/productSlice";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
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
      window.scrollTo(0, 0);
    }
  }, [id]);

  if (loading || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ProductGallery image={item.image} />
        <ProductInfo product={item} />
      </div>

      <div className="mt-20">
        <ProductTabs description={item.description} />
      </div>

      <div className="mt-20">
        <ProductRelated products={related} />
      </div>
    </div>
  );
};

export default ProductDetail;
