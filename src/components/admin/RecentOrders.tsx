// src/components/admin/RecentOrders.tsx
const orders = [
  {
    id: "#ORD-001",
    customer: "Leslie Alexander",
    amount: "$120.50",
    status: "Delivered",
    date: "Oct 24, 2023",
  },
  {
    id: "#ORD-002",
    customer: "Michael Foster",
    amount: "$85.00",
    status: "Processing",
    date: "Oct 24, 2023",
  },
  {
    id: "#ORD-003",
    customer: "Lindsay Walton",
    amount: "$210.20",
    status: "Delivered",
    date: "Oct 23, 2023",
  },
];

export default function RecentOrders() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Recent Transactions</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded text-sm bg-gray-100 hover:bg-gray-200">
            Filter
          </button>
          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
            Export
          </button>
        </div>
      </div>

      <table className="w-full text-sm">
        <thead className="text-gray-500">
          <tr>
            <th className="text-left py-3">Order ID</th>
            <th className="text-left py-3">Customer</th>
            <th className="text-center py-3">Total</th>
            <th className="text-center py-3">Status</th>
            <th className="text-center py-3">Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-gray-50 transition"
            >
              <td className="py-4">{order.id}</td>
              <td className="py-4">{order.customer}</td>
              <td className="py-4 text-center">{order.amount}</td>
              <td className="py-4 text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="py-4 text-center">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
