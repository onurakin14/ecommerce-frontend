import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

interface ProductState {
  item: Product | null;
  related: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  item: null,
  related: [],
  loading: false,
  error: null,
};

// ---- Fetch Single Product ----
export const fetchProduct = createAsyncThunk<Product, string>(
  "product/fetchProduct",
  async (id: string) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) throw new Error("Product load error");
    return res.json();
  }
);

// ---- Fetch Related Products ----
export const fetchRelated = createAsyncThunk<Product[]>(
  "product/fetchRelated",
  async () => {
    const res = await fetch(`https://fakestoreapi.com/products?limit=4`);
    if (!res.ok) throw new Error("Related load error");
    return res.json();
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- Product ---
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Product could not be loaded.";
      })

      // --- Related ---
      .addCase(fetchRelated.fulfilled, (state, action) => {
        state.related = action.payload;
      });
  },
});

export default productSlice.reducer;
