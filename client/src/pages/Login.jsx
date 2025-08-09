// client/src/pages/Login.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { fetchUser } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);

      // 🚫 If banned → stop (toast handled in AuthContext)
      if (res.data.status === "banned") {
        setLoading(false);
        return;
      }

      localStorage.setItem("token", res.data.token);
      await fetchUser();
      navigate("/dashboard");
    } catch (err) {
      // ❌ Wrong credentials
      if (err.response?.status !== 403) {
        alert("Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 via-white to-green-100">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full relative">
        {/* Chakra badge */}
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/17/Ashoka_Chakra.svg"
            alt="Ashoka Chakra"
            className="w-12 h-12"
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 mt-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            value={form.email}
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            value={form.password}
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
           <p className="text-sm text-center mt-2">
           <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
            </Link>
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Register Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;






// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// function Login() {
//   const navigate = useNavigate();
//   const { fetchUser } = useContext(AuthContext);
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", form);
//       localStorage.setItem("token", res.data.token);

//       await fetchUser(); // Fetch latest user
//       navigate("/dashboard");
//     } catch (err) {
//       alert("❌ Login failed: " + (err.response?.data?.error || "Server error"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-[80vh]">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-md rounded p-8 w-96 space-y-4"
//       >
//         <h2 className="text-2xl font-bold text-center">Login</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full px-3 py-2 border rounded"
//           value={form.email}
//           required
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full px-3 py-2 border rounded"
//           value={form.password}
//           required
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         <button
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <p className="text-sm text-center mt-4">
//           Don’t have an account?{" "}
//           <Link to="/register" className="text-blue-500 underline">
//             Register
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Login;


//--------------------------------for testing-----


// // client/src/pages/Login.jsx

// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// function Login() {
//   const navigate = useNavigate();
//   const { fetchUser } = useContext(AuthContext);

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", form);
//       const token = res.data.token;

//       localStorage.setItem("token", token);

//       // ✅ Fetch user and redirect cleanly
//       await fetchUser();
//       navigate("/dashboard");
//     } catch (err) {
//       alert("❌ Login failed: " + (err.response?.data?.error || "Server error"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-[80vh]">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-md rounded p-8 w-96 space-y-4"
//       >
//         <h2 className="text-2xl font-bold text-center">Login</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full px-3 py-2 border rounded"
//           value={form.email}
//           required
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full px-3 py-2 border rounded"
//           value={form.password}
//           required
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         <button
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <p className="text-sm text-center mt-4">
//           Don’t have an account?{" "}
//           <Link to="/register" className="text-blue-500 underline">
//             Register
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Login;
