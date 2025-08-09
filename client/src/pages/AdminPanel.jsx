/*
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [plans, setPlans] = useState([]);

  const fetchPlans = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/plans");
      setPlans(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch plans:", err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="min-h-screen pt-20 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Admin Panel</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {plans.map((plan) => (
          <div key={plan._id} className="bg-white p-6 rounded shadow w-80">
            <h3 className="text-xl font-bold">{plan.title}</h3>
            <p className="text-blue-600">₹{plan.price}</p>
            <ul className="text-sm text-gray-600 mt-2 mb-4">
              {plan.features.map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>
            {/* Future: Add buttons to Edit/Delete plan*///}
         // </div>
       // ))}
     // </div>
   // </div>
  //);
//};

//export default AdminPanel;
