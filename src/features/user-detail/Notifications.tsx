export default function Notifications() {
  return (
    <div id="notifications" className="page-section space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-1 text-gray-600">
            Stay updated with your latest activities
          </p>
        </div>
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          Mark all as read
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white">
          All
        </button>
        <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Unread (3)
        </button>
        <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Orders
        </button>
      </div>

      <div className="space-y-3">
        {/* Notification 1 (Unread) */}
        <div className="flex gap-4 rounded-xl border-l-4 border-indigo-600 bg-white p-4 shadow-sm">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
            <svg
              className="h-6 w-6 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              Order Delivered Successfully
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Your order #ORD-2024-0157 has been delivered. Enjoy!
            </p>
            <p className="mt-2 text-xs text-gray-500">2 minutes ago</p>
          </div>
        </div>

        {/* Notification 2 (Read) */}
        <div className="flex gap-4 rounded-xl border-l-4 border-gray-200 bg-gray-50 p-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-700">Order Shipped</h3>
            <p className="mt-1 text-sm text-gray-600">
              Your order #ORD-2024-0158 has been shipped.
            </p>
            <p className="mt-2 text-xs text-gray-500">Yesterday</p>
          </div>
        </div>
      </div>
    </div>
  );
}
