import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FiChevronRight, FiPrinter, FiTruck } from "react-icons/fi";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchProducts } from "../store/productSlice";

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const products = useSelector((state: RootState) => state.product.list);

  useEffect(() => {
    console.log("OrderDetail useEffect, products.length:", products.length);
    if (products.length === 0) {
      console.log("Dispatching fetchProducts");
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  if (!id || !id.startsWith("ORDER-")) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Order not found
            </h2>
            <Link to="/orders" className="text-blue-600 hover:underline">
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  console.log("OrderDetail rendered with id:", id);

  // Dinamik order data
  const order = {
    id: id || "ORDER-1",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    status: "Shipped",
    expectedDelivery: new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    progress: 66, // percentage
    items: wishlistItems
      .map((productId) => {
        const prod = products.find((p) => p.id === productId);
        return prod
          ? {
              id: prod.id,
              name: prod.title,
              sku: `SKU-${prod.id}`,
              price: prod.price,
              quantity: 1,
              image: prod.thumbnail || prod.images?.[0],
            }
          : null;
      })
      .filter((item) => item !== null),
    shipping: {
      name: "Berkay Ozgun",
      address: " Buca ",
      city: "İzmir",
      country: "Turkey",
      method: "Standard Shipping (3-5 days)",
    },
    payment: {
      method: "Visa ending in 1234",
      expiry: "08/2028",
      billing: "Same as shipping address",
    },
    summary: {
      subtotal: wishlistItems.reduce((sum, productId) => {
        const prod = products.find((p) => p.id === productId);
        return sum + (prod?.price || 0);
      }, 0),
      shipping: 15.0,
      taxes: parseFloat(
        (
          wishlistItems.reduce((sum, productId) => {
            const prod = products.find((p) => p.id === productId);
            return sum + (prod?.price || 0);
          }, 0) * 0.08
        ).toFixed(2)
      ), // 8% tax
      total: parseFloat(
        (
          wishlistItems.reduce((sum, productId) => {
            const prod = products.find((p) => p.id === productId);
            return sum + (prod?.price || 0);
          }, 0) +
          15.0 +
          wishlistItems.reduce((sum, productId) => {
            const prod = products.find((p) => p.id === productId);
            return sum + (prod?.price || 0);
          }, 0) *
            0.08
        ).toFixed(2)
      ),
    },
  };

  const progressSteps = [
    { label: "Order Placed", date: "Aug 22", completed: true },
    { label: "Processing", date: "Aug 23", completed: true },
    { label: "Shipped", date: "Aug 24", completed: true },
    { label: "Delivered", date: "", completed: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb path={["Home", "My Orders", `Order #${order.id}`]} />

        {/* Page Heading */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Order #{order.id}
            </h1>
            <p className="text-gray-600">Order placed on {order.date}</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <FiPrinter size={18} />
              Print Invoice
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <FiTruck size={18} />
              Track Package
            </button>
          </div>
        </div>

        {/* Order Status Progress */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-gray-900">
                Order Status:{" "}
                <span className="text-blue-600 font-semibold">
                  {order.status}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Expected delivery: {order.expectedDelivery}
              </p>
            </div>
            <div className="relative pt-6">
              <div className="absolute top-8 left-0 w-full h-1 bg-gray-200 rounded-full">
                <div
                  className="h-1 rounded-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${order.progress}%` }}
                ></div>
              </div>
              <div className="relative flex justify-between">
                {progressSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 text-center w-24"
                  >
                    <div
                      className={`size-4 rounded-full flex items-center justify-center ring-4 ring-white ${
                        step.completed ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    ></div>
                    <p
                      className={`text-sm font-medium ${
                        step.completed ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {step.label}
                    </p>
                    {step.date && (
                      <p className="text-xs text-gray-500">{step.date}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Ordered Items */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Ordered Items ({order.items.length})
              </h2>
              <div className="space-y-4 divide-y divide-gray-200">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 pt-4 first:pt-0"
                  >
                    <div
                      className="size-20 bg-cover bg-center rounded-lg"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-gray-900">
                        ${item.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-gray-900 w-24 text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-4 space-y-6">
            {/* Shipping Details */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Shipping Details
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-semibold text-gray-900">
                  {order.shipping.name}
                </p>
                <p>{order.shipping.address}</p>
                <p>{order.shipping.city}</p>
                <p>{order.shipping.country}</p>
              </div>
              <hr className="my-4 border-gray-200" />
              <h4 className="text-gray-900 text-sm font-bold mb-1">
                Delivery Method
              </h4>
              <p className="text-sm text-gray-600">{order.shipping.method}</p>
            </div>

            {/* Payment Information */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Payment Information
              </h3>
              <div className="flex items-center gap-3">
                <div
                  className="size-8 bg-contain bg-no-repeat"
                  style={{
                    backgroundImage: `url(https://lh3.googleusercontent.com/aida-public/AB6AXuBfZUCO5DAzWghzBkgbsXrYXURqJQ3BcwveQlRx5VtPyhOAPlqs6fnQkKGUu23FK51WtTMU0JiTl8hjGX2BRV-i8OZ_MzI-vJ0XPYCUhRdR8UtoiJF2iGd254eEs43uvfzTxsQclQrYJy5omlHezG1lIQwNTRAmIFTkwTFfZK7qd3LV1LHCYvJ7XYJmsS2wd28sU_Z8pjMN6Zur2OHSd_pXHxIJkgU0oGkKjaUlI7hw6PJQaCl_J4l8r3XjLmRW7VtJA6CZrez4IH4)`,
                  }}
                ></div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {order.payment.method}
                  </p>
                  <p className="text-xs text-gray-600">
                    Expires {order.payment.expiry}
                  </p>
                </div>
              </div>
              <hr className="my-4 border-gray-200" />
              <h4 className="text-gray-900 text-sm font-bold mb-1">
                Billing Address
              </h4>
              <p className="text-sm text-gray-600">{order.payment.billing}</p>
            </div>

            {/* Order Summary */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Order Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="text-gray-900 font-medium">
                    ${order.summary.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-gray-900 font-medium">
                    ${order.summary.shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes</span>
                  <span className="text-gray-900 font-medium">
                    ${order.summary.taxes.toFixed(2)}
                  </span>
                </div>
                <hr className="my-3 border-gray-200" />
                <div className="flex justify-between text-gray-900 font-bold text-lg">
                  <span>Total</span>
                  <span>${order.summary.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
