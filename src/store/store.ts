import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import wishlistReducer from "./wishlistSlice";

export const store = configureStore({
  reducer: {
     auth: authReducer,
    // cart: cartReducer,
    // user: userReducer,
    product: productReducer,
    wishlist: wishlistReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
