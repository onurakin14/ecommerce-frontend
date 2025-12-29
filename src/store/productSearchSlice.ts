import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProductSearchState {
  query: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  status: string;
}

const initialState: ProductSearchState = {
  query: "",
  category: "All Categories",
  minPrice: "",
  maxPrice: "",
  status: "Any Status",
};

const productSearchSlice = createSlice({
  name: "productSearch",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setPriceRange: (
      state,
      action: PayloadAction<{ min: string; max: string }>
    ) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setQuery,
  setCategory,
  setPriceRange,
  setStatus,
  resetFilters,
} = productSearchSlice.actions;

export default productSearchSlice.reducer;
