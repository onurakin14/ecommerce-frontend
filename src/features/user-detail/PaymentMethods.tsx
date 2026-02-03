export default function PaymentMethods() {
  return (
    <div id="payment-methods" className="page-section space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Methods</h1>
          <p className="mt-1 text-gray-600">
            Manage your saved payment methods
          </p>
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
          Add New Card
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 shadow-lg">
          <div className="absolute right-3 top-3">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              Default
            </span>
          </div>
          <div className="mb-8">
            <p className="text-sm font-medium text-white/80">Credit Card</p>
            <p className="mt-1 text-2xl font-bold tracking-wider text-white">
              •••• •••• •••• 4242
            </p>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-white/80">Cardholder</p>
              <p className="font-semibold text-white">DANIEL SMITH</p>
            </div>
            <div>
              <p className="text-xs text-white/80">Expires</p>
              <p className="font-semibold text-white">12/26</p>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <button className="flex-1 rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/20">
              Edit
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="overflow-hidden rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 p-6 shadow-lg">
          <div className="mb-8">
            <p className="text-sm font-medium text-white/80">Debit Card</p>
            <p className="mt-1 text-2xl font-bold tracking-wider text-white">
              •••• •••• •••• 5678
            </p>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-white/80">Cardholder</p>
              <p className="font-semibold text-white">DANIEL SMITH</p>
            </div>
            <div>
              <p className="text-xs text-white/80">Expires</p>
              <p className="font-semibold text-white">08/25</p>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <button className="flex-1 rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/20">
              Edit
            </button>
            <button className="flex-1 rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/20">
              Set Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
