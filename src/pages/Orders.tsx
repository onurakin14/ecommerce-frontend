import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiPackage } from "react-icons/fi";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchProducts } from "../store/productSlice";

const Orders: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const products = useSelector((state: RootState) => state.product.list);

  useEffect(() => {
    console.log("Orders useEffect, products.length:", products.length);
    if (products.length === 0) {
      console.log("Dispatching fetchProducts");
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // Favorilerdeki ürünleri tek toplu sipariş olarak göster
  const orders =
    wishlistItems.length > 0
      ? [
          {
            id: "ORDER-WISHLIST",
            date: new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            status: "Shipped",
            total: wishlistItems.reduce((sum, productId) => {
              const product = products.find((p) => p.id === productId);
              return sum + (product?.price || 0);
            }, 0),
            items: wishlistItems.length,
            expectedDelivery: new Date(
              Date.now() + 3 * 24 * 60 * 60 * 1000
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          },
        ]
      : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Shipped":
        return "text-blue-600 bg-blue-50";
      case "Delivered":
        return "text-green-600 bg-green-50";
      case "Processing":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb path={["Home", "My Orders"]} />

        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-xl p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order.id}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Ordered on {order.date}</p>
                    <p>
                      {order.items} items • Total: ${order.total.toFixed(2)}
                    </p>
                    {order.status === "Shipped" && (
                      <p>Expected delivery: {order.expectedDelivery}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link
                    to={`/order/${order.id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FiEye size={16} />
                    View Details
                  </Link>
                  {order.status === "Shipped" && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <FiPackage size={16} />
                      Track Package
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <FiPackage size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-600 mb-4">
              When you place an order, it will appear here.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
