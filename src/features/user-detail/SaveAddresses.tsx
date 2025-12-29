export default function SaveAddresses() {
  return (
    <div id="saved-addresses" className="page-section space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Saved Addresses</h1>
          <p className="mt-1 text-gray-600">Manage your delivery addresses</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Address 1 (Default) */}
        <div className="relative rounded-xl border-2 border-indigo-200 bg-white p-5 shadow-sm">
          <div className="absolute right-3 top-3">
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
              Default
            </span>
          </div>
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50">
              <svg
                className="h-5 w-5 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Home</h3>
              <p className="mt-1 text-sm text-gray-600">Daniel Smith</p>
            </div>
          </div>
          <div className="mb-4 space-y-1 text-sm text-gray-600">
            <p>123 Main Street, Apt 4B</p>
            <p>New York, NY 10001</p>
            <p>United States</p>
            <p className="mt-2 font-medium text-gray-900">+1 (555) 123-4567</p>
          </div>
          <div className="flex gap-2">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Edit
            </button>
            <button className="flex items-center justify-center rounded-lg border border-red-300 p-2 text-red-600 hover:bg-red-50">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Address 2 */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Office</h3>
              <p className="mt-1 text-sm text-gray-600">Daniel Smith</p>
            </div>
          </div>
          <div className="mb-4 space-y-1 text-sm text-gray-600">
            <p>456 Business Ave, Suite 100</p>
            <p>San Francisco, CA 94102</p>
            <p>United States</p>
            <p className="mt-2 font-medium text-gray-900">+1 (555) 987-6543</p>
          </div>
          <div className="flex gap-2">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Edit
            </button>
            <button className="flex flex-1 items-center justify-center rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Set Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
