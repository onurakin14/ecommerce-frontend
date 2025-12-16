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
    window.scrollTo({ top: 0, behavior: "smooth" });

    (async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (e) {
        console.error("Product fetch error:", e);
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
        const filtered = (data.products || []).filter(
          (p: any) => p.id !== product.id
        );
        setRelated(filtered);
      } catch (e) {
        console.error("Related products error:", e);
        setRelated([]);
      }
    })();
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
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
            className="text-blue-600 hover:text-blue-700 font-medium underline"
          >
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-600 transition">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="capitalize">{product.category}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium truncate max-w-[200px]">
            {product.title}
          </span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <ProductGallery images={product.images ?? []} />
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
