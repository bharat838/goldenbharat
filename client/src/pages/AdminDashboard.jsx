/*
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PlanManagement from "./PlanManagement";
import UserManagement from "./UserManagement";
import SubscriptionAdmin from "./SubscriptionAdmin";

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    axios
      .get("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAdmin(res.data.admin))
      .catch(() => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      });
  }, [navigate]);

  if (!admin) {
    return <div className="p-6">Loading...</div>; // Optional: add a loader
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="mb-6">Welcome, {admin.name}</p>
      <PlanManagement />
      <UserManagement />
      <SubscriptionAdmin />
    </div>
  );
}
*/