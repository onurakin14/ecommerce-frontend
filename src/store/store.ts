import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./cartSlice";  // Sonra ekleyeceğiz
// import userReducer from "./userSlice";  // Sonra ekleyeceğiz
import productReducer from "./productSlice";
import wishlistReducer from "./wishlistSlice";

export const store = configureStore({
  reducer: {
    // cart: cartReducer,
    // user: userReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
