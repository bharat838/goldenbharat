import { useEffect, useState } from "react";
import axios from "axios";

export default function SubscriptionAdmin() {
  const [subs, setSubs] = useState([]);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    axios
      .get("/api/admin/subscriptions", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSubs(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Subscription Monitoring</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">User</th>
            <th className="border p-2">Plan</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Start Date</th>
            <th className="border p-2">End Date</th>
          </tr>
        </thead>
        <tbody>
          {subs.map((s) => (
            <tr key={s._id}>
              <td className="border p-2">{s.user?.email}</td>
              <td className="border p-2">{s.plan?.title}</td>
              <td className="border p-2">{s.status}</td>
              <td className="border p-2">{new Date(s.startDate).toLocaleDateString()}</td>
              <td className="border p-2">{new Date(s.endDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
