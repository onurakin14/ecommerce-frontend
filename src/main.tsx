import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./store/store";
import { CartProvider } from "./features/shopping-cart/CartContext";

import AppRouter from "./routes/AppRouter";

/* =====================
   LOAD SAVED THEME
===================== */
const savedTheme = localStorage.getItem("theme-color");

if (savedTheme) {
  document.documentElement.style.setProperty(
    "--primary-color",
    savedTheme
  );
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </Provider>
  </StrictMode>
);
