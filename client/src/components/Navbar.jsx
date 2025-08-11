// client/src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await axios.get("https://goldenbharat.railway.app/api/auth/user", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setUser(res.data);
        } catch (err) {
          if (
            err.response?.status === 403 &&
            err.response?.data?.error === "Your account is banned"
          ) {
            toast.error("🚫 Your account is banned. Please contact support.");
            localStorage.removeItem("token");
            return;
          }
          console.error("Failed to fetch user", err);
        }
      }
    };

    fetchUser();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  const activeClass = "text-orange-400 font-bold";
  const baseClass = "hover:text-orange-300 transition";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {token && (
        <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-orange-500 via-white to-green-600 text-black px-4 py-3 flex items-center justify-between z-40 shadow-md">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsOpen(true)}>
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div
              className="text-2xl font-extrabold text-blue-800 cursor-pointer flex items-center gap-2"
              onClick={() => navigate("/dashboard")}
            >
              <img
                src="/ashok-chakra.png"
                alt="Ashok Chakra"
                className="w-10 h-10 mr-3"
              />
              Golden Bharat
            </div>
          </div>

          <div className="text-sm hidden md:block">
            {user?.name && <span>Welcome, {user.name} 🇮🇳</span>}
          </div>
        </div>
      )}

      {/* Sidebar */}
      {token && (
        <div
          ref={menuRef}
          className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-60 transform transition-transform duration-300 z-50 shadow-xl ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 pt-16 space-y-6">
            <div className="flex justify-end">
              <button onClick={() => setIsOpen(false)}>
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-400 rounded-full mx-auto text-black flex items-center justify-center text-xl font-bold">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
              <p className="text-sm mt-2">{user?.email}</p>
            </div>

            <div className="flex flex-col space-y-4 ml-4 text-left text-base">
              <NavLink
                to="/account"
                className={({ isActive }) =>
                  isActive ? activeClass : baseClass
                }
                onClick={() => setIsOpen(false)}
              >
                Account
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? activeClass : baseClass
                }
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/plans"
                className={({ isActive }) =>
                  isActive ? activeClass : baseClass
                }
                onClick={() => setIsOpen(false)}
              >
                Plans
              </NavLink>
              <NavLink
                to="/my-subscriptions"
                className={({ isActive }) =>
                  isActive ? activeClass : baseClass
                }
                onClick={() => setIsOpen(false)}
              >
                My Subscriptions
              </NavLink>

              <button
                onClick={handleLogout}
                className={baseClass + " text-left"}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;




























//-----------------------------------for testing-------------

// import React, { useState, useRef, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const [user, setUser] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef();

//   useEffect(() => {
//     if (token) {
//       axios
//         .get("http://goldenbharat.railway.app/api/auth/user", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((res) => setUser(res.data))
//         .catch((err) => console.error("Failed to fetch user", err));
//     }
//   }, [token]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//     window.location.reload();
//   };

//   const activeClass = "text-yellow-400 font-bold";
//   const baseClass = "hover:text-yellow-300 transition";

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen]);

//   return (
//     <>
//       {token && (
//         <div className="fixed top-0 left-0 w-full bg-gray-900 text-white px-4 py-3 flex items-center justify-between z-40">
//           <div className="flex items-center space-x-4">
//             <button onClick={() => setIsOpen(true)}>
//               <svg
//                 className="w-6 h-6 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>

//             <div
//               className="text-2xl font-bold text-yellow-400 cursor-pointer"
//               onClick={() => navigate("/dashboard")}
//             >
//               Golden Bird
//             </div>
//           </div>

//           <div className="text-sm text-gray-300 hidden md:block">
//             {user?.name && <span className="text-sm">Hi, {user.name}</span>}
//           </div>
//         </div>
//       )}

//       {token && (
//         <div
//           ref={menuRef}
//           className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-56 transform transition-transform duration-300 z-50 shadow-lg ${
//             isOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           <div className="p-4 pt-16 space-y-6">
//             {/* ✅ Profile Icon */}
//             <div className="flex justify-center items-center mb-4">
//               <div className="w-16 h-16 bg-yellow-400 rounded-full text-black flex items-center justify-center text-xl font-bold shadow-lg">
//                 {user?.name?.[0]?.toUpperCase() || "U"}
//               </div>
//             </div>

//             {/* ✅ Close Button */}
//             <div className="flex justify-end">
//               <button onClick={() => setIsOpen(false)}>
//                 <svg
//                   className="w-6 h-6 text-gray-300 hover:text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>
//             </div>

//             {/* ✅ Sidebar Links */}
//             <div className="flex flex-col space-y-4 ml-4 text-left">
//               <NavLink
//                 to="/account"
//                 className={({ isActive }) => (isActive ? activeClass : baseClass)}
//                 onClick={() => setIsOpen(false)}
//               >
//                 Account
//               </NavLink>

//               <NavLink
//                 to="/dashboard"
//                 className={({ isActive }) => (isActive ? activeClass : baseClass)}
//                 onClick={() => setIsOpen(false)}
//               >
//                 Dashboard
//               </NavLink>

//               <NavLink
//                 to="/plans"
//                 className={({ isActive }) => (isActive ? activeClass : baseClass)}
//                 onClick={() => setIsOpen(false)}
//               >
//                 Plans
//               </NavLink>

//               <NavLink
//                 to="/my-subscriptions"
//                 className={({ isActive }) => (isActive ? activeClass : baseClass)}
//                 onClick={() => setIsOpen(false)}
//               >
//                 My Subscriptions
//               </NavLink>

//               {/* ✅ Admin Panel (only if user is admin) */}
            

//               <button onClick={handleLogout} className={baseClass + " text-left"}>
//                 Logout
//               </button>

//               <div className="text-sm text-gray-400 mt-6">
//                 {user ? `Logged in as: ${user.name}` : ""}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;

