import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../utils/api";

export default function PlanManagement() {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({ title: "", price: "", duration: "", image: "" });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/plans", { headers });
      setPlans(res.data);
    } catch (err) {
      console.error("Failed to fetch plans:", err);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchPlans(); 
    const interval = setInterval(fetchPlans, 5000); 
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await API.put(`/admin/plans/${editing}`, form, { headers });
      } else {
        await API.post("/admin/plans", form, { headers });
      }
      setForm({ title: "", price: "", duration: "", image: "" });
      setEditing(null);
      fetchPlans();
    } catch (err) {
      console.error("Plan save failed:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plan?")) return;
    try {
      await API.delete(`/admin/plans/${id}`, { headers });
      fetchPlans();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />
        <div className="p-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800">
            📦 Plan Management
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap gap-4 items-center bg-white p-4 rounded shadow mb-8"
          >
            <input
              type="text"
              placeholder="Plan Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="p-2 border rounded flex-1 min-w-[150px]"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="p-2 border rounded flex-1 min-w-[100px]"
              required
            />
            <input
              type="number"
              placeholder="Duration (days)"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              className="p-2 border rounded flex-1 min-w-[100px]"
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="p-2 border rounded flex-1 min-w-[200px]"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded"
            >
              {editing ? "Update" : "Add Plan"}
            </button>
          </form>

          {loading ? (
            <p className="text-gray-500">Loading plans...</p>
          ) : (
            <table className="w-full bg-white rounded shadow overflow-hidden">
              <thead>
                <tr className="bg-indigo-600 text-white text-left">
                  <th className="p-3">Title</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((p) => (
                  <tr key={p._id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-800">{p.title}</td>
                    <td className="p-3 text-green-700 font-semibold">₹{p.price}</td>
                    <td className="p-3 text-gray-700">{p.duration} days</td>
                    <td className="p-3">
                      <img
                        src={p.image || "/default-icon.png"}
                        alt={p.title}
                        className="w-12 h-12 object-contain"
                      />
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => {
                          setEditing(p._id);
                          setForm({
                            title: p.title,
                            price: p.price,
                            duration: p.duration,
                            image: p.image || "",
                          });
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {plans.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-400 py-6">
                      No plans found.
                    </td>
                  </tr>
                )}
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

// export default function PlanManagement() {
//   const [plans, setPlans] = useState([]);
//   const [form, setForm] = useState({ name: "", price: "", features: "" });
//   const [editing, setEditing] = useState(null);

//   // ✅ Fetch All Plans
//   const fetchPlans = async () => {
//     try {
//       const res = await API.get("/plans");
//       setPlans(res.data);
//     } catch (err) {
//       console.error("Error fetching plans:", err.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   // ✅ Add or Update Plan
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const planData = {
//         name: form.name,
//         price: Number(form.price),
//         features: form.features.split(",").map((f) => f.trim()),
//       };

//       if (editing) {
//         await API.put(`/plans/${editing}`, planData);
//       } else {
//         await API.post("/plans", planData);
//       }

//       setForm({ name: "", price: "", features: "" });
//       setEditing(null);
//       fetchPlans();
//     } catch (err) {
//       alert("❌ Failed to save plan: " + (err.response?.data?.error || err.message));
//     }
//   };

//   // ✅ Edit Plan
//   const handleEdit = (plan) => {
//     setEditing(plan._id);
//     setForm({
//       name: plan.name,
//       price: plan.price,
//       features: plan.features.join(", "),
//     });
//   };

//   // ✅ Delete Plan
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this plan?")) return;

//     try {
//       await API.delete(`/plans/${id}`);
//       fetchPlans();
//     } catch (err) {
//       alert("❌ Failed to delete plan: " + (err.response?.data?.error || err.message));
//     }
//   };

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 bg-gray-100 min-h-screen">
//         <Navbar />
//         <div className="p-6">
//           <h2 className="text-3xl font-bold mb-4">📦 Plan Management</h2>

//           {/* Add/Edit Form */}
//           <form
//             onSubmit={handleSubmit}
//             className="bg-white p-4 rounded-lg shadow-md mb-6 space-y-3"
//           >
//             <input
//               type="text"
//               placeholder="Plan Name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               className="w-full p-2 border rounded"
//               required
//             />

//             <input
//               type="number"
//               placeholder="Price"
//               value={form.price}
//               onChange={(e) => setForm({ ...form, price: e.target.value })}
//               className="w-full p-2 border rounded"
//               required
//             />

//             <input
//               type="text"
//               placeholder="Features (comma separated)"
//               value={form.features}
//               onChange={(e) => setForm({ ...form, features: e.target.value })}
//               className="w-full p-2 border rounded"
//             />

//             <button
//               type="submit"
//               className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
//             >
//               {editing ? "Update Plan" : "Add Plan"}
//             </button>
//           </form>

//           {/* Plans List */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {plans.map((plan) => (
//               <div
//                 key={plan._id}
//                 className="bg-white p-4 rounded-lg shadow hover:scale-105 transition-transform"
//               >
//                 <h3 className="text-xl font-bold">{plan.name}</h3>
//                 <p className="text-lg text-gray-700">₹{plan.price}</p>
//                 <ul className="list-disc pl-5 text-gray-600">
//                   {plan.features.map((f, i) => (
//                     <li key={i}>{f}</li>
//                   ))}
//                 </ul>

//                 <div className="flex gap-2 mt-3">
//                   <button
//                     onClick={() => handleEdit(plan)}
//                     className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded text-white"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(plan._id)}
//                     className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
