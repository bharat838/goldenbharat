import React, { useState, useEffect } from "react";
import axios from "axios";

const Account = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [form, setForm] = useState({ name: "" });
  const [passForm, setPassForm] = useState({ newPass: "", confirm: "" });

  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://goldenbharat.railway.app/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setForm({ name: res.data.name || "" });
    } catch (err) {
  if (err.response?.status === 403 && err.response.data?.error === "Your account is banned") {
    toast.error("🚫 Your account is banned. Please contact support.");
    return;
  }
  console.error("Failed to load account:", err);
}
  };

  const handleSave = async () => {
    try {
      await axios.put("http://goldenbharat.railway.app/api/auth/update", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Name updated");
      setEditMode(false);
      fetchUser();
    } catch (err) {
      alert("❌ Update failed: " + (err.response?.data?.error || "Server error"));
    }
  };

  const handlePasswordChange = async () => {
    const { newPass, confirm } = passForm;
    if (newPass !== confirm) return alert("❌ Passwords do not match");

    try {
      await axios.put(
        "http://goldenbharat.railway.app/api/auth/update-password",
        { newPassword: newPass },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("✅ Password changed");
      setPassForm({ newPass: "", confirm: "" });
      setChangePasswordVisible(false);
    } catch (err) {
      alert("❌ Failed: " + (err.response?.data?.error || "Server error"));
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="pt-24 px-4 min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-100 text-gray-800">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8 border border-blue-200 relative">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/17/Ashoka_Chakra.svg"
          alt="Ashoka Chakra"
          className="w-8 h-8 absolute top-4 right-4 opacity-80"
        />
        <h2 className="text-3xl font-bold mb-2 text-center text-blue-900">Account Details</h2>
        <p className="text-sm text-center text-gray-500 italic mb-6">
          "Empowering knowledge, inspired by India's strength."
        </p>

        {user ? (
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name:</label>
              {editMode ? (
                <input
                  className="w-full border px-3 py-2 rounded"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              ) : (
                <p>{user.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email:</label>
              <p className="text-gray-600">{user.email}</p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone:</label>
              <p className="text-gray-600">{user.phone || "N/A"}</p>
            </div>

            {/* DOB */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth:</label>
              <p className="text-gray-600">
                {user.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col items-center space-y-4 pt-6">
              {editMode ? (
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Save Name
                </button>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
                >
                  Edit Name
                </button>
              )}

              <button
                onClick={() => setChangePasswordVisible(!changePasswordVisible)}
                className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900"
              >
                {changePasswordVisible ? "Cancel" : "Change Password"}
              </button>
            </div>

            {/* Change Password Section */}
            {changePasswordVisible && (
              <div className="mt-4 space-y-3 animate-fade-in">
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full border px-3 py-2 rounded"
                  value={passForm.newPass}
                  onChange={(e) => setPassForm({ ...passForm, newPass: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full border px-3 py-2 rounded"
                  value={passForm.confirm}
                  onChange={(e) => setPassForm({ ...passForm, confirm: e.target.value })}
                />
                <button
                  onClick={handlePasswordChange}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
                >
                  Update Password
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading account info...</p>
        )}
      </div>
    </div>
  );
};

export default Account;










// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Account = () => {
//   const [user, setUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [changePasswordVisible, setChangePasswordVisible] = useState(false);

//   const [form, setForm] = useState({ name: "" });
//   const [passForm, setPassForm] = useState({ newPass: "", confirm: "" });

//   const token = localStorage.getItem("token");

//   const fetchUser = async () => {
//     try {
//       const res = await axios.get("http://goldenbharat.railway.app/api/auth/user", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data);
//       setForm({ name: res.data.name || "" });
//     } catch (err) {
//       console.error("❌ Failed to fetch user:", err);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put("http://goldenbharat.railway.app/api/auth/update", form, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("✅ Name updated");
//       setEditMode(false);
//       fetchUser();
//     } catch (err) {
//       alert("❌ Update failed: " + (err.response?.data?.error || "Server error"));
//     }
//   };

//   const handlePasswordChange = async () => {
//     const { newPass, confirm } = passForm;

//     if (newPass !== confirm) return alert("❌ Passwords do not match");

//     try {
//       await axios.put(
//         "http://goldenbharat.railway.app/api/auth/update-password",
//         { newPassword: newPass },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert("✅ Password changed");
//       setPassForm({ newPass: "", confirm: "" });
//       setChangePasswordVisible(false);
//     } catch (err) {
//       alert("❌ Failed: " + (err.response?.data?.error || "Server error"));
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <div className="pt-24 px-4 min-h-screen bg-gray-100 text-gray-800">
//       <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8">
//         <h2 className="text-3xl font-bold mb-6 text-center">Account Details</h2>

//         {user ? (
//           <div className="space-y-4">
//             {/* Name */}
//             <div>
//               <label className="block text-sm font-medium">Name:</label>
//               {editMode ? (
//                 <input
//                   className="w-full border px-3 py-2 rounded"
//                   value={form.name}
//                   onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 />
//               ) : (
//                 <p>{user.name}</p>
//               )}
//             </div>

//             {/* Email (readonly) */}
//             <div>
//               <label className="block text-sm font-medium">Email:</label>
//               <p>{user.email}</p>
//             </div>

//             {/* Phone (readonly) */}
//             <div>
//               <label className="block text-sm font-medium">Phone:</label>
//               <p>{user.phone || "N/A"}</p>
//             </div>

//             {/* DOB (readonly) */}
//             <div>
//               <label className="block text-sm font-medium">Date of Birth:</label>
//               <p>{user.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}</p>
//             </div>

//             {/* Buttons */}
//             <div className="flex flex-col items-center space-y-4 pt-6">
//               {editMode ? (
//                 <button
//                   onClick={handleSave}
//                   className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//                 >
//                   Save Changes
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => setEditMode(true)}
//                   className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
//                 >
//                   Edit Name
//                 </button>
//               )}

//               <button
//                 onClick={() => setChangePasswordVisible(!changePasswordVisible)}
//                 className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900"
//               >
//                 {changePasswordVisible ? "Cancel" : "Change Password"}
//               </button>
//             </div>

//             {/* Password Section */}
//             {changePasswordVisible && (
//               <div className="mt-4 space-y-3 animate-fade-in">
//                 <input
//                   type="password"
//                   placeholder="New Password"
//                   className="w-full border px-3 py-2 rounded"
//                   value={passForm.newPass}
//                   onChange={(e) => setPassForm({ ...passForm, newPass: e.target.value })}
//                 />
//                 <input
//                   type="password"
//                   placeholder="Confirm New Password"
//                   className="w-full border px-3 py-2 rounded"
//                   value={passForm.confirm}
//                   onChange={(e) => setPassForm({ ...passForm, confirm: e.target.value })}
//                 />
//                 <button
//                   onClick={handlePasswordChange}
//                   className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
//                 >
//                   Update Password
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <p className="text-center text-gray-400">Loading...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Account;


//------ for testing --------------

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Account = () => {
//   const [user, setUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [changePasswordVisible, setChangePasswordVisible] = useState(false);
//   const [form, setForm] = useState({ name: "", dob: "" });
//   const [passForm, setPassForm] = useState({ newPass: "", confirm: "" });

//   const token = localStorage.getItem("token");

//   const fetchUser = async () => {
//     try {
//       const res = await axios.get("http://goldenbharat.railway.app/api/auth/user", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data);
//       setForm({
//         name: res.data.name || "",
//         dob: res.data.dob || "",
//       });
//     } catch (err) {
//       console.error("Failed to fetch user:", err);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const res = await axios.put(
//         "http://goldenbharat.railway.app/api/auth/update",
//         form,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert("✅ Account updated");
//       setEditMode(false);
//       fetchUser();
//     } catch (err) {
//       alert("❌ Update failed: " + (err.response?.data?.error || "Server error"));
//     }
//   };

//   const handlePasswordChange = async () => {
//     if (passForm.newPass !== passForm.confirm) {
//       alert("❌ Passwords do not match");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://goldenbharat.railway.app/api/auth/update-password",
//         { currentPassword,newPassword},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert("✅ Password changed");
//       setPassForm({ newPass: "", confirm: "" });
//     } catch (err) {
//       alert("❌ Failed: " + (err.response?.data?.error || "Server error"));
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <div className="pt-24 px-4 min-h-screen bg-gray-100 text-gray-800">
//       <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8">
//         <h2 className="text-3xl font-bold mb-6 text-center">Account Details</h2>

//         {user ? (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium">Name:</label>
//               {editMode ? (
//                 <input
//                   className="w-full border px-3 py-2 rounded"
//                   value={form.name}
//                   onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 />
//               ) : (
//                 <p>{user.name}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Email:</label>
//               <p>{user.email}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Phone:</label>
//               <p>{user.phone || "N/A"}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Date of Birth:</label>
//               {editMode ? (
//                 <input
//                   type="date"
//                   className="w-full border px-3 py-2 rounded"
//                   value={form.dob}
//                   onChange={(e) => setForm({ ...form, dob: e.target.value })}
//                 />
//               ) : (
//                <p>{user.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}</p>

//               )}
//             </div>

//             {/* ✅ Bottom Buttons Centered */}
//             <div className="flex flex-col items-center space-y-4 pt-6">
//               {editMode ? (
//                 <button
//                   onClick={handleSave}
//                   className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//                 >
//                   Save Changes
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => setEditMode(true)}
//                   className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
//                 >
//                   Edit
//                 </button>
//               )}

//               <button
//                 onClick={() => setChangePasswordVisible(!changePasswordVisible)}
//                 className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900"
//               >
//                 {changePasswordVisible ? "Cancel" : "Change Password"}
//               </button>
//             </div>

//             {/* 🔐 Change Password Section */}
//             {changePasswordVisible && (
//               <div className="mt-4 space-y-3 animate-fade-in">
//                 <input
//                   type="password"
//                   placeholder="New Password"
//                   className="w-full border px-3 py-2 rounded"
//                   value={passForm.newPass}
//                   onChange={(e) => setPassForm({ ...passForm, newPass: e.target.value })}
//                 />
//                 <input
//                   type="password"
//                   placeholder="Confirm New Password"
//                   className="w-full border px-3 py-2 rounded"
//                   value={passForm.confirm}
//                   onChange={(e) => setPassForm({ ...passForm, confirm: e.target.value })}
//                 />
//                 <button
//                   onClick={handlePasswordChange}
//                   className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
//                 >
//                   Update Password
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Account;
