// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const API = "http://goldenbharat.railway.app/api/auth";

// export default function ForgotPassword() {
//   const navigate = useNavigate();
//   const [step, setStep] = useState("email"); // email | otp | reset
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [resetToken, setResetToken] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Step 1: Send OTP
//   const sendOtp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.post(`${API}/request-password-reset`, { email });
//       alert("OTP sent to your email.");
//       setStep("otp");
//     } catch (err) {
//       alert(err.response?.data?.error || "Error sending OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 2: Verify OTP
//   const verifyOtp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post(`${API}/verify-reset-otp`, { email, otp });
//       setResetToken(res.data.resetToken);
//       setStep("reset");
//     } catch (err) {
//       alert(err.response?.data?.error || "OTP verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 3: Reset password
//   const resetPassword = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.post(`${API}/reset-password`, { token: resetToken, newPassword });
//       alert("Password updated successfully. Please login.");
//       navigate("/login");
//     } catch (err) {
//       alert(err.response?.data?.error || "Password reset failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         {step === "email" && (
//           <>
//             <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
//             <form onSubmit={sendOtp} className="space-y-3">
//               <input
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 type="email"
//                 placeholder="Registered Email"
//                 required
//                 className="w-full px-3 py-2 border rounded"
//               />
//               <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">
//                 {loading ? "Sending..." : "Send OTP"}
//               </button>
//             </form>
//           </>
//         )}

//         {step === "otp" && (
//           <>
//             <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
//             <form onSubmit={verifyOtp} className="space-y-3">
//               <input
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 placeholder="6-digit OTP"
//                 required
//                 className="w-full px-3 py-2 border rounded"
//               />
//               <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">
//                 {loading ? "Verifying..." : "Verify OTP"}
//               </button>
//             </form>
//           </>
//         )}

//         {step === "reset" && (
//           <>
//             <h2 className="text-xl font-bold mb-4">Reset Password</h2>
//             <form onSubmit={resetPassword} className="space-y-3">
//               <input
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 type="password"
//                 placeholder="New Password"
//                 required
//                 className="w-full px-3 py-2 border rounded"
//               />
//               <button disabled={loading} className="w-full bg-green-600 text-white py-2 rounded">
//                 {loading ? "Updating..." : "Reset Password"}
//               </button>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
