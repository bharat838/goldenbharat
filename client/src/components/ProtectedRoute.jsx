// client/src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading, banned, logout } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  // 🚫 If banned user → logout & redirect
  if (banned || user?.status === "banned") {
    logout();
    return <Navigate to="/login" replace />;
  }

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;



// import React, { useContext, useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { toast } from "react-toastify";

// function ProtectedRoute({ children }) {
//   const { user, loading, logout } = useContext(AuthContext);

//   // Loading state → show spinner
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
//       </div>
//     );
//   }

//   // No user → redirect to login
//   if (!user) {
//     toast.error("Please login to continue.");
//     return <Navigate to="/login" replace />;
//   }

//   // Banned user → logout + redirect
//   if (user.status === "banned") {
//     //toast.error("🚫 Your account is banned. Please contact support.");
//     logout();
//     return <Navigate to="/login" replace />;
//   }
//  if (!user) return <Navigate to="/login" replace />
//   return children;
// }

// export default ProtectedRoute;
