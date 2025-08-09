import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../utils/api";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { saveAs } from "file-saver";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default function Dashboard() {
  const [stats, setStats] = useState({ users: 0, plans: 0, activeSubs: 0 });
  const [loading, setLoading] = useState(true);
  const [revenueData, setRevenueData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedPlan, setSelectedPlan] = useState("All");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const headers = { Authorization: `Bearer ${token}` };

        const [usersRes, plansRes, subsRes] = await Promise.all([
          API.get("/admin/users-count", { headers }),
          API.get("/admin/plans-count", { headers }),
          API.get("/admin/active-subs-count", { headers }),
        ]);

        setStats({
          users: usersRes.data.totalUsers,
          plans: plansRes.data.totalPlans,
          activeSubs: subsRes.data.activeSubscriptions,
        });
      } catch (err) {
        console.error("Error fetching stats:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchRevenueStats = async () => {
      try {
        const res = await API.get("/plans/revenue-stats");
        setRevenueData(res.data);
      } catch (err) {
        console.error("Revenue fetch failed:", err.message);
      }
    };

    fetchStats();
    fetchRevenueStats();
  }, []);

  const filterRevenueData = () => {
    const filtered = revenueData
      .filter((p) => selectedPlan === "All" || p.title === selectedPlan)
      .map((plan) => {
        const monthlyFiltered = {};
        for (const [month, amount] of Object.entries(plan.monthlyBreakdown)) {
          const year = month.split(" ")[1];
          if (selectedYear === "All" || year === selectedYear) {
            monthlyFiltered[month] = amount;
          }
        }
        return { ...plan, monthlyBreakdown: monthlyFiltered };
      });
    return filtered;
  };

  const generatePieChart = () => {
    const filtered = filterRevenueData();
    return {
      labels: filtered.map((p) => p.title),
      datasets: [
        {
          data: filtered.map((p) => p.revenue),
          backgroundColor: filtered.map((p) => p.color),
        },
      ],
    };
  };

  const generateLineChart = () => {
    const filtered = filterRevenueData();
    const allMonths = Array.from(
      new Set(filtered.flatMap((p) => Object.keys(p.monthlyBreakdown)))
    ).sort((a, b) => new Date(`01 ${a}`) - new Date(`01 ${b}`));

    return {
      labels: allMonths,
      datasets: filtered.map((plan) => ({
        label: plan.title,
        data: allMonths.map((m) => plan.monthlyBreakdown[m] || 0),
        borderColor: plan.color,
        backgroundColor: plan.color,
        tension: 0.4,
      })),
    };
  };

  const handleExportCSV = () => {
    const filtered = filterRevenueData();
    const rows = [["Plan", "Month", "Revenue (₹)"]];
    filtered.forEach((plan) => {
      Object.entries(plan.monthlyBreakdown).forEach(([month, amount]) => {
        rows.push([plan.title, month, amount]);
      });
    });
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "revenue_stats.csv");
  };

  const years = Array.from(
    new Set(
      revenueData.flatMap((p) =>
        Object.keys(p.monthlyBreakdown).map((m) => m.split(" ")[1])
      )
    )
  );

  const planTitles = revenueData.map((p) => p.title);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">📊 Admin Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card title="Total Users" value={stats.users} color="text-indigo-600" />
            <Card title="Total Plans" value={stats.plans} color="text-purple-600" />
            <Card title="Active Subscriptions" value={stats.activeSubs} color="text-green-600" />
          </div>

          {/* 🎛 Filters */}
          <div className="flex flex-wrap gap-4 mb-6 items-center">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 rounded border"
            >
              <option value="All">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="px-4 py-2 rounded border"
            >
              <option value="All">All Plans</option>
              {planTitles.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <button
              onClick={handleExportCSV}
              className="ml-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              ⬇️ Export CSV
            </button>
          </div>

          {/* 📈 Line Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-2">📈 Monthly Revenue</h3>
            <Line data={generateLineChart()} />
          </div>

          {/* 🥧 Pie Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">🥧 Plan-wise Revenue Share</h3>
            <Pie data={generatePieChart()} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:scale-105 transition-transform">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}



/// charts  1 shi niche h

// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import API from "../utils/api";

// export default function Dashboard() {
//   const [stats, setStats] = useState({ users: 0, plans: 0, activeSubs: 0 });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem("adminToken");
//         const headers = { Authorization: `Bearer ${token}` };

//         const [usersRes, plansRes, subsRes] = await Promise.all([
//           API.get("/admin/users-count", { headers }),
//           API.get("/admin/plans-count", { headers }),
//           API.get("/admin/active-subs-count", { headers }),
//         ]);

//         setStats({
//           users: usersRes.data.totalUsers,
//           plans: plansRes.data.totalPlans,
//           activeSubs: subsRes.data.activeSubscriptions,
//         });
//       } catch (err) {
//         console.error("Error fetching stats:", err.response?.data || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-xl text-gray-600">Loading dashboard...</p>
//       </div>
//     );

//   return (
//     <div className="flex">
      

//       <div className="flex-1 bg-gray-100 min-h-screen">
//         <Navbar />
//         <div className="p-6">
//           <h2 className="text-3xl font-bold mb-4">📊 Dashboard</h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <Card title="Total Users" value={stats.users} color="text-indigo-600" />
//             <Card title="Total Plans" value={stats.plans} color="text-purple-600" />
//             <Card title="Active Subscriptions" value={stats.activeSubs} color="text-green-600" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Card({ title, value, color }) {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow hover:scale-105 transition-transform">
//       <h3 className="text-xl font-semibold">{title}</h3>
//       <p className={`text-3xl font-bold ${color}`}>{value}</p>
//     </div>
//   );
// }







