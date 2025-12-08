import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./store/store";

import AppRouter from "./routes/AppRouter"; 

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />   
    </Provider>
  </StrictMode>
);
