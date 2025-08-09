// backend/routes/auth.js
// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const Otp = require("../models/Otp");
// const { sendOtpEmail } = require("../utils/email");
// const authMiddleware = require("../middleware/auth");

// const router = express.Router();

// // JWT token generate
// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// // Helper to make OTP
// const genOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// // ===================== REGISTER =====================
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, phone, dob } = req.body;

//     if (!name || !email || !password || !phone || !dob) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     let user = await User.findOne({ email });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     if (user && user.isVerified) {
//       return res.status(400).json({ error: "Email already exists" });
//     }

//     if (user) {
//       // update details for existing unverified user
//       user.name = name;
//       user.password = hashedPassword;
//       user.phone = phone;
//       user.dob = dob;
//       await user.save();
//     } else {
//       user = await User.create({
//         name,
//         email,
//         password: hashedPassword,
//         phone,
//         dob,
//         isAdmin: false,
//         isVerified: false,
//       });
//     }

//     // generate OTP and save
//     const code = genOtp();
//     const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

//     await Otp.create({ email, code, purpose: "verify-email", expiresAt });

//     // send email
//     await sendOtpEmail(email, code, "verify-email");

//     res.json({ message: "OTP sent to email. Please verify before login." });
//   } catch (err) {
//     console.error("Register Error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // ===================== VERIFY EMAIL OTP =====================
// router.post("/verify-email-otp", async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     if (!email || !otp) {
//       return res.status(400).json({ error: "Email & OTP required" });
//     }

//     const otpDoc = await Otp.findOne({ email, code: otp, purpose: "verify-email" });
//     if (!otpDoc || otpDoc.expiresAt < new Date()) {
//       return res.status(400).json({ error: "Invalid or expired OTP" });
//     }

//     await User.findOneAndUpdate({ email }, { isVerified: true });
//     await Otp.deleteMany({ email, purpose: "verify-email" });

//     res.json({ message: "Email verified successfully. You can now login." });
//   } catch (err) {
//     console.error("Verify OTP Error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // ===================== LOGIN =====================
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ error: "Email and password required" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     if (!user.isVerified) {
//       return res.status(403).json({ error: "Email not verified. Please verify first." });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     res.json({
//       token: generateToken(user._id),
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//       },
//     });
//   } catch (err) {
//     console.error("Login Error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // ===================== GET CURRENT USER PROFILE =====================
// router.get("/user", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select("-password");
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.json(user);
//   } catch (err) {
//     console.error("User Fetch Error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // ===================== UPDATE PROFILE =====================
// router.put("/update", authMiddleware, async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.userId,
//       { ...req.body },
//       { new: true }
//     ).select("-password");

//     res.json(updatedUser);
//   } catch (err) {
//     console.error("Update error:", err);
//     res.status(500).json({ error: "Update failed" });
//   }
// });

// // ===================== CHANGE PASSWORD =====================
// router.put("/update-password", authMiddleware, async (req, res) => {
//   try {
//     const { newPassword } = req.body;

//     if (!newPassword) {
//       return res.status(400).json({ error: "New password is required" });
//     }

//     const user = await User.findById(req.userId);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     user.password = await bcrypt.hash(newPassword, 10);
//     await user.save();

//     res.json({ message: "Password updated successfully" });
//   } catch (err) {
//     console.error("Password change error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // ===================== REQUEST PASSWORD RESET (SEND OTP) =====================
// router.post("/request-password-reset", async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ error: "Email required" });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ error: "User not found" });

//     const code = genOtp();
//     const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

//     await Otp.create({ email, code, purpose: "reset-password", expiresAt });
//     await sendOtpEmail(email, code, "reset-password");

//     res.json({ message: "Password reset OTP sent to email" });
//   } catch (err) {
//     console.error("Request reset error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // ===================== VERIFY RESET OTP (RETURN RESET TOKEN) =====================
// router.post("/verify-reset-otp", async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     if (!email || !otp) return res.status(400).json({ error: "Email & OTP required" });

//     const otpDoc = await Otp.findOne({ email, code: otp, purpose: "reset-password" });
//     if (!otpDoc || otpDoc.expiresAt < new Date()) {
//       return res.status(400).json({ error: "Invalid or expired OTP" });
//     }

//     const resetToken = jwt.sign({ email, purpose: "reset" }, process.env.JWT_SECRET, { expiresIn: "15m" });

//     await Otp.deleteMany({ email, purpose: "reset-password" });

//     res.json({ resetToken });
//   } catch (err) {
//     console.error("Verify reset OTP error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // ===================== RESET PASSWORD USING TOKEN =====================
// router.post("/reset-password", async (req, res) => {
//   try {
//     const { token, newPassword } = req.body;
//     if (!token || !newPassword) return res.status(400).json({ error: "Token & newPassword required" });

//     let payload;
//     try {
//       payload = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (e) {
//       return res.status(400).json({ error: "Invalid or expired token" });
//     }

//     if (payload.purpose !== "reset") return res.status(400).json({ error: "Invalid token" });

//     const hashed = await bcrypt.hash(newPassword, 10);
//     await User.findOneAndUpdate({ email: payload.email }, { password: hashed });

//     res.json({ message: "Password reset successful" });
//   } catch (err) {
//     console.error("Reset password error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;


//  for without otp logic

//backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// ✅ REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, dob } = req.body;

    if (!name || !email || !password || !phone || !dob) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      dob,
      isAdmin: false,
    });

    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET CURRENT USER PROFILE
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("User Fetch Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET USER SUBSCRIPTIONS
router.get("/my-subscriptions", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate("subscriptions")
      .select("subscriptions");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ subscriptions: user.subscriptions });
  } catch (err) {
    console.error("Fetch Subscriptions Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ UPDATE PROFILE
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { ...req.body },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

// ✅ CHANGE PASSWORD
router.put("/update-password", authMiddleware, async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ error: "New password is required" });
    }

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Password change error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ BAN USER (WebSocket emit removed)
router.post("/ban-user", async (req, res) => {
  try {
    const { userId, reason } = req.body;

    await User.findByIdAndUpdate(userId, { banned: true });

    res.json({ success: true, message: "User banned successfully" });
  } catch (err) {
    console.error("Ban Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;





