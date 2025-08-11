import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

export default function Landing({ isLoggedIn }) {
  const navigate = useNavigate();
  const [cookieAccepted, setCookieAccepted] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const onScroll = () => setScrolling(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
   const [chartData, setChartData] = useState(null);

useEffect(() => {
  axios.get("http://goldenbharat.railway.app/api/plans/revenue-stats")

    .then(res => {
      const labels = res.data.map(p => p.title);
      const data = res.data.map(p => p.revenue);
      setChartData({
        labels,
        datasets: [{
          label: "Revenue (₹)",
          data,
          backgroundColor: ['#f97316', '#38bdf8', '#10b981']
        }]
      });
    });
}, []);

  const handleCookieAccept = () => setCookieAccepted(true);

  const scrollToId = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const tickerItems = [
    "\uD83C\uDDE8\uD83C\uDDF3 Jai Hind! Proud to support our armed forces.",
    "\uD83D\uDE80 ISRO's success is India's pride.",
    "\uD83D\uDEE1\uFE0F Together we build a stronger Bharat."
  ];

  const bannerSlides = [
    "/images/banner1a.png",
    "/images/banner1b.jpg"
  ];

  const festivalSlides = [
    "/images/banner2a.png",
    "/images/banner2b.jpg"
    
  ];

  const heroes = [
    { title: "General Upendra Dwivedi", img: "/images/army-hero1.jpg", desc: "Indian Army Chief" },
    { title: "Admiral Dinesh Kumar Tripathi", img: "/images/navy-hero2.jpg", desc: "Indian Navy Chief" },
    { title: "Air Chief Marshal A.P. Singh", img: "/images/airforce-hero3.jpg", desc: " Indian Air Force Chief" },
    { title: "General Anil Chauhan", img: "/images/cds-hero6.jpg", desc: " Chief of Defence Staff of the Indian Armed Forces" },
    { title: "V. Narayanan", img: "/images/isro-hero4.jpg", desc: "Chairman of the Indian Space Research Organisation" },
    { title: "Dr. Samir V. Kamat", img: "/images/drdo-hero5.jpg", desc: "Secretary DDR&D and Chairman DRDO" },
    
  ];
  
  const plans = [
    { title: "Bharat Rakshak", price: 5, img: "/images/demo-plan1.png", features: ["Support Army", "Patriotic badge"] },
    { title: "Vigyaan Shakti", price: 5, img: "/images/demo-plan2.jpg", features: ["Support ISRO", "Science badge"] },
    { title: "Golden Bharat", price: 15, img: "/images/demo-plan3.jpg", features: ["All benefits", "Golden badge"] },
  ];

  const testimonials = [
    { name: "Rohit Sharma", text: "Proud to be a supporter of our nation!" },
    { name: "Ananya Singh", text: "A platform that truly connects us to our heroes." },
    { name: "Vikram Raj", text: "Feels great to contribute to Bharat's progress." },
    { name: "Vikram Rao", text: "Feels great to contribute to Bharat's progress." },
  ];

  const countdownTarget = new Date("2025-08-15T00:00:00").getTime();
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownTarget - now;

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const heroSettings = {
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, centerPadding: "40px" } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: "0px" } },
    ],
  };

  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000
  };

  const bannerSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-white text-gray-800 font-sans min-h-screen relative">

      {/* 🔷 Ticker Navbar only for logged-out users */}
      {!isLoggedIn && (
        <header className={`sticky top-0 z-50 transition-all`}> 
          <div className="bg-gradient-to-r from-orange-600 via-white to-green-600 text-black font-bold text-sm py-2 text-center tracking-wider shadow-md">
            🇮🇳 Jai Hind! Proud to support our armed forces 🇮🇳
          </div>
          <nav className="flex justify-center gap-6 bg-white py-2 text-sm shadow">
            <button onClick={() => scrollToId("plans")} className="hover:text-orange-600">🔗 Plans</button>
            <button onClick={() => navigate("/about")} className="hover:text-orange-600">About</button>
            <button onClick={() => scrollToId("contact")} className="hover:text-orange-600">📞 Contact</button>
            <button onClick={() => navigate("/login")} className="hover:text-orange-600">🔐 Login</button>
            <button onClick={() => scrollToId("testimonials")} className="hover:text-orange-600">💬 Testimonials</button>
            <button onClick={() => scrollToId("plan-revenue")} className="hover:text-orange-600">📬 Subscription Revenue</button>
          </nav>
        </header>
      )}

      {/* 🎯 Hero Section with Slideshow */}
      <section className="relative h-[90vh] bg-cover bg-center flex items-center justify-center mb-16" style={{ backgroundImage: "url('/images/india-flag-bg.jpg')" }}>
        <div className="absolute inset-0 bg-white bg-opacity-60 z-0" />
        <div className="z-10 w-full px-4 max-w-5xl">
          <Slider {...bannerSettings}>
            {bannerSlides.map((src, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4">
                <img src={src} alt="Mission" className="rounded-xl h-56 object-56 shadow-md w-full" />
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Join the Mission for a Stronger Bharat</h1>
                <p className="text-lg font-medium max-w-xl mx-auto">Support our heroes, empower science, and be a part of India's growth story.</p>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* 🖼️ Countdown Banner */}
      <div className="py-6 px-4 max-w-4xl mx-auto">
        <Slider {...bannerSettings}>
          {festivalSlides.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Festival Slide ${idx + 1}`}
              className="rounded-xl w-full h-70 object-cover shadow-lg"
            />
          ))}
        </Slider>
      </div>

      {/* 🎯 Countdown Section */}
      <section className="py-10 text-center bg-yellow-50 border-t border-b border-orange-200">
        <h2 className="text-3xl font-bold mb-4">🎉 Countdown to Independance Day 🇮🇳</h2>
        <div className="text-lg font-medium tracking-wide bg-white rounded-lg inline-block px-8 py-4 shadow">
          {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
        </div>
      </section>

      {/* 🎖️ Our Heroes */}
      <section className="py-20">
        <h2 className="text-4xl font-bold text-center mb-10" data-aos="fade-up">Our Heroes</h2>
        <Slider {...heroSettings}>
          {heroes.map((hero, i) => (
            <div key={i} className="px-4" data-aos="zoom-in">
              <div className="bg-white rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                <img src={hero.img} alt={hero.title} className="h-80 w-full object-80" />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{hero.title}</h3>
                  <p className="text-sm mt-2">{hero.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* 🛡️ Our Plans */}
      <section id="plans" className="py-20 bg-gradient-to-br from-yellow-50 to-orange-100">
        <h2 className="text-4xl font-bold text-center mb-10" data-aos="fade-up">Our Plans</h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto px-4">
          {plans.map((plan, i) => (
            <div
              key={i}
              data-aos="fade-up"
              className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-orange-200"
            >
              <img src={plan.img} alt={plan.title} className="h-48 w-full object-48" />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-1">{plan.title}</h3>
                <p className="text-lg font-semibold text-green-600">₹{plan.price}</p>
                <ul className="mt-4 text-sm space-y-1">
                  {plan.features.map((f, idx) => (
                    <li key={idx}>• {f}</li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("/login")}
                  className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
                >
                  Subscribe
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
       {/* 📊 Revenue Chart Section */}
      <section id="plan-revenue" className="my-10 px-4">
        <h2 className="text-2xl font-bold text-center mb-4">📊 Plan Revenue Overview</h2>
         {chartData && <Bar data={chartData} />}
         </section>


      {/* 💬 Testimonials */}
      <section id="testimonials" className="py-20 bg-orange-50">
        <h2 className="text-4xl font-bold text-center mb-8" data-aos="fade-up">What People Say</h2>
        <div className="max-w-3xl mx-auto">
          <Slider {...testimonialSettings}>
            {testimonials.map((t, i) => (
              <div key={i} data-aos="fade-up">
                <div className="bg-white p-8 rounded-lg shadow-xl text-center text-gray-800">
                  <p className="italic mb-4">"{t.text}"</p>
                  <h4 className="font-bold">{t.name}</h4>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* 📬 Newsletter Signup */}
      <section id="newsletter" className="py-16 bg-gradient-to-r from-orange-400 to-red-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="mb-6">Subscribe to get updates about new plans, events, and more!</p>
        <div className="max-w-md mx-auto flex gap-2">
          <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 rounded text-black" />
          <button className="bg-white text-orange-600 font-semibold px-4 py-2 rounded hover:shadow-lg">Subscribe</button>
        </div>
      </section>

      {/* 📜 Cookie Banner */}
      {!cookieAccepted && (
        <div className="fixed bottom-0 inset-x-0 bg-orange-500 text-white py-3 px-6 text-sm flex justify-between items-center z-50">
          <p>We use cookies to enhance your experience. By continuing, you accept our use of cookies.</p>
          <button onClick={handleCookieAccept} className="bg-white text-orange-600 px-3 py-1 rounded ml-4 font-semibold">Accept</button>
        </div>
      )}

      {/* 🧭 Footer */}
      <footer className="py-6 bg-gradient-to-br from-orange-500 to-yellow-400 text-white text-center relative">
        <img
          src="/images/ashok-chakra.png"
          alt="Ashok Chakra"
          className="absolute left-4 top-2 w-12 opacity-60"
        />
        <p>🇮🇳 Proudly Supporting Bharat | © {new Date().getFullYear()} Golden Bird</p>
        <p>Proudly Designed & Developed in India by Bharat Khandelwal</p>
      </footer>
    </div>
  );
}



// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function Landing() {
//   const [cookieAccepted, setCookieAccepted] = useState(false);
//   const [scrolling, setScrolling] = useState(false);

//   useEffect(() => {
//     AOS.init({ duration: 1000, once: true });
//     const onScroll = () => setScrolling(window.scrollY > 20);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const handleCookieAccept = () => setCookieAccepted(true);

//   const tickerItems = [
//     "🇮🇳 Jai Hind! Proud to support our armed forces.",
//     "🚀 ISRO's success is India's pride.",
//     "🛡️ Together we build a stronger Bharat."
//   ];

//   const heroes = [
//     { title: "Indian Army", img: "/images/demo-hero1.jpg", desc: "Courage and Valor at the frontlines" },
//     { title: "Indian Navy", img: "/images/demo-hero2.jpg", desc: "Guardians of our seas" },
//     { title: "Indian Airforce", img: "/images/demo-hero3.jpg", desc: "Defenders of our skies" },
//     { title: "ISRO", img: "/images/demo-hero4.jpg", desc: "Pioneers of space exploration" },
//     { title: "DRDO", img: "/images/demo-hero5.jpg", desc: "Innovators in defence technology" },
//   ];

//   const plans = [
//     { title: "Bharat Rakshak", price: 100, img: "/images/demo-plan1.jpg", features: ["Support Army", "Patriotic badge"] },
//     { title: "Vigyaan Shakti", price: 100, img: "/images/demo-plan2.jpg", features: ["Support ISRO", "Science badge"] },
//     { title: "Golden Bharat", price: 199, img: "/images/demo-plan3.jpg", features: ["All benefits", "Golden badge"] },
//   ];

//   const testimonials = [
//     { name: "Rohit Sharma", text: "Proud to be a supporter of our nation!" },
//     { name: "Ananya Singh", text: "A platform that truly connects us to our heroes." },
//     { name: "Vikram Rao", text: "Feels great to contribute to Bharat's progress." },
//   ];

//   const countdownTarget = new Date("2025-08-15T00:00:00").getTime();
//   const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = countdownTarget - now;

//       setCountdown({
//         days: Math.floor(distance / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
//         minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
//         seconds: Math.floor((distance % (1000 * 60)) / 1000),
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const heroSettings = {
//     centerMode: true,
//     infinite: true,
//     centerPadding: "60px",
//     slidesToShow: 3,
//     autoplay: true,
//     autoplaySpeed: 2500,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 2, centerPadding: "40px" } },
//       { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: "0px" } },
//     ],
//   };

//   const testimonialSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4000
//   };

//   return (
//     <div className="bg-gradient-to-br from-orange-50 to-white text-gray-800 font-sans min-h-screen">

//       {/* 🔷 Sticky Navbar + Ticker */}
//       <header className={`sticky top-0 z-50 ${scrolling ? "shadow-md" : ""} transition-all bg-orange-500 text-white`}>
//         <div className="text-sm py-2 overflow-hidden whitespace-nowrap">
//           <div className="animate-marquee inline-block min-w-full">
//             {tickerItems.map((item, index) => (
//               <span key={index} className="mx-6 inline-block">{item}</span>
//             ))}
//           </div>
//         </div>
//       </header>

//       {/* 🎯 Hero Banner */}
//       <section className="relative h-[90vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('/images/india-flag-bg.jpg')" }}>
//         <div className="absolute inset-0 bg-white bg-opacity-50 z-0"></div>
//         <img
//           src="/images/ashok-chakra.png"
//           alt="Ashok Chakra"
//           className="w-24 absolute top-8 left-1/2 -translate-x-1/2 animate-spin-slow opacity-80 z-10"
//         />
//         <div className="z-10 px-4 max-w-2xl text-black" data-aos="fade-down">
//           <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
//             Join the Mission for a Stronger Bharat
//           </h1>
//           <p className="text-lg font-medium" data-aos="fade-up">
//             Support our heroes, empower science, and be a part of India's growth story.
//           </p>
//         </div>
//       </section>

//       {/* 🎯 Countdown Section */}
//       <section className="py-10 text-center">
//         <h2 className="text-3xl font-bold mb-4">Countdown to Independace Day 🇮🇳</h2>
//         <p className="text-lg font-medium">
//           {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
//         </p>
//       </section>

//       {/* 🎖️ Our Heroes */}
//       <section className="py-20">
//         <h2 className="text-4xl font-bold text-center mb-10" data-aos="fade-up">
//           Our Heroes
//         </h2>
//         <Slider {...heroSettings}>
//           {heroes.map((hero, i) => (
//             <div key={i} className="px-4" data-aos="zoom-in">
//               <div className="bg-white rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
//                 <img src={hero.img} alt={hero.title} className="h-56 w-full object-cover" />
//                 <div className="p-4">
//                   <h3 className="text-xl font-bold">{hero.title}</h3>
//                   <p className="text-sm mt-2">{hero.desc}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </section>

//       {/* 🛡️ Our Plans */}
//       <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-100">
//         <h2 className="text-4xl font-bold text-center mb-10" data-aos="fade-up">
//           Our Plans
//         </h2>
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto px-4">
//           {plans.map((plan, i) => (
//             <div
//               key={i}
//               data-aos="fade-up"
//               className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-orange-200"
//             >
//               <img src={plan.img} alt={plan.title} className="h-48 w-full object-cover" />
//               <div className="p-6">
//                 <h3 className="text-2xl font-bold mb-1">{plan.title}</h3>
//                 <p className="text-lg font-semibold text-green-600">₹{plan.price}</p>
//                 <ul className="mt-4 text-sm space-y-1">
//                   {plan.features.map((f, idx) => (
//                     <li key={idx}>• {f}</li>
//                   ))}
//                 </ul>
//                 <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded">
//                   Subscribe
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 💬 Testimonials */}
//       <section className="py-20 bg-orange-50">
//         <h2 className="text-4xl font-bold text-center mb-8" data-aos="fade-up">
//           What People Say
//         </h2>
//         <div className="max-w-3xl mx-auto">
//           <Slider {...testimonialSettings}>
//             {testimonials.map((t, i) => (
//               <div key={i} data-aos="fade-up">
//                 <div className="bg-white p-8 rounded-lg shadow-xl text-center text-gray-800">
//                   <p className="italic mb-4">"{t.text}"</p>
//                   <h4 className="font-bold">{t.name}</h4>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </section>

//       {/* 📬 Newsletter Signup */}
//       <section className="py-16 bg-gradient-to-r from-orange-400 to-red-500 text-white text-center">
//         <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
//         <p className="mb-6">Subscribe to get updates about new plans, events, and more!</p>
//         <div className="max-w-md mx-auto flex gap-2">
//           <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 rounded text-black" />
//           <button className="bg-white text-orange-600 font-semibold px-4 py-2 rounded hover:shadow-lg">
//             Subscribe
//           </button>
//         </div>
//       </section>

//       {/* 📜 Cookie Banner */}
//       {!cookieAccepted && (
//         <div className="fixed bottom-0 inset-x-0 bg-orange-500 text-white py-3 px-6 text-sm flex justify-between items-center z-50">
//           <p>We use cookies to enhance your experience. By continuing, you accept our use of cookies.</p>
//           <button onClick={handleCookieAccept} className="bg-white text-orange-600 px-3 py-1 rounded ml-4 font-semibold">Accept</button>
//         </div>
//       )}

//       {/* 🧭 Footer */}
//       <footer className="py-6 bg-gradient-to-br from-orange-500 to-yellow-400 text-white text-center relative">
//         <img
//           src="/images/ashok-chakra.png"
//           alt="Ashok Chakra"
//           className="absolute left-4 top-2 w-12 opacity-60"
//         />
//         <p>🇮🇳 Proudly Supporting Bharat | © {new Date().getFullYear()} Golden Bird</p>
//       </footer>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { FaMoon, FaSun } from "react-icons/fa";
// import "./HeroFlag.css"; // ✅ CSS import

// export default function Landing() {
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     AOS.init({ duration: 1000, once: true });
//   }, []);

//   // Hero data
//   const heroes = [
//     { title: "Indian Army", img: "/images/army.jpg", desc: "Courage and Valor at the frontlines" },
//     { title: "Indian Navy", img: "/images/navy.jpg", desc: "Guardians of our seas" },
//     { title: "Indian Airforce", img: "/images/airforce.jpg", desc: "Defenders of our skies" },
//     { title: "ISRO", img: "/images/isro.jpg", desc: "Pioneers of space exploration" },
//     { title: "DRDO", img: "/images/drdo.jpg", desc: "Innovators in defence technology" },
//   ];

//   // Plans
//   const plans = [
//     { title: "Bharat Rakshak", price: 100, img: "/images/army.jpg", features: ["Support Army", "Patriotic badge"] },
//     { title: "Vigyaan Shakti", price: 100, img: "/images/isro.jpg", features: ["Support ISRO", "Science badge"] },
//     { title: "Golden Bharat", price: 199, img: "/images/drdo.jpg", features: ["All benefits", "Golden badge"] },
//   ];

//   // Testimonials
//   const testimonials = [
//     { name: "Rohit Sharma", text: "Proud to be a supporter of our nation!" },
//     { name: "Ananya Singh", text: "A platform that truly connects us to our heroes." },
//     { name: "Vikram Rao", text: "Feels great to contribute to Bharat's progress." },
//   ];

//   const heroSettings = {
//     centerMode: true,
//     infinite: true,
//     centerPadding: "60px",
//     slidesToShow: 3,
//     autoplay: true,
//     autoplaySpeed: 2500,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 2, centerPadding: "40px" } },
//       { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: "0px" } },
//     ],
//   };

//   return (
//     <div className={darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}>
//       {/* Toggle */}
//       <div className="p-4 flex justify-end">
//         <button
//           onClick={() => setDarkMode(!darkMode)}
//           className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
//         >
//           {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
//         </button>
//       </div>

//       {/* ✅ Merged Hero Section */}
//       <section className="hero-flag relative">
//         <img
//           src="/images/ashok-chakra.png"
//           alt="Ashok Chakra"
//           className="w-28 absolute top-6 animate-spin-slow opacity-80 z-10"
//         />
//         <div className="hero-content" data-aos="fade-down">
//           <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
//             Join the Mission for a Stronger Bharat
//           </h1>
//           <p className="max-w-xl mx-auto text-lg font-medium" data-aos="fade-up">
//             Support our heroes, empower science, and be a part of India's growth story.
//           </p>
//         </div>
//       </section>

//       {/* Our Heroes */}
//       <section className="py-16">
//         <h2 className="text-4xl font-bold text-center mb-8" data-aos="fade-up">
//           Our Heroes
//         </h2>
//         <Slider {...heroSettings}>
//           {heroes.map((hero, i) => (
//             <div key={i} className="px-4" data-aos="zoom-in">
//               <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
//                 <img src={hero.img} alt={hero.title} className="h-56 w-full object-cover" />
//                 <div className="p-4">
//                   <h3 className="text-xl font-bold">{hero.title}</h3>
//                   <p className="text-sm mt-2">{hero.desc}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </section>

//       {/* Our Plans */}
//       <section className="py-16 bg-gray-100 dark:bg-gray-700">
//         <h2 className="text-4xl font-bold text-center mb-8" data-aos="fade-up">
//           Our Plans
//         </h2>
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto px-4">
//           {plans.map((plan, i) => (
//             <div
//               key={i}
//               data-aos="fade-up"
//               className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
//             >
//               <img src={plan.img} alt={plan.title} className="h-48 w-full object-cover" />
//               <div className="p-6">
//                 <h3 className="text-2xl font-bold">{plan.title}</h3>
//                 <p className="text-lg font-semibold mt-2">₹{plan.price}</p>
//                 <ul className="mt-4 text-sm space-y-1">
//                   {plan.features.map((f, idx) => (
//                     <li key={idx}>• {f}</li>
//                   ))}
//                 </ul>
//                 <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded">
//                   Subscribe
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-16">
//         <h2 className="text-4xl font-bold text-center mb-8" data-aos="fade-up">
//           What People Say
//         </h2>
//         <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto px-4">
//           {testimonials.map((t, i) => (
//             <div
//               key={i}
//               data-aos="fade-up"
//               className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300"
//             >
//               <p className="italic mb-4">"{t.text}"</p>
//               <h4 className="font-bold">{t.name}</h4>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="py-16 bg-orange-500 text-white text-center">
//         <h2 className="text-3xl font-bold mb-4">Be a Part of the Change</h2>
//         <p className="mb-6">Your support makes a difference for our heroes and our future.</p>
//         <button className="bg-white text-orange-500 px-6 py-2 rounded font-bold hover:shadow-lg">
//           Join Now
//         </button>
//       </section>

//       {/* Footer */}
//       <footer className="py-6 bg-gray-800 text-gray-300 text-center relative">
//         <img
//           src="/images/ashok-chakra.png"
//           alt="Ashok Chakra"
//           className="absolute left-4 top-2 w-12 opacity-60"
//         />
//         <p>🇮🇳 Proudly Supporting Bharat | © {new Date().getFullYear()} Golden Bird</p>
//       </footer>
//     </div>
//   );
// }















// import React, { useState } from "react";
// import { Sun, Moon } from "lucide-react";

// const plans = [
//   {
//     title: "🇮🇳 Bharat Rakshak",
//     subtitle: "Support Indian Defence Forces",
//     price: 100,
//     features: [
//       "Contribute to military welfare",
//       "Support Army, Navy, and Air Force",
//       "Patriotic digital badge",
//     ],
//     image: "/images/defence-icon.png",
//   },
//   {
//     title: "🚀 Vigyaan Shakti",
//     subtitle: "Empower Research & Innovation",
//     price: 100,
//     features: [
//       "Fuel scientific missions",
//       "Support ISRO & innovation",
//       "Receive a science supporter badge",
//     ],
//     image: "/images/isro-icon.png",
//   },
//   {
//     title: "🌟 Golden Bharat Patron",
//     subtitle: "Support Both Defence & Science",
//     price: 199,
//     features: [
//       "All benefits of both plans",
//       "Patron of national progress",
//       "Special Golden Bharat badge",
//     ],
//     image: "/images/golden-bharat.png",
//   },
// ];

// export default function Landing() {
//   const [darkMode, setDarkMode] = useState(false);

//   return (
//     <div className={darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}>
//       {/* Navbar */}
//       <header className="flex justify-between items-center px-6 py-4 shadow">
//         <h1 className="text-2xl font-bold text-indigo-600">🇮🇳 Bharat Support</h1>
//         <button
//           onClick={() => setDarkMode(!darkMode)}
//           className="p-2 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-700"
//         >
//           {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//         </button>
//       </header>

//       {/* Hero Section */}
//       <section
//         className={`text-center py-16 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
//       >
//         <h2 className="text-4xl font-bold mb-4">
//           Support Our Nation’s Strength
//         </h2>
//         <p className="max-w-2xl mx-auto text-lg">
//           Join hands to support Defence, ISRO, and DRDO in building a stronger, self-reliant Bharat.
//         </p>
//       </section>

//       {/* Motivational Quotes */}
//       <section className="py-10 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
//         {[
//           `"Service Before Self" - Indian Army`,
//           `"One Earth, One Family, One Future" - ISRO`,
//           `"Strength’s Respect Comes from Courage" - DRDO`,
//         ].map((quote, idx) => (
//           <div
//             key={idx}
//             className={`p-6 rounded-lg shadow-lg ${
//               darkMode ? "bg-gray-800" : "bg-white"
//             }`}
//           >
//             <p className="italic text-center">{quote}</p>
//           </div>
//         ))}
//       </section>

//       {/* Plans Section */}
//       <section className="py-12 px-6 max-w-6xl mx-auto">
//         <h3 className="text-3xl font-bold text-center mb-10">Choose Your Plan</h3>
//         <div className="grid gap-8 md:grid-cols-3">
//           {plans.map((plan, i) => (
//             <div
//               key={i}
//               className={`rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1 ${
//                 darkMode ? "bg-gray-800" : "bg-white"
//               }`}
//             >
//               <img
//                 src={plan.image}
//                 alt={plan.title}
//                 className="w-full h-48 object-contain p-6"
//               />
//               <div className="p-6">
//                 <h4 className="text-xl font-bold mb-2">{plan.title}</h4>
//                 <p className="text-sm mb-4">{plan.subtitle}</p>
//                 <p className="text-lg font-semibold text-green-500 mb-4">
//                   ₹{plan.price}
//                 </p>
//                 <ul className="text-sm mb-6 space-y-1">
//                   {plan.features.map((f, idx) => (
//                     <li key={idx}>• {f}</li>
//                   ))}
//                 </ul>
//                 <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded">
//                   Support Now
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer
//         className={`text-center py-6 mt-10 ${
//           darkMode ? "bg-gray-800" : "bg-gray-100"
//         }`}
//       >
//         <p>© 2025 Bharat Support. Together for a stronger nation. 🇮🇳</p>
//       </footer>
//     </div>
//   );
// }
