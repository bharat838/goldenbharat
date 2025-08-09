import { useEffect, useState } from "react";
import axios from "axios";

export default function PlanManagement() {
  const [plans, setPlans] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState("");
  const [editingPlan, setEditingPlan] = useState(null);

  const token = localStorage.getItem("adminToken");

  const fetchPlans = () => {
    axios
      .get("/api/admin/plans", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPlans(res.data));
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      price: Number(price),
      features: features.split(",").map((f) => f.trim()),
    };

    if (editingPlan) {
      axios
        .put(`/api/admin/plans/${editingPlan._id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          fetchPlans();
          resetForm();
        });
    } else {
      axios
        .post("/api/admin/plans", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          fetchPlans();
          resetForm();
        });
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/admin/plans/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchPlans());
  };

  const resetForm = () => {
    setTitle("");
    setPrice("");
    setFeatures("");
    setEditingPlan(null);
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setTitle(plan.title);
    setPrice(plan.price);
    setFeatures(plan.features.join(", "));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Plan Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-100 rounded-lg">
        <input
          type="text"
          placeholder="Plan Title"
          className="border p-2 mr-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 mr-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Features (comma-separated)"
          className="border p-2 mr-2"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          required
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          {editingPlan ? "Update" : "Add"}
        </button>
      </form>

      {/* Plans List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((plan) => (
          <div key={plan._id} className="p-4 border rounded-lg shadow">
            <h3 className="text-xl font-bold">{plan.title}</h3>
            <p>💰 ${plan.price}</p>
            <ul className="list-disc ml-5">
              {plan.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            <div className="mt-3">
              <button
                onClick={() => handleEdit(plan)}
                className="bg-blue-500 text-white px-3 py-1 mr-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(plan._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
