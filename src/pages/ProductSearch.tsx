import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search,Download,Plus,MoreHorizontal} from "lucide-react";
import type { RootState } from "../store/store";
import {setQuery,setCategory,setPriceRange,resetFilters} from "../store/productSearchSlice";

export default function ProductSearch() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.productSearch);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const q = p.title.toLowerCase().includes(filters.query.toLowerCase());
      const c =
        filters.category === "All Categories" ||
        p.category === filters.category;
      const priceOk =
        (!filters.minPrice || p.price >= +filters.minPrice) &&
        (!filters.maxPrice || p.price <= +filters.maxPrice);
      return q && c && priceOk;
    });
  }, [products, filters]);

  return (
    <div className="bg-slate-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Product Search</h1>
            <p className="text-sm text-slate-500">
              Search, filter and manage your entire product catalog.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-xl border bg-white text-sm flex gap-2">
              <Download size={16} /> Export
            </button>
            <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm flex gap-2">
              <Plus size={16} /> Add Product
            </button>
          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-white p-6 rounded-2xl border grid grid-cols-12 gap-4 items-end">
          <div className="col-span-4">
            <label className="text-[11px] font-bold text-slate-400 uppercase">
              Keyword
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={filters.query}
                onChange={(e) => dispatch(setQuery(e.target.value))}
                className="w-full pl-10 py-2 rounded-xl border"
                placeholder="Search by name..."
              />
            </div>
          </div>

          <div className="col-span-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              className="w-full py-2 rounded-xl border"
            >
              <option>All Categories</option>
              <option>smartphones</option>
              <option>laptops</option>
            </select>
          </div>

          <div className="col-span-3 flex gap-2">
            <input
              placeholder="$ Min"
              value={filters.minPrice}
              onChange={(e) =>
                dispatch(setPriceRange({ min: e.target.value, max: filters.maxPrice }))
              }
              className="w-1/2 py-2 rounded-xl border"
            />
            <input
              placeholder="$ Max"
              value={filters.maxPrice}
              onChange={(e) =>
                dispatch(setPriceRange({ min: filters.minPrice, max: e.target.value }))
              }
              className="w-1/2 py-2 rounded-xl border"
            />
          </div>

          <div className="col-span-1">
            <button
              onClick={() => dispatch(resetFilters())}
              className="w-full py-2 rounded-xl text-slate-500 hover:bg-slate-100"
            >
              Reset
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-400 uppercase text-[11px]">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-t hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold">{p.title}</td>
                  <td className="px-6 py-4">{p.category}</td>
                  <td className="px-6 py-4">${p.price}</td>
                  <td className="px-6 py-4">{p.stock}</td>
                  <td className="px-6 py-4">
                    {p.stock > 0 ? "Active" : "Out of Stock"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <MoreHorizontal />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
