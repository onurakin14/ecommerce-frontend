export default function OrderHistory() {
  return (
    <div id="order-history" className="page-section space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="mt-1 text-gray-600">Track and manage your orders</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white">
          All Orders
        </button>
        <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Processing
        </button>
        <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Shipped
        </button>
        <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Delivered
        </button>
      </div>

      <div className="space-y-4">
        {/* Order 1 */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-gray-900">
                  Order #ORD-2024-0157
                </h3>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Delivered
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Placed on December 15, 2024
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-semibold text-gray-900">$234.99</p>
              <p className="text-sm text-gray-600">3 items</p>
            </div>
          </div>
          <div className="border-t border-gray-200 bg-gray-50 px-5 py-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop"
                  className="h-16 w-16 rounded-lg object-cover"
                  alt="Premium Wireless Headphones"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    Premium Wireless Headphones
                  </h4>
                  <p className="text-sm text-gray-600">Qty: 1 × $99.99</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  View Details
                </button>
                <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                  Buy Again
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Order 2 */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-gray-900">
                  Order #ORD-2024-0158
                </h3>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  Shipped
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Placed on December 18, 2024
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-semibold text-gray-900">$89.99</p>
              <p className="text-sm text-gray-600">1 item</p>
            </div>
          </div>
          <div className="border-t border-gray-200 bg-gray-50 px-5 py-4">
            <div className="mb-3">
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-2/3 rounded-full bg-blue-600"></div>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1560343090-f0409e92791a?w=100&h=100&fit=crop"
                  className="h-16 w-16 rounded-lg object-cover"
                  alt="Smart Watch Series 5"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    Smart Watch Series 5
                  </h4>
                  <p className="text-sm text-gray-600">Qty: 1 × $89.99</p>
                </div>
              </div>
              <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Track Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
