// import axios from "axios";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchUser = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setUser(null);
//         return;
//       }

//       const res = await axios.get("http://localhost:5000/api/auth/user", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setUser(res.data);
//     } catch (err) {
//       console.error("User fetch error:", err);
//       localStorage.removeItem("token");
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, fetchUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };





/// client/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [banned, setBanned] = useState(false);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }

      const res = await axios.get("/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.status === "banned" || res.data?.banned) {
        toast.error("🚫 Your account is banned. Please contact support.");
        logout();
        setBanned(true);
        return;
      }

      setUser(res.data);
      setBanned(false);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, logout, loading, banned }}>
      {children}
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthContext.Provider>
  );
};
