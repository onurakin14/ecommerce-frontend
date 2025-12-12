import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const LOCAL_KEY = "wishlist_storage";

interface WishlistState {
  items: number[];
}

const load = (): WishlistState => {
  try {
    const saved = localStorage.getItem(LOCAL_KEY);
    return saved ? { items: JSON.parse(saved) } : { items: [] };
  } catch {
    return { items: [] };
  }
};

const save = (items: number[]) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
};

const initialState: WishlistState = load();

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.items.includes(id)) {
        state.items = state.items.filter((x) => x !== id);
      } else {
        state.items.push(id);
      }
      save(state.items);
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((x) => x !== action.payload);
      save(state.items);
    },
  },
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
