/**
 * Product Redux Slice
 *
 * Ürün verilerini ve filtrelerini yöneten Redux store
 * - Backend API'den (product collection) ürünleri çeker
 * - Loading ve error state'lerini yönetir
 */

import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../lib/api";

// PRODUCT MODEL
export interface Product {
  id: number;
  title: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  availabilityStatus: string;
  minimumOrderQuantity: number;
  shippingInformation: string;
  returnPolicy: string;
  warrantyInformation: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  tags: string[];
  thumbnail: string;
  images: string[];
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  reviews: [{
    reviewerName: string;
    comment: string;
    rating: number;
  }];
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
  products: Product[];

  filters: ProductFilters;

  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
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

// ASYNC THUNKS — Backend (product collection)
// TÜM ÜRÜNLER
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const res = await axios.get<{ products: Product[] }>(
      apiUrl("/api/products")
    );
    return res.data.products ?? [];
  }
);

// TEK ÜRÜN
export const fetchProduct = createAsyncThunk<Product, string>(
  "product/fetchProduct",
  async (id) => {
    const res = await axios.get<Product>(apiUrl(`/api/products/${id}`));
    return res.data;
  }
);

// RELATED (backend'den tümünü al, ilk 4'ü kullan)
export const fetchRelated = createAsyncThunk(
  "product/fetchRelated",
  async () => {
    const res = await axios.get<{ products: Product[] }>(
      apiUrl("/api/products")
    );
    const list = res.data.products ?? [];
    return list.slice(0, 4);
  }
);

// ÜRÜN SAYFALAMA (backend'den tümünü al, frontend'de slice)
export const fetchProductsByPage = createAsyncThunk<Product[], { limit?: number, skip?: number }>(
  "product/fetchProductsByPage", async ({ limit = 5, skip = 0 }) => {
    const res = await axios.get<{ products: Product[] }>(apiUrl("/api/products"));
    const list = res.data.products ?? [];
    return list.slice(skip, skip + limit);
  }
);

// ÜRÜN SIRALAMA (backend'den tümünü al, frontend'de sırala)
export const fetchProductsSortBy = createAsyncThunk<Product[], { value: string; direction?: "desc" | "asc" }>(
  "product/fetchProductsSortBy", async ({ value, direction = "desc" }) => {
    const res = await axios.get<{ products: Product[] }>(apiUrl("/api/products"));
    const list = res.data.products ?? [];
    const sorted = [...list].sort((a, b) => {
      const av = (a as unknown as Record<string, unknown>)[value] as number | undefined;
      const bv = (b as unknown as Record<string, unknown>)[value] as number | undefined;
      if (av == null || bv == null) return 0;
      return direction === "asc" ? av - bv : bv - av;
    });
    return sorted;
  }
);

// ÜRÜN EKLE / GÜNCELLE / SİL — backend'de endpoint yoksa dummyjson (admin için)
export const createProduct = createAsyncThunk<Product, Partial<Product>>(
  "product/createProduct", async (newProduct) => {
    const res = await axios.post<Product>("https://dummyjson.com/products/add", newProduct);
    return res.data;
  }
);

export const updateProduct = createAsyncThunk<Product, Partial<Product>>(
  "product/updateProduct", async (product) => {
    const res = await axios.put(`https://dummyjson.com/products/${product.id}`, { product });
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct", async (id: number) => {
    const res = await axios.delete(`https://dummyjson.com/products/${id}`);
    return res.data;
  }
);

// KATEGORİ (dummyjson — backend'de categories endpoint yok)
export interface Category {
  slug: string;
  name: string;
  url: string;
}

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories", async () => {
    const res = await axios.get<Category[]>("https://dummyjson.com/products/categories");
    return res.data;
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
