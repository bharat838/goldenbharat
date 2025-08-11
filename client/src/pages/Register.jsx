// client/src/pages/Register.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://goldenbharat.railway.app/api/auth/register", form);
      alert(res.data.message || "Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Something went wrong. Please try again.";
      alert("❌ Registration failed: " + errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 via-white to-green-100">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full relative">
        {/* Chakra icon */}
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/17/Ashoka_Chakra.svg"
            alt="Ashoka Chakra"
            className="w-12 h-12"
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 mt-6">Join the Mission</h2>

        <p className="text-center text-sm text-gray-500 italic mb-6">
          "Great dreams of great dreamers are always transcended."
          <br />– Dr. A.P.J. Abdul Kalam
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={form.name}
            required
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={form.email}
            required
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={form.password}
            required
            onChange={handleChange}
          />
          <input
            name="phone"
            type="text"
            placeholder="Phone Number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={form.phone}
            required
            onChange={handleChange}
          />
          <input
            name="dob"
            type="date"
            placeholder="Date of Birth"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={form.dob}
            required
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold transition"
          >
            Register
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Login Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

 

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     dob: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://goldenbharat.railway.app/api/auth/register", form);
//       alert(res.data.message || "Registration successful! Please login.");
//       navigate("/login");
//     } catch (err) {
//       const errorMsg = err.response?.data?.error || "Something went wrong. Please try again.";
//       alert("Registration failed: " + errorMsg);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-[80vh]">
//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-8 w-96 space-y-4">
//         <h2 className="text-2xl font-bold text-center">Register</h2>

//         <input
//           name="name"
//           type="text"
//           placeholder="Name"
//           className="w-full px-3 py-2 border rounded"
//           value={form.name}
//           required
//           onChange={handleChange}
//         />
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           className="w-full px-3 py-2 border rounded"
//           value={form.email}
//           required
//           onChange={handleChange}
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           className="w-full px-3 py-2 border rounded"
//           value={form.password}
//           required
//           onChange={handleChange}
//         />
//         <input
//           name="phone"
//           type="text"
//           placeholder="Phone Number"
//           className="w-full px-3 py-2 border rounded"
//           value={form.phone}
//           required
//           onChange={handleChange}
//         />
//         <input
//           name="dob"
//           type="date"
//           placeholder="Date of Birth"
//           className="w-full px-3 py-2 border rounded"
//           value={form.dob}
//           required
//           onChange={handleChange}
//         />

//         <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//           Register
//         </button>

//         <p className="text-sm text-center mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-500 underline">
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Register;


//----- for testing -------



