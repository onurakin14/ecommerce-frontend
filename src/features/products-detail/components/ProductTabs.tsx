import { useEffect, useState } from "react";
import { Star, User, Calendar } from "lucide-react";
import type { Product } from "../../../store/productSlice";

interface Props {
  product: Product;
}

type TabType = "description" | "reviews" | "specifications";

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export default function ProductTabs({ product }: Props) {
  const [active, setActive] = useState<TabType>("description");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  useEffect(() => {
    if (!product?.id) return;

    async function loadReviews() {
      setLoadingReviews(true);
      try {
        const res = await fetch(
          `https://dummyjson.com/comments/post/${product.id}`
        );
        const data = await res.json();

        const mockReviews: Review[] =
          data.comments?.slice(0, 5).map((c: any) => ({
            rating: Math.floor(Math.random() * 2) + 4,
            comment: c.body,
            date: new Date().toISOString(),
            reviewerName: c.user?.username || "Anonymous",
            reviewerEmail: `${c.user?.id}@example.com`,
          })) || [];

        setReviews(mockReviews);
      } catch {
        setReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    }

    loadReviews();
  }, [product.id]);

  const tabs = [
    { id: "description", label: "Açıklama" },
    { id: "reviews", label: "Yorumlar" },
    { id: "specifications", label: "Özellikler" },
  ];

  const d = product.dimensions;

  return (
    <div className="mt-10">
      {/* TAB HEADERS */}
      <div className="flex gap-1 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id as TabType)}
            className={`px-6 py-4 font-medium text-sm sm:text-base transition relative ${
              active === tab.id
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
            {active === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="mt-6">
        {/* DESCRIPTION */}
        {active === "description" && (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {product.description || "Ürün açıklaması bulunmamaktadır."}
            </p>

            {product.shippingInformation && (
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Kargo Bilgisi
                </h4>
                <p className="text-gray-700 text-sm">
                  {product.shippingInformation}
                </p>
              </div>
            )}

            {product.returnPolicy && (
              <div className="mt-4 p-4 bg-green-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">
                  İade Politikası
                </h4>
                <p className="text-gray-700 text-sm">
                  {product.returnPolicy}
                </p>
              </div>
            )}
          </div>
        )}

        {/* REVIEWS */}
        {active === "reviews" && (
          <div className="space-y-4">
            {loadingReviews ? (
              <div className="text-center py-8 text-gray-500">
                Yorumlar yükleniyor...
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Henüz yorum yapılmamış.</p>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  İlk yorumu siz yapın
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {reviews.map((r, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition"
                  >
                    <div className="flex justify-between mb-3">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {r.reviewerName}
                          </p>
                          <p className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {new Date(r.date).toLocaleDateString("tr-TR")}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`w-4 h-4 ${
                              j < r.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-700">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SPECIFICATIONS */}
        {active === "specifications" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {product.brand && (
                <Spec label="Marka" value={product.brand} />
              )}
              {product.category && (
                <Spec
                  label="Kategori"
                  value={product.category}
                  capitalize
                />
              )}
              {product.availabilityStatus && (
                <Spec
                  label="Stok Durumu"
                  value={product.availabilityStatus}
                  highlight
                />
              )}
            </div>

            <div className="space-y-3">
              {product.warrantyInformation && (
                <Spec
                  label="Garanti"
                  value={product.warrantyInformation}
                />
              )}
              {d?.width && d?.height && d?.depth && (
                <Spec
                  label="Boyutlar"
                  value={`${d.width} x ${d.height} x ${d.depth} cm`}
                />
              )}
              {product.weight && (
                <Spec
                  label="Ağırlık"
                  value={`${product.weight} kg`}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* REUSABLE SPEC ROW */
function Spec({
  label,
  value,
  capitalize,
  highlight,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between items-center border-b border-gray-200 py-3">
      <span className="text-gray-600 font-medium">{label}</span>
      <span
        className={`font-semibold ${
          highlight ? "text-green-600" : "text-gray-900"
        } ${capitalize ? "capitalize" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
