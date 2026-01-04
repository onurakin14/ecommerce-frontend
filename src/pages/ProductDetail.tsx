import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Home, Loader2 } from "lucide-react";

import ProductGallery from "../features/products-detail/components/ProductGallery";
import ProductInfo from "../features/products-detail/components/ProductInfo";
import ProductTabs from "../features/products-detail/components/ProductTabs";
import ProductRelated from "../features/products-detail/components/ProductRelated";

interface ProductDetail {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  thumbnail: string;
  images: string[];
  rating: number;
  discountPercentage: number;
  stock: number;
  brand: string;
  tags: string[];
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  returnPolicy?: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    window.scrollTo({ top: 0 });

    (async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data: Product= await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Product fetch error:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (!product?.category) return;

    (async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/category/${encodeURIComponent(
            product.category
          )}?limit=12`
        );
        const data = await res.json();

        const filtered: Product[] = (data.products || []).filter(
          (p: Product) => p.id !== product.id
        );

        setRelated(filtered);
      } catch (err) {
        console.error("Related products error:", err);
        setRelated([]);
      }
    })();
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Ürün yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Ürün bulunamadı</p>
          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-700 font-medium underline"
          >
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link to="/" className="hover:text-indigo-600">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="capitalize">{product.category}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 font-medium truncate max-w-[220px]">
            {product.title}
          </span>
        </nav>

        {/* Main */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <ProductGallery images={product.images} />
            <ProductInfo product={product} />
          </div>

          <div className="mt-12">
            <ProductTabs product={product} />
          </div>
        </div>

        <ProductRelated products={related} />
      </div>
    </div>
  );
}
