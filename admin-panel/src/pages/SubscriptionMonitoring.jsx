import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../utils/api";

export default function SubscriptionMonitoring() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch All Subscriptions
  const fetchSubscriptions = async () => {
    try {
      const res = await API.get("/subscription/admin/all");
      setSubscriptions(res.data);
    } catch (err) {
      console.error(
        "Error fetching subscriptions:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions(); // First load
    const interval = setInterval(fetchSubscriptions, 5000); // Poll every 5 sec
    return () => clearInterval(interval);
  }, []);

  // ✅ Filter Subscriptions
  const filteredSubs =
    filter === "all"
      ? subscriptions
      : subscriptions.filter((sub) => sub.status === filter);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">📄 Subscription Monitoring</h2>

          {/* Filter Buttons */}
          <div className="flex gap-4 mb-6">
            {["all", "active", "expired", "unsubscribed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded ${
                  filter === f ? "bg-indigo-600 text-white" : "bg-gray-300"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-lg text-gray-600">Loading subscriptions...</p>
          ) : filteredSubs.length === 0 ? (
            <p className="text-lg text-gray-500">No subscriptions found</p>
          ) : (
            <table className="w-full bg-white shadow rounded-lg">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Plan</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Start Date</th>
                  <th className="p-3 text-left">End Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubs.map((sub) => (
                  <tr
                    key={sub._id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="p-3">{sub.user?.name || "Unknown"}</td>
                    <td className="p-3">{sub.plan?.title || "N/A"}</td>
                    <td className="p-3 capitalize">{sub.status || "-"}</td>
                    <td className="p-3">
                      {sub.subscribedAt
                        ? new Date(sub.subscribedAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="p-3">
                      {sub.expiresAt
                        ? new Date(sub.expiresAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {sub.plan?.title || sub.plan?.name || "-"}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}


// import { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import API from "../utils/api";

// export default function SubscriptionMonitoring() {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch All Subscriptions
//   const fetchSubscriptions = async () => {
//     try {
//       const res = await API.get("/subscription/admin/all");
//       setSubscriptions(res.data);
//     } catch (err) {
//       console.error("Error fetching subscriptions:", err.response?.data || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSubscriptions();
//   }, []);

//   // ✅ Filter Subscriptions
//   const filteredSubs =
//     filter === "all"
//       ? subscriptions
//       : subscriptions.filter((sub) => sub.status === filter);

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 bg-gray-100 min-h-screen">
//         <Navbar />
//         <div className="p-6">
//           <h2 className="text-3xl font-bold mb-4">📄 Subscription Monitoring</h2>

//           {/* Filter Buttons */}
//           <div className="flex gap-4 mb-6">
//             {["all", "active", "expired", "unsubscribed"].map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setFilter(f)}
//                 className={`px-4 py-2 rounded ${
//                   filter === f ? "bg-indigo-600 text-white" : "bg-gray-300"
//                 }`}
//               >
//                 {f.charAt(0).toUpperCase() + f.slice(1)}
//               </button>
//             ))}
//           </div>

//           {loading ? (
//             <p className="text-lg text-gray-600">Loading subscriptions...</p>
//           ) : filteredSubs.length === 0 ? (
//             <p className="text-lg text-gray-500">No subscriptions found</p>
//           ) : (
//             <table className="w-full bg-white shadow rounded-lg">
//               <thead>
//                 <tr className="bg-indigo-600 text-white">
//                   <th className="p-3 text-left">User</th>
//                   <th className="p-3 text-left">Plan</th>
//                   <th className="p-3 text-left">Status</th>
//                   <th className="p-3 text-left">Start Date</th>
//                   <th className="p-3 text-left">End Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredSubs.map((sub) => (
//                   <tr
//                     key={sub._id}
//                     className="border-b hover:bg-gray-100 transition"
//                   >
//                     <td className="p-3">{sub.user?.name || "Unknown"}</td>
//                     <td className="p-3">{sub.plan?.name || "N/A"}</td>
//                     <td className="p-3 capitalize">{sub.status}</td>
//                     <td className="p-3">
//                       {new Date(sub.startDate).toLocaleDateString()}
//                     </td>
//                     <td className="p-3">
//                       {new Date(sub.endDate).toLocaleDateString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
