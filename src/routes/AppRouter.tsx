import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "../layout/Layout";
import AdminLayout from "../layout/AdminLayout";

// SHOP PAGES
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
import Wishlist from "../pages/WishList";
import OrderSuccess from "../pages/OrderSuccess";
import OrderHistory from "../pages/OrderHistory";
import Orders from "../pages/Orders";
import OrderDetail from "../pages/OrderDetail";
import Settings from "../pages/Settings";
import UserDetail from "../pages/UserDetail";

// ADMIN
import AdminDashboard from "../pages/Admin/Dashboard";
import AdminProducts from "../pages/Admin/Products";
import AdminOrders from "../pages/Admin/Orders";
import AdminUsers from "../pages/Admin/Users";
import AdminCategories from "../pages/Admin/Categories";
import CategoryDetail from "../pages/Admin/CategoryDetail";
import Compare from "../pages/ComparePage";
import AdminProductDetail from "../pages/Admin/ProductDetail";

export default function AppRouter() {
  return (
    <Router>
      <Routes>

        {/* ========== SHOP ROUTES ========== */}
        <Route element={<Layout />}>
          {/* ✅ INDEX ROUTE */}
          <Route index element={<Home />} />

          <Route path="deals" element={<Deals />} />
          <Route path="new-arrivals" element={<NewArrivals />} />
          <Route path="categories" element={<Categories />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/all" element={<AllProducts />} />
          <Route path="login" element={<Login />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/:categoryName" element={<ProductList />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/:id" element={<OrderDetail />} />
          <Route path="order-history" element={<OrderHistory />} />
          <Route path="order-success" element={<OrderSuccess />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* ========== ADMIN ROUTES ========== */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/:id" element={<AdminProductDetail />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="categories/:slug" element={<CategoryDetail />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

      </Routes>
    </Router>
  );
}
