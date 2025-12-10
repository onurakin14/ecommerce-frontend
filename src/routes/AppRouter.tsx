import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductDetailPage from "../pages/ProductDetailPage";
import Wishlist from "../pages/WishList";

export default function AppRouter() {
  return (
    <Router>
        <Routes>
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
    </Router>
  );
}
