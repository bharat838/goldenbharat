const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const http = require("http");

// ✅ Routes
const auth = require("./routes/auth");
const planRoutes = require("./routes/planRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/admin");
const removeExpiredSubscriptions = require("./utils/removeExpiredSubscriptions");
const certificateRoutes = require("./routes/certificate");
const app = express();

// ✅ Updated CORS Configuration
app.use(cors({
  origin: ["https://goldenbharat.railway.app/","https://goldenbharat.vercel.app", "http://localhost:5173",], // React + Vite ports
  credentials: true
}));


//app.use(cors());
app.use(express.json());

// ✅ Create HTTP server (no Socket.IO now)
const server = http.createServer(app);

// ✅ Test Route
app.get("/api/test", (req, res) => {
  res.json({ message: "API working fine ✅" });
});

// ✅ Apply Routes
app.use("/api/auth", auth);
app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/certificate", certificateRoutes);
app.use('/uploads/certificates', express.static(path.join(__dirname, 'uploads/certificates')));

mongoose.connection.once("open", () => {
  console.log("✅ MongoDB connected");
  setInterval(removeExpiredSubscriptions, 1000 * 60 * 60); // every hour
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




// chart k liye

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();
// const http = require("http");

// // ✅ Routes
// const auth = require("./routes/auth");
// const planRoutes = require("./routes/planRoutes");
// const subscriptionRoutes = require("./routes/subscriptionRoutes");
// const authRoutes = require("./routes/authRoutes");
// const adminRoutes = require("./routes/admin");
// const removeExpiredSubscriptions = require("./utils/removeExpiredSubscriptions");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ Create HTTP server (no Socket.IO now)
// const server = http.createServer(app);

// // ✅ Test Route
// app.get("/api/test", (req, res) => {
//   res.json({ message: "API working fine ✅" });
// });

// // ✅ Apply Routes
// app.use("/api/auth", auth);
// app.use("/api/auth", authRoutes);
// app.use("/api/plans", planRoutes);
// app.use("/api/subscription", subscriptionRoutes);
// app.use("/api/admin", adminRoutes);

// // ✅ MongoDB Connection (loop‑safe)
// mongoose.connection.once("open", () => {
//   console.log("✅ MongoDB connected");
//   setInterval(removeExpiredSubscriptions, 1000 * 60 * 60);
// });

// mongoose.connection.on("error", (err) => {
//   console.error("❌ MongoDB connection error:", err);
// });

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // ✅ Start server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
































