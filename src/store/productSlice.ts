/**
 * Product Redux Slice
 *
 * Ürün verilerini ve filtrelerini yöneten Redux store
 * - FakeStore API'den ürünleri axios ile çeker
 * - Loading ve error state'lerini yönetir
 * - Ürün CRUD işlemleri için reducer'lar içerir
 */

import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

// FakeStore API'den gelen ürün verisi formatı
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

// Filtre seçenekleri için interface
export interface ProductFilters {
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
}

// Redux state
interface ProductState {
  products: Product[]; // Tüm ürünler
  filters: ProductFilters; // Aktif filtreler
  loading: boolean; // API isteği devam ediyor mu?
  error: string | null; // Hata mesajı
}

// Başlangıç değerleri
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

// FakeStore API'den ürünleri çeken async thunk
// 1 saniyelik gecikme  yapay skeleton loader'ı görmek için
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await axios.get<Product[]>(
      "https://fakestoreapi.com/products"
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return response.data;
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
