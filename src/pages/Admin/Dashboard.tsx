// src/pages/Admin/Dashboard.tsx
import StatCards from "../../components/admin/StatCards";
import SalesChart from "../../components/admin/SalesChart";
import InventoryStats from "../../components/admin/InventoryStats";
import RecentOrders from "../../components/admin/RecentOrders";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      
      {/* TOP KPI CARDS */}
      <StatCards />

      {/* MIDDLE SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <SalesChart />
        </div>
        <InventoryStats />
      </div>

      {/* RECENT ORDERS */}
      <RecentOrders />
    </div>
  );
}
