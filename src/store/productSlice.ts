import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

// FakeStore API response format
export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductFilters {
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
}

interface ProductState {
  products: Product[];
  filters: ProductFilters;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  filters: {
    category: null,
    minPrice: null,
    maxPrice: null,
  },
  loading: false,
  error: null,
};

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    // 1 saniye gecikme ekle (skeleton için)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return data as Product[];
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    setCategoryFilter: (state, action: PayloadAction<string | null>) => {
      state.filters.category = action.payload;
    },
    setPriceFilter: (
      state,
      action: PayloadAction<{
        minPrice: number | null;
        maxPrice: number | null;
      }>
    ) => {
      state.filters.minPrice = action.payload.minPrice;
      state.filters.maxPrice = action.payload.maxPrice;
    },
    clearFilters: (state) => {
      state.filters = {
        category: null,
        minPrice: null,
        maxPrice: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  setCategoryFilter,
  setPriceFilter,
  clearFilters,
} = productSlice.actions;

export default productSlice.reducer;
