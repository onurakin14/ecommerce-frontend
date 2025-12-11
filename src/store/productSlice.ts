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

// PRODUCT MODEL
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
}

// Filtre seçenekleri için interface
export interface ProductFilters {
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
}

// REDUX STATE
interface ProductState {
  list: Product[]; // Tüm ürünler
  item: Product | null; // Liste veya detaydan seçilen ürün
  related: Product[]; // Benzer ürünler
  wishlist: Product[]; // Favoriler

  filters: ProductFilters;

  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  list: [],
  item: null,
  related: [],
  wishlist: [],
  filters: {
    category: null,
    minPrice: null,
    maxPrice: null,
  },
  loading: false,
  error: null,
};

// ASYNC THUNKS
// TÜM ÜRÜNLER
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const res = await axios.get<{ products: Product[] }>(
      "https://dummyjson.com/products"
    );
    return res.data.products;
  }
);

// TEK ÜRÜN
export const fetchProduct = createAsyncThunk<Product, string>(
  "product/fetchProduct",
  async (id) => {
    const res = await axios.get<Product>(
      `https://dummyjson.com/products/${id}`
    );
    return res.data;
  }
);

// RELATED
export const fetchRelated = createAsyncThunk(
  "product/fetchRelated",
  async () => {
    const res = await axios.get<{ products: Product[] }>(
      `https://dummyjson.com/products?limit=4`
    );
    return res.data.products;
  }
);

// SLICE
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // FAVORİ EKLE / ÇIKAR
    toggleWishlist(state, action: PayloadAction<Product>) {
      const exists = state.wishlist.some((p) => p.id === action.payload.id);
      state.wishlist = exists
        ? state.wishlist.filter((p) => p.id !== action.payload.id)
        : [...state.wishlist, action.payload];
    },

    // FİLTRELER
    setCategoryFilter(state, action: PayloadAction<string | null>) {
      state.filters.category = action.payload;
    },
    setPriceFilter(
      state,
      action: PayloadAction<{
        minPrice: number | null;
        maxPrice: number | null;
      }>
    ) {
      state.filters.minPrice = action.payload.minPrice;
      state.filters.maxPrice = action.payload.maxPrice;
    },
    clearFilters(state) {
      state.filters = { category: null, minPrice: null, maxPrice: null };
    },
  },

  extraReducers: (builder) => {
    builder

      //PRODUCTS LIST
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ürünler yüklenemedi";
      })

      //SINGLE PRODUCT
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
        state.error = "Ürün yüklenemedi.";
      })

      //RELATED
      .addCase(fetchRelated.fulfilled, (state, action) => {
        state.related = action.payload;
      });
  },
});

// ACTION EXPORT
export const {
  toggleWishlist,
  setCategoryFilter,
  setPriceFilter,
  clearFilters,
} = productSlice.actions;

// REDUCER EXPORT
export default productSlice.reducer;
