import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, fetchRelated } from "../store/productSlice";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Loader2 } from "lucide-react";
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
  }, [id, dispatch]);

  if (loading || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <Link to="/" className="hover:text-blue-600 transition">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/category/mens" className="hover:text-blue-600 transition">
          Men's Fashion
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium line-clamp-1">
          {item.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
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
