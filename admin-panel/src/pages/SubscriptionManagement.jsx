import { useEffect, useState } from "react";
import API from "../utils/api";

export default function SubscriptionManagement() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch subscriptions
  const fetchSubs = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await API.get("/admin/subscriptions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubs(res.data);
    } catch (err) {
      console.error("Error fetching subscriptions:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete subscription
  const deleteSub = async (id) => {
    if (!window.confirm("Are you sure to cancel this subscription?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await API.delete(`/admin/subscriptions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSubs();
    } catch (err) {
      console.error("Error deleting subscription:", err);
    }
  };

  useEffect(() => {
    fetchSubs(); // first load
    const interval = setInterval(fetchSubs, 5000); // poll every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Subscription Management</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100 text-sm">
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Plan</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Subscribed</th>
                <th className="px-4 py-2 border">Expires</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((sub) => (
                <tr key={sub._id} className="text-center text-sm">
                  <td className="px-4 py-2 border">{sub.user?.name || "-"}</td>
                  <td className="px-4 py-2 border">{sub.plan?.title || "-"}</td>
                  <td className="px-4 py-2 border">₹{sub.plan?.price || "0"}</td>
                  <td className="px-4 py-2 border">{sub.status}</td>
                  <td className="px-4 py-2 border">
                    {sub.subscribedAt
                      ? new Date(sub.subscribedAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2 border">
                    {sub.expiresAt
                      ? new Date(sub.expiresAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => deleteSub(sub._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
              {subs.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-gray-500 py-4">
                    No subscriptions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}













//-------------------testing-------

// import { useEffect, useState } from "react";
// import API from "../utils/api";

// export default function SubscriptionManagement() {
//   const [subs, setSubs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchSubs = async () => {
//     try {
//       const token = localStorage.getItem("adminToken");
//       const res = await API.get("/admin/subscriptions", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSubs(res.data);
//     } catch (err) {
//       console.error("Error fetching subscriptions:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteSub = async (id) => {
//     if (!window.confirm("Are you sure to cancel this subscription?")) return;
//     try {
//       const token = localStorage.getItem("adminToken");
//       await API.delete(`/admin/subscriptions/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchSubs();
//     } catch (err) {
//       console.error("Error deleting subscription:", err);
//     }
//   };

//   useEffect(() => {
//     fetchSubs();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Subscription Management</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="px-4 py-2 border">User</th>
//                 <th className="px-4 py-2 border">Plan</th>
//                 <th className="px-4 py-2 border">Status</th>
//                 <th className="px-4 py-2 border">Start Date</th>
//                 <th className="px-4 py-2 border">End Date</th>
//                 <th className="px-4 py-2 border">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {subs.map((sub) => (
//                 <tr key={sub._id} className="text-center">
//                   <td className="px-4 py-2 border">
//                     {sub.userId?.name || "-"}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {sub.planId?.name || "-"}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {sub.status || "-"}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {sub.startDate
//                       ? new Date(sub.startDate).toLocaleDateString()
//                       : "-"}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {sub.endDate
//                       ? new Date(sub.endDate).toLocaleDateString()
//                       : "-"}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <button
//                       onClick={() => deleteSub(sub._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     >
//                       Cancel
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {subs.length === 0 && (
//                 <tr>
//                   <td colSpan="6" className="text-gray-500 py-4">
//                     No subscriptions found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
