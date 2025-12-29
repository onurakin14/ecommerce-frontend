import { Search, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { setQuery } from "../../store/productSearchSlice";

interface Props {
  placeholder?: string;
  className?: string;
}

export default function ProductSearchInput({
  placeholder = "Global Search...",
  className = "",
}: Props) {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.productSearch.query);

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

      <input
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
        placeholder={placeholder}
        className="
          w-full pl-10 pr-10 py-2
          rounded-xl
          bg-slate-100
          border border-transparent
          focus:bg-white focus:border-indigo-500
          focus:ring-2 focus:ring-indigo-500/20
          text-sm
          outline-none
        "
      />

      {query && (
        <button
          onClick={() => dispatch(setQuery(""))}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
