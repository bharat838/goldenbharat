import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  ClipboardList,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
  { name: "Plans", path: "/plans", icon: <Package size={20} /> }, // ✅ Added
  { name: "Users", path: "/users", icon: <Users size={20} /> },
  { name: "Subscriptions", path: "/subscriptions", icon: <ClipboardList size={20} /> }, // ✅ Added
  { name: "Email Reminders", path: "/emails", icon: <Mail size={20} /> },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-5 -right-4 bg-indigo-600 text-white p-2 rounded-full shadow-md hover:bg-indigo-700 transition-transform duration-300"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Sidebar Container */}
      <div
        className={`bg-gradient-to-b from-indigo-700 to-purple-800 text-white min-h-screen transition-all duration-500 ease-in-out ${
          isOpen ? "w-64 p-5" : "w-16 p-5"
        }`}
      >
        {/* Logo / Title */}
        <div className="flex items-center mb-6">
          <div className="bg-white text-indigo-600 font-bold text-xl rounded-full w-10 h-10 flex items-center justify-center">
            A
          </div>
          {isOpen && <h2 className="ml-3 text-xl font-bold">Admin Panel</h2>}
        </div>

        {/* Menu */}
        <nav className="space-y-3">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  active
                    ? "bg-indigo-500 shadow-lg"
                    : "hover:bg-indigo-600 hover:shadow-md"
                }`}
              >
                {item.icon}
                {isOpen && <span className="font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}










// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Package,
//   Users,
//   ClipboardList,
//   Mail,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// const menuItems = [
//   { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
//   { name: "Plans", path: "/plans", icon: <Package size={20} /> },
//   { name: "Users", path: "/users", icon: <Users size={20} /> },
//   { name: "Subscriptions", path: "/subscriptions", icon: <ClipboardList size={20} /> },
//   { name: "Email Reminders", path: "/emails", icon: <Mail size={20} /> },
// ];

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(true);
//   const location = useLocation();

//   return (
//     <div className="relative">
//       {/* Toggle Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="absolute top-5 -right-4 bg-indigo-600 text-white p-2 rounded-full shadow-md hover:bg-indigo-700 transition-transform duration-300"
//       >
//         {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
//       </button>

//       {/* Sidebar Container */}
//       <div
//         className={`bg-gradient-to-b from-indigo-700 to-purple-800 text-white min-h-screen transition-all duration-500 ease-in-out ${
//           isOpen ? "w-64 p-5" : "w-16 p-5"
//         }`}
//       >
//         {/* Logo / Title */}
//         <div className="flex items-center mb-6">
//           <div className="bg-white text-indigo-600 font-bold text-xl rounded-full w-10 h-10 flex items-center justify-center">
//             A
//           </div>
//           {isOpen && <h2 className="ml-3 text-xl font-bold">Admin Panel</h2>}
//         </div>

//         {/* Menu */}
//         <nav className="space-y-3">
//           {menuItems.map((item) => {
//             const active = location.pathname === item.path;
//             return (
//               <Link
//                 key={item.name}
//                 to={item.path}
//                 className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
//                   active
//                     ? "bg-indigo-500 shadow-lg"
//                     : "hover:bg-indigo-600 hover:shadow-md"
//                 }`}
//               >
//                 {item.icon}
//                 {isOpen && <span className="font-medium">{item.name}</span>}
//               </Link>
//             );
//           })}
//         </nav>
//       </div>
//     </div>
//   );
// }
