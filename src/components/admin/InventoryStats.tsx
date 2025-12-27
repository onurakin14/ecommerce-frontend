// src/components/admin/InventoryStats.tsx
const categories = [
  { name: "Smartphones", percent: 45 },
  { name: "Laptops", percent: 28 },
  { name: "Fragrances", percent: 15 },
  { name: "Skincare", percent: 8 },
  { name: "Groceries", percent: 4 },
];

export default function InventoryStats() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="font-semibold text-lg mb-4">
        Inventory by Category
      </h3>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.name}>
            <div className="flex justify-between text-sm mb-1">
              <span>{cat.name}</span>
              <span className="text-gray-500">{cat.percent}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${cat.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
