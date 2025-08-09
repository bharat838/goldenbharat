import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import PlanManagement from "./pages/PlanManagement";
import SubscriptionManagement from "./pages/SubscriptionManagement";
import EmailReminders from "./pages/EmailReminders";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";


export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Route */}
        <Route path="/login" element={<Login />} />
       
        {/* Protected Routes with Admin Layout */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/plans" element={<PlanManagement />} />
          <Route path="/subscriptions" element={<SubscriptionManagement />} />
          <Route path="/emails" element={<EmailReminders />} />
        </Route>
      </Routes>
    </Router>
  );
}





// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import PlanManagement from "./pages/PlanManagement";
// import ProtectedRoute from "./components/ProtectedRoute";
// import UserManagement from "./pages/UserManagement";
// import SubscriptionManagement from "./pages/SubscriptionManagement";

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/plans"
//           element={
//             <ProtectedRoute>
//               <PlanManagement />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/subscriptions"
//           element={
//             <ProtectedRoute>
//               <SubscriptionManagement />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/users"
//           element={
//             <ProtectedRoute>
//               <UserManagement />
//             </ProtectedRoute>
//           }
//           />
//       </Routes>
//     </Router>
//   );
// }
