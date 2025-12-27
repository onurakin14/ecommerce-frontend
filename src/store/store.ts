import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import wishlistReducer from "./wishlistSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // cart: cartReducer,
    // user: userReducer,
    product: productReducer,
    wishlist: wishlistReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
