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

export const fetchProductsByPage = createAsyncThunk<Product[], { limit?: string, skip?: string }>(
  "product/fetchProductsByPage", async ({ limit = "5", skip = "0" }) => {
    const apiUrl = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    const res = await axios.get<{ products: Product[] }>(apiUrl);
    return res.data.products;
  }
);

export const fetchProductsSortBy = createAsyncThunk<Product[], { value: string; direction?: "desc" | "asc" }>(
  "product/fetchProductsSortBy", async ({ value, direction = "desc" }) => {
    const sortApiUrl = `https://dummyjson.com/products?sortBy=${value}&order=${direction}`;
    const res = await axios.get<{ products: Product[] }>(sortApiUrl);
    return res.data.products;
  }
);

export interface Category {
  slug: string,
  name: string,
  url: string
}

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories", async () => {
    const res = await axios.get<Category[]>('https://dummyjson.com/products/categories');
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
