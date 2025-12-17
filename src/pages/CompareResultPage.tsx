import { useLocation, useNavigate } from "react-router-dom";
import type { Product } from "../store/productSlice";

export default function CompareResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const products = location.state?.products as Product[] | undefined;

  if (!products || products.length < 2) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-600 mb-4">
          Karşılaştırılacak ürün bulunamadı
        </p>
        <button
          onClick={() => navigate("/compare")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg"
        >
          Ürün Seç
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Ürün Karşılaştırma</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-xl shadow">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left w-48">Özellik</th>

              {products.map(p => (
                <th key={p.id} className="p-4 text-left min-w-[220px]">
                  <div className="flex flex-col gap-2">
                    <img
                      src={p.thumbnail}
                      alt={p.title}
                      className="h-32 object-contain"
                    />
                    <span className="font-semibold line-clamp-2">
                      {p.title}
                    </span>
                    <span className="text-indigo-600 font-bold">
                      ${p.price}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-sm">
            <Row label="Marka" values={products.map(p => p.brand)} />
            <Row label="Kategori" values={products.map(p => p.category)} />
            <Row
              label="Rating"
              values={products.map(p =>
                p.rating ? `${p.rating.toFixed(1)} ⭐` : "-"
              )}
            />
            <Row
              label="Stok"
              values={products.map(p =>
                p.stock !== undefined ? `${p.stock}` : "-"
              )}
            />
            <Row
              label="Ağırlık"
              values={products.map(p =>
                p.weight !== undefined ? `${p.weight} kg` : "-"
              )}
            />
            <Row
              label="Garanti"
              values={products.map(p => p.warrantyInformation)}
            />
            <Row
              label="İade"
              values={products.map(p => p.returnPolicy)}
            />
          </tbody>
        </table>
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={() => navigate("/compare")}
          className="px-6 py-3 border rounded-lg hover:bg-gray-100"
        >
          Yeni Karşılaştırma
        </button>
      </div>
    </div>
  );
}

/* ---------- Row Component ---------- */

function Row({
  label,
  values,
}: {
  label: string;
  values: (string | undefined)[];
}) {
  return (
    <tr className="border-t">
      <td className="p-4 font-medium bg-gray-50">{label}</td>
      {values.map((v, i) => (
        <td key={i} className="p-4">
          {v ?? "-"}
        </td>
      ))}
    </tr>
  );
}
