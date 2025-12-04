import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
// import cartReducer from "./cartSlice";  // Sonra ekleyeceğiz
// import userReducer from "./userSlice";  // Sonra ekleyeceğiz

export const store = configureStore({
  reducer: {
    product: productReducer,
    // cart: cartReducer,
    // user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
