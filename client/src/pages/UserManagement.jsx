import { useEffect, useState } from "react";
import axios from "axios";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("adminToken");

  const fetchUsers = () => {
    axios
      .get("/api/admin/users", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUsers(res.data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleAdmin = (id) => {
    axios
      .put(`/api/admin/users/${id}/toggle-admin`, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => fetchUsers());
  };

  const toggleBan = (id) => {
    axios
      .put(`/api/admin/users/${id}/toggle-ban`, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => fetchUsers());
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Admin?</th>
            <th className="border p-2">Banned?</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.isAdmin ? "✅" : "❌"}</td>
              <td className="border p-2">{u.isBanned ? "🚫" : "✅"}</td>
              <td className="border p-2">
                <button onClick={() => toggleAdmin(u._id)} className="bg-blue-500 text-white px-2 py-1 mr-2 rounded">
                  Toggle Admin
                </button>
                <button onClick={() => toggleBan(u._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Toggle Ban
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
