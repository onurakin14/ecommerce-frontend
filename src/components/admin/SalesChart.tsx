import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

export default function SalesChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [1200, 1800, 2600, 2100, 3400, 4600],
        borderColor: "#6366F1",
        backgroundColor: "rgba(99,102,241,0.15)",
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#6366F1",
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        ticks: { display: false },
        grid: {
          drawBorder: false,
          color: "#F3F4F6",
        },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-semibold text-lg">Sales Overview</h3>
          <p className="text-sm text-gray-500">
            Revenue over the last 6 months
          </p>
        </div>

        <button className="text-sm text-blue-600 hover:underline">
          View Report
        </button>
      </div>

      <Line data={data} options={options} height={120} />
    </div>
  );
}
