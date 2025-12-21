import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Wishlist from "../pages/WishList";
import Layout from "../layout/Layout";

// Pages
import Home from "../pages/Home";
import Deals from "../pages/Deals";
import NewArrivals from "../pages/New Arrivals";
import Categories from "../pages/Categories";
import Shop from "../pages/Shop";
import AllProducts from "../pages/AllProducts";
import Login from "../pages/Auth/Login";
import ProductList from "../pages/ProductList";
import CartPage from "../pages/CartPage";
import ProductDetail from "../pages/ProductDetail";
import Checkout from "../pages/Checkout";
import ComparePage from "../pages/ComparePage";

export default function AppRouter() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Logo veya "/" → Home */}
          <Route path="/" element={<Home />} />

          {/* Menü sayfalarının yönlendirmesi */}
          <Route path="/deals" element={<Deals />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/all" element={<AllProducts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/compare" element={<ComparePage />} />

        </Routes>
      </Layout>
    </Router>
  );
}
