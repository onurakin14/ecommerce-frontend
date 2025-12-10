import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
// import cartReducer from "./cartSlice";  // Sonra ekleyeceğiz
// import userReducer from "./userSlice";  // Sonra ekleyeceğiz
import wishlistReducer from "./wishlistSlide";

export const store = configureStore({
  reducer: {
    product: productReducer,
    // cart: cartReducer,
    // user: userReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
