// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const authRoutes = require("./routes/auth");

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // ✅ Import Routes
// const authRoutes = require("./routes/auth");
// const adminRoutes = require("./routes/admin");

// // ✅ Use Routes
// app.use("/api/auth", authRoutes);   // For login/register
// app.use("/api/admin", adminRoutes); // For admin-only routes


// // ✅ Connect DB & Start Server
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(5000, () => console.log("✅ Server running on port 5000"));
//   })
//   .catch((err) => console.error("❌ DB Error:", err));



const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/generate", async (req, res) => {
  try {
    const { userName, planName } = req.body;

    if (!userName || !planName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Folder path
    const folderPath = path.join(__dirname, "../uploads/certificates");

    // Ensure folder exists
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // File path
    const fileName = `${userName.replace(/\s+/g, "_")}_certificate.pdf`;
    const filePath = path.join(folderPath, fileName);

    // Dummy file creation (replace with PDF code later)
    fs.writeFileSync(filePath, `Certificate for ${userName} - Plan: ${planName}`);

    return res.json({
      success: true,
      message: "Certificate generated successfully",
      downloadUrl: `/uploads/certificates/${fileName}`
    });
  } catch (err) {
    console.error("Certificate generation error:", err);
    res.status(500).json({ error: "Failed to generate certificate" });
  }
});

module.exports = router;












//without certificate

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ Routes
// const authRoutes = require("./routes/auth");
// const planRoutes = require("./routes/planRoutes");
// const subscriptionRoutes = require("./routes/subscriptionRoutes");
// const adminRoutes = require("./routes/admin");

// app.get("/api/test", (req, res) => {
//   res.json({ message: "API working fine ✅" });
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/plans", planRoutes);
// app.use("/api/subscription", subscriptionRoutes);
// app.use("/api/admin", adminRoutes);

// // ✅ MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("✅ MongoDB connected"))
// .catch((err) => console.error("❌ MongoDB connection error:", err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


