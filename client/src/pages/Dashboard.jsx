// client/src/pages/Dashboard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Flag + Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-2">
            <img
              src="/indian-flag.png"
              alt="Indian Flag"
              className="w-28 h-16 object-contain shadow-md rounded"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">
            Welcome to <span className="text-orange-600">Golden Bird 🕊️</span>
          </h1>
          <p className="text-lg text-gray-700">
            A tribute to India's spirit — powered by our defense, scientists, and engineers.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div
            onClick={() => navigate("/plans")}
            className="cursor-pointer bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition duration-300 text-center"
          >
            <img src="/icons/explore.png" alt="explore" className="mx-auto w-14 h-14 mb-3" />
            <h2 className="text-2xl font-semibold text-blue-700">Explore Plans</h2>
            <p className="text-gray-600 mt-2">
              Support innovation & progress by subscribing to tailored plans.
            </p>
          </div>

          <div
            onClick={() => navigate("/my-subscriptions")}
            className="cursor-pointer bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition duration-300 text-center"
          >
            <img src="/icons/my-subscriptions.png" alt="my-subscriptions" className="mx-auto w-14 h-14 mb-3" />
            <h2 className="text-2xl font-semibold text-green-700">My Subscriptions</h2>
            <p className="text-gray-600 mt-2">
              View, manage, or cancel your active and past subscriptions easily.
            </p>
          </div>

          <div
            onClick={() => navigate("/account")}
            className="cursor-pointer bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition duration-300 text-center"
          >
            <img src="/icons/account.png" alt="Account" className="mx-auto w-14 h-14 mb-3" />
            <h2 className="text-2xl font-semibold text-purple-700">My Account</h2>
            <p className="text-gray-600 mt-2">
              Edit your profile or change your password anytime with ease.
            </p>
          </div>
        </div>

        {/* Tribute Section */}
        <div className="bg-gradient-to-r from-yellow-50 via-white to-green-100 border-l-4 border-orange-500 rounded-lg p-6 shadow">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            🇮🇳 Inspired by India's Powerhouses
          </h3>
          <p className="text-gray-700 text-sm mb-3">
            Every subscription helps us educate, empower, and ignite the spark of innovation—honoring the
            legacy of our scientists, soldiers, and visionaries. Be part of something bigger.
          </p>
          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            <div className="bg-white rounded-lg shadow p-3 flex items-center space-x-3 w-52">
              <img src="/icons/army.png" alt="Army" className="w-6 h-6" />
              <span>Indian Army</span>
            </div>
            <div className="bg-white rounded-lg shadow p-3 flex items-center space-x-3 w-52">
              <img src="/icons/navy.png" alt="Navy" className="w-6 h-6" />
              <span>Indian Navy</span>
            </div>
            <div className="bg-white rounded-lg shadow p-3 flex items-center space-x-3 w-52">
              <img src="/icons/airforce.png" alt="Air Force" className="w-6 h-6" />
              <span>Air Force</span>
            </div>
            <div className="bg-white rounded-lg shadow p-3 flex items-center space-x-3 w-52">
              <img src="/icons/engineer.png" alt="Engineer" className="w-6 h-6" />
              <span>Engineers</span>
            </div>
            <div className="bg-white rounded-lg shadow p-3 flex items-center space-x-3 w-52">
              <img src="/icons/scientist.png" alt="Scientist" className="w-6 h-6" />
              <span>Scientists</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
















//------for testing ------

// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen pt-20 bg-gray-100 px-4">
//       <div className="max-w-4xl mx-auto text-center">
//         <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Golden Bird 🕊️</h1>
//         <p className="text-lg text-gray-600 mb-10">
//           Explore our subscription plans and manage your account with ease.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div
//             onClick={() => navigate("/plans")}
//             className="cursor-pointer bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300 transform hover:scale-105"
//           >
//             <h2 className="text-2xl font-semibold text-blue-600">Explore Plans</h2>
//             <p className="mt-2 text-gray-500">
//               Subscribe to a plan that suits your needs and unlock premium features.
//             </p>
//           </div>

//           <div
//             onClick={() => navigate("/my-subscriptions")}
//             className="cursor-pointer bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300 transform hover:scale-105"
//           >
//             <h2 className="text-2xl font-semibold text-green-600">My Subscriptions</h2>
//             <p className="mt-2 text-gray-500">
//               View your current subscriptions, expiry dates, and manage unsubscriptions.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
