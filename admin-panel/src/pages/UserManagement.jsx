import { useEffect, useState } from "react";
import API from "../utils/api";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const res = await API.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleBan = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await API.put(`/admin/users/${id}/toggle-ban`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Ban Toggle Error:", err.response?.data || err);
    }
  };

  const toggleAdmin = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await API.put(`/admin/users/${id}/toggle-admin`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Admin Toggle Error:", err.response?.data || err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {loading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-3 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="p-3 border">{user.name}</td>
                    <td className="p-3 border">{user.email}</td>
                    <td className="p-3 border">{user.phone}</td>
                    <td
                      className={`p-3 border ${
                        user.isBanned ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {user.isBanned ? "Banned" : "Active"}
                    </td>
                    <td className="p-3 border">
                      {user.isAdmin ? "Admin" : "User"}
                    </td>
                    <td className="p-3 border text-center space-x-2">
                      <button
                        onClick={() => toggleBan(user._id)}
                        className={`px-3 py-1 rounded text-white ${
                          user.isBanned
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        {user.isBanned ? "Unban" : "Ban"}
                      </button>
                      <button
                        onClick={() => toggleAdmin(user._id)}
                        className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {user.isAdmin ? "Remove Admin" : "Make Admin"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}










// import { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import API from "../utils/api";

// export default function UserManagement() {
//   const [users, setUsers] = useState([]);

//   const fetchUsers = async () => {
//     try {
//       const res = await API.get("/admin/users");
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const toggleAdmin = async (id) => {
//     try {
//       await API.put(`/admin/users/${id}/toggle-admin`);
//       fetchUsers();
//     } catch (err) {
//       console.error("Error toggling admin:", err);
//     }
//   };

//   const toggleBan = async (id) => {
//     try {
//       await API.put(`/admin/users/${id}/toggle-ban`);
//       fetchUsers();
//     } catch (err) {
//       console.error("Error banning/unbanning user:", err);
//     }
//   };

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 bg-gray-100 min-h-screen">
//         <Navbar />
//         <div className="p-6">
//           <h2 className="text-3xl font-bold mb-4">👥 User Management</h2>

//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white rounded-lg shadow">
//               <thead>
//                 <tr className="bg-indigo-600 text-white">
//                   <th className="p-3">Name</th>
//                   <th className="p-3">Email</th>
//                   <th className="p-3">Role</th>
//                   <th className="p-3">Status</th>
//                   <th className="p-3">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user) => (
//                   <tr
//                     key={user._id}
//                     className="border-b hover:bg-gray-100 transition"
//                   >
//                     <td className="p-3">{user.name}</td>
//                     <td className="p-3">{user.email}</td>
//                     <td className="p-3">
//                       {user.isAdmin ? (
//                         <span className="text-green-600 font-semibold">
//                           Admin
//                         </span>
//                       ) : (
//                         "User"
//                       )}
//                     </td>
//                     <td className="p-3">
//                       {user.isBanned ? (
//                         <span className="text-red-500">Banned</span>
//                       ) : (
//                         <span className="text-green-500">Active</span>
//                       )}
//                     </td>
//                     <td className="p-3 flex gap-2">
//                       <button
//                         onClick={() => toggleAdmin(user._id)}
//                         className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded text-white"
//                       >
//                         {user.isAdmin ? "Remove Admin" : "Make Admin"}
//                       </button>
//                       <button
//                         onClick={() => toggleBan(user._id)}
//                         className={`px-3 py-1 rounded text-white ${
//                           user.isBanned
//                             ? "bg-green-500 hover:bg-green-600"
//                             : "bg-red-500 hover:bg-red-600"
//                         }`}
//                       >
//                         {user.isBanned ? "Unban" : "Ban"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
