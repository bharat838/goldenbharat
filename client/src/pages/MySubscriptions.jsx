// client/src/pages/MySubscriptions.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://goldenbharat.railway.app/api/certificate";


async function downloadCertificate(planId, planName, userName, startDate, expiryDate) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    // 1) generate certificate (protected route)
    const genRes = await axios.post(
      `${API}/generate`,
      { planId, planName, userName, startDate, expiryDate },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!genRes.data || !genRes.data.fileName) {
      throw new Error("Certificate generation failed");
    }

    const fileName = genRes.data.fileName;

    // 2) download certificate file as blob (usually static files don’t need auth headers)
    const fileUrl = `http://goldenbharat.railway.app/uploads/certificates/${encodeURIComponent(fileName)}`;
    const downloadRes = await axios.get(fileUrl, {
      responseType: "blob",
      // headers: { Authorization: `Bearer ${token}` },  // Remove if static files not protected
    });

    // 3) create blob and trigger browser download
    const blob = new Blob([downloadRes.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    const safeFileName = `${planName.replace(/\s+/g, "_")}_${userName.replace(/\s+/g, "_")}.pdf`;
    a.href = url;
    a.download = safeFileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

  } catch (err) {
    console.error("Certificate download error:", err);
    const message = err?.response?.data?.error || err.message || "Could not download certificate";
    alert(message);
  }
}



const MySubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = storedUser.name || "user";

  const fetchSubscriptions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get("http://goldenbharat.railway.app/api/subscription", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSubscriptions(res.data || []);
    } catch (err) {
      if (
        err.response?.status === 403 &&
        err.response.data?.error === "Your account is banned"
      ) {
        alert("🚫 Your account is banned. Please contact support.");
        return;
      }
      console.error("Failed to load subscriptions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleUnsubscribe = async (planId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://goldenbharat.railway.app/api/subscription/unsubscribe",
        { planId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("✅ Unsubscribed successfully");
      fetchSubscriptions();
    } catch (err) {
      alert(
        "❌ Unsubscribe failed: " +
          (err.response?.data?.error || "Server error")
      );
    }
  };

  const now = new Date();
  const activeSubs = subscriptions.filter(
    (sub) => sub.plan && new Date(sub.expiresAt) > now
  );
  const historySubs = subscriptions.filter(
    (sub) => sub.plan && new Date(sub.expiresAt) <= now
  );

  return (
    <div className="min-h-screen pt-20 px-4 bg-gradient-to-br from-orange-50 via-white to-green-100">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-blue-900">My Subscriptions</h2>
        <p className="text-sm text-gray-600 mt-2 italic">
          “Only the brave support knowledge. Only the wise invest in it.” – Inspired by our heroes
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Loading subscriptions...</p>
      ) : (
        <>
          {/* ACTIVE */}
          <div className="mb-12">
            <h3 className="text-2xl text-center text-green-800 font-semibold mb-6">
              Active Subscriptions
            </h3>
            {activeSubs.length === 0 ? (
              <p className="text-center text-gray-500">You have no active subscriptions.</p>
            ) : (
              <div className="flex flex-wrap justify-center gap-6">
                {activeSubs.map((sub) => {
                  const title = sub.snapshot?.title || sub.plan?.title;
                  const price = sub.snapshot?.price || sub.plan?.price;
                  const features = sub.snapshot?.features || sub.plan?.features || [];

                  return (
                    <div
                      key={sub._id}
                      className="bg-white border border-blue-200 rounded-xl shadow-md p-6 w-80 relative hover:shadow-xl transition"
                    >
                      <img
                        src="/ashok-chakra.png"
                        alt="Ashoka Chakra"
                        className="w-8 h-8 absolute top-3 right-3"
                      />
                      <h3 className="text-xl font-bold text-blue-800">{title}</h3>
                      <p className="text-green-700 font-semibold mt-1">₹{price}</p>
                      <ul className="mt-3 mb-4 text-sm text-gray-700 space-y-1">
                        {features.map((f, i) => (
                          <li key={i}>• {f}</li>
                        ))}
                      </ul>
                      <p className="text-sm text-gray-600">
                        <strong>Subscribed:</strong>{" "}
                        {new Date(sub.subscribedAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Expires:</strong>{" "}
                        {new Date(sub.expiresAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        <strong>Payment ID:</strong> {sub.paymentId}
                      </p>

                      {sub.status === "unsubscribed" ? (
                        <button
                          disabled
                          className="mt-4 px-4 py-2 bg-gray-400 text-white rounded w-full cursor-not-allowed"
                        >
                          Unsubscribed
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnsubscribe(sub.plan._id)}
                          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-full"
                        >
                          Unsubscribe
                        </button>
                      )}

                      {/* Download Certificate Button */}
                     <button
                       onClick={() => {
                        const token = localStorage.getItem("token");
               // use stored user name or req.user from local storage
                         const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
                         const userName = storedUser.name || "user";
                         downloadCertificate(sub.plan?._id, title, userName, sub.expiresAt);
                       }}
                       className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
                      >
                       Download Certificate
                      </button>
                      <p className="text-xs text-center text-gray-400 mt-2">
                        Subscription will move to history after expiry.
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* HISTORY */}
          <div className="border-t pt-10">
            <h3 className="text-2xl text-center text-gray-800 font-semibold mb-6">
              Subscription History
            </h3>
            {historySubs.length === 0 ? (
              <p className="text-center text-gray-500">No history available.</p>
            ) : (
              <div className="flex flex-wrap justify-center gap-6">
                {historySubs.map((sub) => {
                  const title = sub.snapshot?.title || sub.plan?.title;
                  const price = sub.snapshot?.price || sub.plan?.price;
                  const features = sub.snapshot?.features || sub.plan?.features || [];

                  return (
                    <div
                      key={sub._id}
                      className="bg-gray-100 border border-gray-300 rounded-xl p-6 w-80"
                    >
                      <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
                      <p className="text-sm text-gray-700 mt-1">₹{price}</p>
                      <ul className="mt-2 mb-3 text-xs text-gray-700 space-y-1">
                        {features.map((f, i) => (
                          <li key={i}>• {f}</li>
                        ))}
                      </ul>
                      <p className="text-xs text-gray-700">
                        <strong>Subscribed:</strong>{" "}
                        {new Date(sub.subscribedAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-700">
                        <strong>Expired:</strong>{" "}
                        {new Date(sub.expiresAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        <strong>Payment ID:</strong> {sub.paymentId}
                      </p>
                      <p className="text-xs text-center text-gray-500 italic mt-2">
                        This subscription has ended
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MySubscriptions;





//************certificate updated */

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const MySubscriptions = () => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchSubscriptions = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const res = await axios.get("http://goldenbharat.railway.app/api/subscription", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setSubscriptions(res.data || []);
//     } catch (err) {
//   if (err.response?.status === 403 && err.response.data?.error === "Your account is banned") {
//     toast.error("🚫 Your account is banned. Please contact support.");
//     return;
//   }
//   console.error("Failed to load subscriptions:", err);
// }
    
//     finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSubscriptions();
//   }, []);

//   const handleUnsubscribe = async (planId) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "http://goldenbharat.railway.app/api/subscription/unsubscribe",
//         { planId },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert("✅ Unsubscribed successfully");
//       fetchSubscriptions();
//     } catch (err) {
//       alert("❌ Unsubscribe failed: " + (err.response?.data?.error || "Server error"));
//     }
//   };

//   const now = new Date();
//   const activeSubs = subscriptions.filter(sub => sub.plan && new Date(sub.expiresAt) > now);
//   const historySubs = subscriptions.filter(sub => sub.plan && new Date(sub.expiresAt) <= now);

//   return (
//     <div className="min-h-screen pt-20 px-4 bg-gradient-to-br from-orange-50 via-white to-green-100">
//       <div className="text-center mb-10">
//         <h2 className="text-4xl font-bold text-blue-900">My Subscriptions</h2>
//         <p className="text-sm text-gray-600 mt-2 italic">
//           “Only the brave support knowledge. Only the wise invest in it.” – Inspired by our heroes
//         </p>
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-400">Loading subscriptions...</p>
//       ) : (
//         <>
//           {/* ACTIVE */}
//           <div className="mb-12">
//             <h3 className="text-2xl text-center text-green-800 font-semibold mb-6">
//               Active Subscriptions
//             </h3>
//             {activeSubs.length === 0 ? (
//               <p className="text-center text-gray-500">You have no active subscriptions.</p>
//             ) : (
//               <div className="flex flex-wrap justify-center gap-6">
//                 {activeSubs.map((sub) => {
//                   const title = sub.snapshot?.title || sub.plan?.title;
//                   const price = sub.snapshot?.price || sub.plan?.price;
//                   const features = sub.snapshot?.features || sub.plan?.features || [];

//                   return (
//                     <div
//                       key={sub._id}
//                       className="bg-white border border-blue-200 rounded-xl shadow-md p-6 w-80 relative hover:shadow-xl transition"
//                     >
//                       <img
//                         src="/ashok-chakra.png"
//                         alt="Ashoka Chakra"
//                         className="w-8 h-8 absolute top-3 right-3"
//                       />
//                       <h3 className="text-xl font-bold text-blue-800">{title}</h3>
//                       <p className="text-green-700 font-semibold mt-1">₹{price}</p>
//                       <ul className="mt-3 mb-4 text-sm text-gray-700 space-y-1">
//                         {features.map((f, i) => (
//                           <li key={i}>• {f}</li>
//                         ))}
//                       </ul>
//                       <p className="text-sm text-gray-600">
//                         <strong>Subscribed:</strong>{" "}
//                         {new Date(sub.subscribedAt).toLocaleDateString()}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         <strong>Expires:</strong>{" "}
//                         {new Date(sub.expiresAt).toLocaleDateString()}
//                       </p>
//                       <p className="text-xs text-gray-500 truncate">
//                         <strong>Payment ID:</strong> {sub.paymentId}
//                       </p>

//                       {sub.status === "unsubscribed" ? (
//                         <button
//                           disabled
//                           className="mt-4 px-4 py-2 bg-gray-400 text-white rounded w-full cursor-not-allowed"
//                         >
//                           Unsubscribed
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => handleUnsubscribe(sub.plan._id)}
//                           className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-full"
//                         >
//                           Unsubscribe
//                         </button>
//                       )}

//                       <p className="text-xs text-center text-gray-400 mt-2">
//                         Subscription will move to history after expiry.
//                       </p>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* HISTORY */}
//           <div className="border-t pt-10">
//             <h3 className="text-2xl text-center text-gray-800 font-semibold mb-6">
//               Subscription History
//             </h3>
//             {historySubs.length === 0 ? (
//               <p className="text-center text-gray-500">No history available.</p>
//             ) : (
//               <div className="flex flex-wrap justify-center gap-6">
//                 {historySubs.map((sub) => {
//                   const title = sub.snapshot?.title || sub.plan?.title;
//                   const price = sub.snapshot?.price || sub.plan?.price;
//                   const features = sub.snapshot?.features || sub.plan?.features || [];

//                   return (
//                     <div
//                       key={sub._id}
//                       className="bg-gray-100 border border-gray-300 rounded-xl p-6 w-80"
//                     >
//                       <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
//                       <p className="text-sm text-gray-700 mt-1">₹{price}</p>
//                       <ul className="mt-2 mb-3 text-xs text-gray-700 space-y-1">
//                         {features.map((f, i) => (
//                           <li key={i}>• {f}</li>
//                         ))}
//                       </ul>
//                       <p className="text-xs text-gray-700">
//                         <strong>Subscribed:</strong>{" "}
//                         {new Date(sub.subscribedAt).toLocaleDateString()}
//                       </p>
//                       <p className="text-xs text-gray-700">
//                         <strong>Expired:</strong>{" "}
//                         {new Date(sub.expiresAt).toLocaleDateString()}
//                       </p>
//                       <p className="text-xs text-gray-600 truncate">
//                         <strong>Payment ID:</strong> {sub.paymentId}
//                       </p>
//                       <p className="text-xs text-center text-gray-500 italic mt-2">
//                         This subscription has ended
//                       </p>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default MySubscriptions;

























//------test new plan--------

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const MySubscriptions = () => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchSubscriptions = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const res = await axios.get("http://goldenbharat.railway.app/api/subscription", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setSubscriptions(res.data || []);
//     } catch (err) {
//       console.error("❌ Failed to fetch subscriptions:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSubscriptions();
//   }, []);

//   const handleUnsubscribe = async (planId) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "http://goldenbharat.railway.app/api/subscription/unsubscribe",
//         { planId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("✅ Unsubscribed successfully");
//       fetchSubscriptions();
//     } catch (err) {
//       alert("❌ Unsubscribe failed: " + (err.response?.data?.error || "Server error"));
//     }
//   };

//   const now = new Date();

//   const activeSubs = subscriptions.filter(
//     (sub) => sub.plan && new Date(sub.expiresAt) > now
//   );

//   const historySubs = subscriptions.filter(
//     (sub) => sub.plan && new Date(sub.expiresAt) <= now
//   );

//   return (
//     <div className="min-h-screen pt-20 px-4 bg-gradient-to-br from-orange-50 via-white to-green-100">
//       <div className="text-center mb-10">
//         <h2 className="text-4xl font-bold text-blue-900">My Subscriptions</h2>
//         <p className="text-sm text-gray-600 mt-2 italic">
//           “Only the brave support knowledge. Only the wise invest in it.” – Inspired by our heroes
//         </p>
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-400">Loading subscriptions...</p>
//       ) : (
//         <>
//           {/* 🔵 ACTIVE SUBSCRIPTIONS */}
//           <div className="mb-12">
//             <h3 className="text-2xl text-center text-green-800 font-semibold mb-6">Active Subscriptions</h3>
//             {activeSubs.length === 0 ? (
//               <p className="text-center text-gray-500">You have no active subscriptions.</p>
//             ) : (
//               <div className="flex flex-wrap justify-center gap-6">
//                 {activeSubs.map((sub) => (
//                   <div
//                     key={sub._id}
//                     className="bg-white border border-blue-200 rounded-xl shadow-md p-6 w-80 relative hover:shadow-xl transition"
//                   >
//                     <img
//                       src="https://upload.wikimedia.org/wikipedia/commons/1/17/Ashoka_Chakra.svg"
//                       alt="Ashoka Chakra"
//                       className="w-8 h-8 absolute top-3 right-3"
//                     />

//                     <h3 className="text-xl font-bold text-blue-800">
//                       {sub.plan?.title || "Plan Title"}
//                     </h3>
//                     <p className="text-green-700 font-semibold mt-1">
//                       ₹{sub.plan?.price || "N/A"}
//                     </p>

//                     <ul className="mt-3 mb-4 text-sm text-gray-700 space-y-1">
//                       {Array.isArray(sub.plan?.features) &&
//                         sub.plan.features.map((f, i) => <li key={i}>• {f}</li>)}
//                     </ul>

//                     <p className="text-sm text-gray-600">
//                       <strong>Subscribed:</strong>{" "}
//                       {new Date(sub.subscribedAt).toLocaleDateString()}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       <strong>Expires:</strong>{" "}
//                       {new Date(sub.expiresAt).toLocaleDateString()}
//                     </p>
//                     <p className="text-xs text-gray-500 truncate">
//                       <strong>Payment ID:</strong> {sub.paymentId || "N/A"}
//                     </p>

//                     {sub.status === "unsubscribed" ? (
//                       <button
//                         disabled
//                         className="mt-4 px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed w-full"
//                       >
//                         Unsubscribed
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => handleUnsubscribe(sub.plan._id)}
//                         className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-full"
//                       >
//                         Unsubscribe
//                       </button>
//                     )}
//                     <p className="text-xs text-center text-gray-400 mt-2">
//                       Subscription will move to history after expiry.
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* 🟠 HISTORY SECTION */}
//           <div className="border-t pt-10">
//             <h3 className="text-2xl text-center text-gray-800 font-semibold mb-6">
//               Subscription History
//             </h3>

//             {historySubs.length === 0 ? (
//               <p className="text-center text-gray-500">No history available.</p>
//             ) : (
//               <div className="flex flex-wrap justify-center gap-6">
//                 {historySubs.map((sub) => (
//                   <div
//                     key={sub._id}
//                     className="bg-gray-100 border border-gray-300 rounded-xl p-6 w-80"
//                   >
//                     <h4 className="text-lg font-semibold text-gray-800">
//                       {sub.plan?.title || "Title N/A"}
//                     </h4>
//                     <p className="text-sm text-gray-700 mt-1">
//                       ₹{sub.plan?.price || "N/A"}
//                     </p>

//                     <ul className="mt-2 mb-3 text-xs text-gray-700 space-y-1">
//                       {Array.isArray(sub.plan?.features) &&
//                         sub.plan.features.map((f, i) => <li key={i}>• {f}</li>)}
//                     </ul>

//                     <p className="text-xs text-gray-700">
//                       <strong>Subscribed:</strong>{" "}
//                       {new Date(sub.subscribedAt).toLocaleDateString()}
//                     </p>
//                     <p className="text-xs text-gray-700">
//                       <strong>Expired:</strong>{" "}
//                       {new Date(sub.expiresAt).toLocaleDateString()}
//                     </p>
//                     <p className="text-xs text-gray-600 truncate">
//                       <strong>Payment ID:</strong> {sub.paymentId || "N/A"}
//                     </p>
//                     <p className="text-xs text-center text-gray-500 italic mt-2">
//                       This subscription has ended
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default MySubscriptions;







//-------- for testing ------

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const MySubscriptions = () => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchSubscriptions = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const res = await axios.get("http://goldenbharat.railway.app/api/subscription", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setSubscriptions(res.data || []);
//     } catch (err) {
//       console.error("❌ Failed to fetch subscriptions:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSubscriptions();
//   }, []);

//   const handleUnsubscribe = async (planId) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "http://goldenbharat.railway.app/api/subscription/unsubscribe",
//         { planId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}` },
//         }
//       );

//       alert("✅ Unsubscribed successfully");
//       fetchSubscriptions(); // refresh data
//     } catch (err) {
//       alert("❌ Unsubscribe failed: " + (err.response?.data?.error || "Server error"));
//     }
//   };

//   const now = new Date();

//   const activeSubs = subscriptions.filter(
//     (sub) =>
//       sub.plan &&
//       new Date(sub.expiresAt) > now
//   );

//   const historySubs = subscriptions.filter(
//     (sub) =>
//       sub.plan &&
//       new Date(sub.expiresAt) <= now
//   );

//   return (
//     <div className="min-h-screen pt-20 bg-gray-100 px-4">
//       <h2 className="text-3xl font-bold text-center mb-8">My Subscriptions</h2>

//       {loading ? (
//         <p className="text-center text-gray-400">Loading...</p>
//       ) : (
//         <>
//           {/* 🔵 ACTIVE SUBSCRIPTIONS */}
//           <div className="mb-12">
//             {activeSubs.length === 0 ? (
//               <p className="text-center text-gray-500">You have no active subscriptions.</p>
//             ) : (
//               <div className="flex flex-wrap justify-center gap-6">
//                 {activeSubs.map((sub) => (
//                   <div
//                     key={sub._id}
//                     className="bg-white rounded-xl shadow p-6 w-80 hover:shadow-lg transition"
//                   >
//                     <h3 className="text-xl font-semibold text-gray-800">
//                       {sub.plan?.title || "Plan Title N/A"}
//                     </h3>
//                     <p className="text-blue-600 font-medium mt-1">₹{sub.plan?.price || "N/A"}</p>

//                     <ul className="mt-3 mb-4 text-sm text-gray-600 space-y-1">
//                       {Array.isArray(sub.plan?.features) &&
//                         sub.plan.features.map((f, i) => <li key={i}>• {f}</li>)}
//                     </ul>

//                     <p className="text-sm text-gray-500">
//                       <strong>Subscribed:</strong>{" "}
//                       {new Date(sub.subscribedAt).toLocaleDateString()}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       <strong>Expires:</strong>{" "}
//                       {new Date(sub.expiresAt).toLocaleDateString()}
//                     </p>
//                     <p className="text-sm text-gray-500 truncate">
//                       <strong>Payment ID:</strong> {sub.paymentId || "N/A"}
//                     </p>

//                     {sub.status === "unsubscribed" ? (
//                       <button
//                         disabled
//                         className="mt-4 px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
//                       >
//                         Unsubscribed
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => handleUnsubscribe(sub.plan._id)}
//                         className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                       >
//                         Unsubscribe
//                       </button>
//                     )}

//                     <p className="text-xs text-gray-500 mt-2">
//                       After expiry, this subscription will move to history.
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* 🟠 HISTORY SECTION */}
//           <div className="border-t pt-10">
//             <h3 className="text-2xl font-bold text-center text-gray-700 mb-6">Subscription History</h3>

//             {historySubs.length === 0 ? (
//               <p className="text-center text-gray-400">No history available.</p>
//             ) : (
//               <div className="flex flex-wrap justify-center gap-6">
//                 {historySubs.map((sub) => (
//                   <div
//                     key={sub._id}
//                     className="bg-gray-200 rounded-xl shadow p-6 w-80"
//                   >
//                     <h4 className="text-lg font-semibold text-gray-700">
//                       {sub.plan?.title || "Title N/A"}
//                     </h4>
//                     <p className="text-sm text-gray-600 mt-1">₹{sub.plan?.price || "N/A"}</p>

//                     <ul className="mt-2 mb-3 text-xs text-gray-700 space-y-1">
//                       {Array.isArray(sub.plan?.features) &&
//                         sub.plan.features.map((f, i) => <li key={i}>• {f}</li>)}
//                     </ul>

//                     <p className="text-xs text-gray-600">
//                       <strong>Subscribed:</strong>{" "}
//                       {new Date(sub.subscribedAt).toLocaleDateString()}
//                     </p>
//                     <p className="text-xs text-gray-600">
//                       <strong>Expired:</strong>{" "}
//                       {new Date(sub.expiresAt).toLocaleDateString()}
//                     </p>
//                     <p className="text-xs text-gray-600 truncate">
//                       <strong>Payment ID:</strong> {sub.paymentId || "N/A"}
//                     </p>
//                     <p className="text-xs text-gray-500 mt-2 italic text-center">This plan has ended</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default MySubscriptions;
