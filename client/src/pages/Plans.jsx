// client/src/pages/Plans.jsx  dynamic
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [subscribing, setSubscribing] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const token = localStorage.getItem("token");

  // ✅ Fetch all plans from backend
  const fetchPlans = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/plans");
      setPlans(res.data || []);
    } catch (err) {
      console.error("Failed to fetch plans:", err);
    }
  };

  // ✅ Fetch user's existing subscriptions
  const fetchSubscriptions = async () => {
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:5000/api/subscription", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubscriptions(res.data || []);
    } catch (err) {
      console.error("Failed to fetch subscriptions:", err);
    }
  };

  useEffect(() => {
    fetchPlans();
    fetchSubscriptions();
  }, [token]);

  const handleSubscribe = async (plan) => {
    if (!token) {
      toast.error("🔐 Please login to subscribe.");
      return;
    }

    // ✅ Same check as backend
    const alreadySubscribed = subscriptions.some(
      (sub) =>
        sub.plan?._id === plan._id &&
        sub.status === "active" &&
        new Date(sub.expiresAt) > new Date()
    );

    if (alreadySubscribed) {
      toast.info("⚠️ You have already subscribed to this plan.");
      return;
    }

    setSubscribing(true);
    try {
      await axios.post(
        "http://localhost:5000/api/subscription/subscribe",
        { planId: plan._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(`✅ Subscribed to "${plan.title}"`);
      await fetchSubscriptions(); // refresh
    } catch (err) {
      const error = err.response?.data?.error;
      if (err.response?.status === 403 && error === "Your account is banned") {
        toast.error("🚫 Your account is banned. Please contact support.");
      } else if (
        error === "Already subscribed" ||
        error === "You have already subscribed to this plan."
      ) {
        toast.info("⚠️ You have already subscribed to this plan.");
      } else if (error === "Plan not found") {
        toast.error("❌ Plan not found.");
      } else if (error === "Plan ID is required") {
        toast.error("❌ Plan ID missing.");
      } else {
        toast.error("❌ Subscription failed. Please try again.");
      }
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-b from-white to-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-6">
        🇮🇳 Choose Your Plan to Support Bharat
      </h1>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-10">
        Your contribution supports our national heroes and innovators. Choose a plan and make a difference.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition duration-300 p-6 flex flex-col items-center text-center"
          >
            <img
              src={plan.image || "/default-plan.png"} // ✅ Add image field in backend Plan model
              alt={plan.title}
              className="w-20 h-20 object-contain mb-4"
            />
            <h2 className="text-2xl font-bold text-blue-800">{plan.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{plan.subtitle || ""}</p>

            <p className="text-xl font-semibold text-green-700 mb-3">
              ₹{plan.price}
            </p>

            <ul className="text-left text-sm text-gray-700 space-y-1 mb-6">
              {plan.features?.map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>

            <button
              disabled={subscribing}
              onClick={() => handleSubscribe(plan)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition disabled:opacity-60"
            >
              {subscribing ? "Processing..." : "Subscribe Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;



// client/src/pages/Plans.jsx static
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Plans = () => {
//   const [plans, setPlans] = useState([]);
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [subscribing, setSubscribing] = useState(false);
//   const token = localStorage.getItem("token");

//   // ✅ Fetch plans from backend
//   const fetchPlans = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/plans");
//       setPlans(res.data);
//     } catch (err) {
//       console.error("Failed to fetch plans:", err);
//     }
//   };

//   // ✅ Fetch user's subscriptions
//   const fetchSubscriptions = async () => {
//     if (!token) return;
//     try {
//       const res = await axios.get("http://localhost:5000/api/subscription", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSubscriptions(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch subscriptions:", err);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//     fetchSubscriptions();
//   }, [token]);

//   // ✅ Subscribe
//   const handleSubscribe = async (plan) => {
//     if (!token) {
//       toast.error("🔐 Please login to subscribe.");
//       return;
//     }

//     const alreadySubscribed = subscriptions.some(
//       (sub) =>
//         sub.plan?._id === plan._id &&
//         sub.status === "active" &&
//         new Date(sub.expiresAt) > new Date()
//     );

//     if (alreadySubscribed) {
//       toast.info("⚠️ You have already subscribed to this plan.");
//       return;
//     }

//     setSubscribing(true);
//     try {
//       await axios.post(
//         "http://localhost:5000/api/subscription/subscribe",
//         { planId: plan._id }, // ✅ Correct field
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast.success(`✅ Subscribed to "${plan.title}"`);
//       fetchSubscriptions();
//     } catch (err) {
//       const error = err.response?.data?.error;
//       if (error === "Your account is banned") {
//         toast.error("🚫 Your account is banned. Please contact support.");
//       } else if (error === "Already subscribed") {
//         toast.info("⚠️ You have already subscribed to this plan.");
//       } else {
//         toast.error("❌ Subscription failed.");
//       }
//     } finally {
//       setSubscribing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-b from-white to-gray-100">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <h1 className="text-4xl font-bold text-center text-indigo-800 mb-6">
//         🇮🇳 Choose Your Plan to Support Bharat
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//         {plans.map((plan) => (
//           <div
//             key={plan._id}
//             className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition duration-300 p-6 flex flex-col items-center text-center"
//           >
//             {plan.image && (
//               <img
//                 src={plan.image}
//                 alt={plan.title}
//                 className="w-20 h-20 object-contain mb-4"
//               />
//             )}
//             <h2 className="text-2xl font-bold text-blue-800">{plan.title}</h2>
//             <p className="text-xl font-semibold text-green-700 mb-3">
//               ₹{plan.price}
//             </p>
//             <ul className="text-left text-sm text-gray-700 space-y-1 mb-6">
//               {plan.features?.map((f, i) => (
//                 <li key={i}>• {f}</li>
//               ))}
//             </ul>
//             <button
//               disabled={subscribing}
//               onClick={() => handleSubscribe(plan)}
//               className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition disabled:opacity-60"
//             >
//               {subscribing ? "Processing..." : "Subscribe Now"}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Plans;



























//-----for testing ------

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Plans = () => {
//   const [plans, setPlans] = useState([]);
//   const [subscribingId, setSubscribingId] = useState(""); // ✅ Track loading plan

//   const fetchPlans = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/plans");
//       setPlans(res.data);
//     } catch (err) {
//       console.error("❌ Failed to fetch plans:", err);
//     }
//   };

//   const handleSubscribe = async (planId) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return alert("Please log in first.");

//       setSubscribingId(planId); // ✅ Start loading for specific plan

//       const res = await axios.post(
//         "http://localhost:5000/api/subscription",
//         { planId },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       alert("✅ " + res.data.message);
//     } catch (err) {
//       alert("❌ Subscribe failed: " + (err.response?.data?.error || "Server error"));
//     } finally {
//       setSubscribingId(""); // ✅ Stop loading
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   return (
//     <div className="min-h-screen pt-20 px-4 bg-gray-100">
//       <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Available Plans</h2>

//       <div className="flex flex-wrap justify-center gap-6">
//         {plans.length === 0 ? (
//           <p className="text-gray-500 text-center">No plans available.</p>
//         ) : (
//           plans.map((plan) => (
//             <div
//               key={plan._id}
//               className="bg-white rounded-xl shadow-md p-6 w-80 hover:shadow-xl transition duration-300 transform hover:scale-105"
//             >
//               <h3 className="text-xl font-bold text-gray-800">{plan.title}</h3>
//               <p className="text-blue-600 font-semibold mt-1">₹{plan.price}</p>

//               <ul className="mt-3 mb-4 text-sm text-gray-600 space-y-1">
//                 {Array.isArray(plan.features) &&
//                   plan.features.map((f, i) => <li key={i}>• {f}</li>)}
//               </ul>

//               <button
//                 onClick={() => handleSubscribe(plan._id)}
//                 disabled={subscribingId === plan._id}
//                 className={`w-full text-white py-2 rounded transition ${
//                   subscribingId === plan._id
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-yellow-500 hover:bg-yellow-600"
//                 }`}
//               >
//                 {subscribingId === plan._id ? "Subscribing..." : "Subscribe"}
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Plans;
