// src/components/admin/StatCards.tsx
import { useEffect, useState } from "react";
import { FiBox, FiUsers, FiShoppingCart, FiDollarSign } from "react-icons/fi";

export default function StatCards() {
  const [totalProducts, setTotalProducts] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setTotalProducts(data.total);
      })
      .catch(() => {
        setTotalProducts(0);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      
      {/* TOTAL PRODUCTS */}
      <div className="bg-white rounded-xl shadow-sm p-6 flex justify-between">
        <div>
          <p className="text-sm text-gray-500">Total Products</p>
          <h2 className="text-2xl font-bold mt-1">
            {totalProducts === null ? "..." : totalProducts}
          </h2>
          <span className="text-xs text-green-600 font-medium">
            +12%
          </span>
        </div>

        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
          <FiBox />
        </div>
      </div>

      {/* DİĞER KARTLAR (ŞİMDİLİK SABİT, SONRA BAĞLANACAK) */}
      <div className="bg-white rounded-xl shadow-sm p-6 flex justify-between">
        <div>
          <p className="text-sm text-gray-500">Total Users</p>
          <h2 className="text-2xl font-bold mt-1">20,543</h2>
          <span className="text-xs text-green-600 font-medium">+5%</span>
        </div>
        <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
          <FiUsers />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 flex justify-between">
        <div>
          <p className="text-sm text-gray-500">Total Orders</p>
          <h2 className="text-2xl font-bold mt-1">500</h2>
          <span className="text-xs text-green-600 font-medium">+8%</span>
        </div>
        <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
          <FiShoppingCart />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 flex justify-between">
        <div>
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h2 className="text-2xl font-bold mt-1">$45,231.89</h2>
          <span className="text-xs text-green-600 font-medium">+23%</span>
        </div>
        <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center">
          <FiDollarSign />
        </div>
      </div>

    </div>
  );
}
