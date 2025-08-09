import Landing from "./pages/Landing"; // import at top
import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import MySubscriptions from "./pages/MySubscriptions";
import Account from "./pages/Account";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { AuthContext } from "./context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "./pages/About";



function App() {
  return (
    
    <Router>
      <AppWrapper />
    </Router>
  );
}

function AppWrapper() {
  const { loading, banned } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Redirect & Toast if user is banned
  useEffect(() => {
    if (banned) {
      toast.error("🚫 Your account has been banned.");
      navigate("/login", { replace: true });
    }
  }, [banned, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    
    <>
      {!banned && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing/>} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}


        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/plans"
          element={
            <PrivateRoute>
              <Plans />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-subscriptions"
          element={
            <PrivateRoute>
              <MySubscriptions />
            </PrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />
      </Routes>

      {/* ✅ Only one ToastContainer */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
