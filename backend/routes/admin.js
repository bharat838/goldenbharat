const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Plan = require("../models/Plan");
const Subscription = require("../models/Subscription");
const authMiddleware = require("../middleware/auth");
const adminAuth = require("../middleware/adminMiddleware");
const nodemailer = require("nodemailer");

// ✅ Get total donations and subscriber count
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user?.isAdmin) {
      return res.status(403).json({ error: "Access denied" });
    }

    const subscriptions = await Subscription.find({ status: "active" }).populate("plan");
    const totalDonations = subscriptions.reduce((sum, sub) => sum + (sub.plan?.price || 0), 0);

    res.json({
      totalSubscribers: subscriptions.length,
      totalDonations,
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// ✅ Send Email
router.post("/send-email", adminAuth, async (req, res) => {
  const { email, subject, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject,
      text: message,
    });

    res.json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error("Email Send Error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// ✅ Get All Users
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Toggle Admin
router.put("/users/:id/toggle-admin", adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.isAdmin = !user.isAdmin;
    await user.save();

    res.json({ message: "User admin status updated", user });
  } catch (err) {
    console.error("Toggle Admin Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Toggle Ban/Unban (WebSocket emit removed)
router.put("/users/:id/toggle-ban", adminAuth, async (req, res) => {
  try {
    console.log("Toggle Ban API hit, ID:", req.params.id);
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.isBanned = !user.isBanned;
    await user.save();

    res.json({ message: "User ban status updated", user });
  } catch (err) {
    console.error("Toggle Ban Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Users Count
router.get("/users-count", adminAuth, async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ totalUsers: count });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Plans Count
router.get("/plans-count", adminAuth, async (req, res) => {
  try {
    const count = await Plan.countDocuments();
    res.json({ totalPlans: count });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Active Subscriptions Count
router.get("/active-subs-count", adminAuth, async (req, res) => {
  try {
    const count = await Subscription.countDocuments({ status: "active" });
    res.json({ activeSubscriptions: count });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get All Plans
router.get("/plans", adminAuth, async (req, res) => {
  const plans = await Plan.find();
  res.json(plans);
});

// ✅ Create Plan
router.post("/plans", adminAuth, async (req, res) => {
  const plan = await Plan.create(req.body);
  res.json(plan);
});

// ✅ Update Plan
router.put("/plans/:id", adminAuth, async (req, res) => {
  const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(plan);
});

// ✅ Delete Plan
router.delete("/plans/:id", adminAuth, async (req, res) => {
  await Plan.findByIdAndDelete(req.params.id);
  res.json({ message: "Plan deleted" });
});

// ✅ Get All Subscriptions
router.get("/subscriptions", adminAuth, async (req, res) => {
  try {
    const subs = await Subscription.find()
      .populate("user", "name email")
      .populate({
        path: "plan",
        select: "title price",
        options: {strictPopulate:false}
      });

    res.json(subs);
  } catch (err) {
    console.error("Error fetching subscriptions:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// ✅ Delete Subscription
router.delete("/subscriptions/:id", adminAuth, async (req, res) => {
  await Subscription.findByIdAndDelete(req.params.id);
  res.json({ message: "Subscription cancelled" });
});

module.exports = router;




// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const Plan = require("../models/Plan");
// const Subscription = require("../models/Subscription");
// const authMiddleware = require("../middleware/auth");

// // ✅ Get all users
// router.get("/users", authMiddleware, async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     res.json(users);
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // ✅ Get total users count
// router.get("/users-count", authMiddleware, async (req, res) => {
//   try {
//     const count = await User.countDocuments();
//     res.json({ totalUsers: count });
//   } catch (err) {
//     console.error("Error fetching users count:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // ✅ Get total plans count
// router.get("/plans-count", authMiddleware, async (req, res) => {
//   try {
//     const count = await Plan.countDocuments();
//     res.json({ totalPlans: count });
//   } catch (err) {
//     console.error("Error fetching plans count:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // ✅ Get active subscriptions count
// router.get("/active-subs-count", authMiddleware, async (req, res) => {
//   try {
//     const count = await Subscription.countDocuments({ status: "active" });
//     res.json({ activeSubscriptions: count });
//   } catch (err) {
//     console.error("Error fetching subscriptions count:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // ✅ Get all subscriptions with plan details
// router.get("/subscriptions", authMiddleware, async (req, res) => {
//   try {
//     const subs = await Subscription.find()
//       .populate("planId", "name price") // ✅ Plan details
//       .populate("userId", "name email"); // ✅ User details

//     res.json(subs);
//   } catch (err) {
//     console.error("Error fetching subscriptions:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });
// // ✅ PLANS
// router.get("/plans", authMiddleware, async (req, res) => {
//   const plans = await Plan.find();
//   res.json(plans);
// });

// router.post("/plans", authMiddleware, async (req, res) => {
//   const plan = await Plan.create(req.body);
//   res.json(plan);
// });

// router.put("/plans/:id", authMiddleware, async (req, res) => {
//   const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(plan);
// });

// router.delete("/plans/:id", authMiddleware, async (req, res) => {
//   await Plan.findByIdAndDelete(req.params.id);
//   res.json({ message: "Plan deleted" });
// });

// // ✅ SUBSCRIPTIONS
// router.get("/subscriptions", authMiddleware, async (req, res) => {
//   const subs = await Subscription.find()
//     .populate("userId", "name email")
//     .populate("planId", "name price");
//   res.json(subs);
// });

// router.delete("/subscriptions/:id", authMiddleware, async (req, res) => {
//   await Subscription.findByIdAndDelete(req.params.id);
//   res.json({ message: "Subscription cancelled" });
// });


// module.exports = router;




// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const authMiddleware = require("../middleware/auth");

// // ✅ Get all users (only admin)
// router.get("/users", authMiddleware, async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     res.json(users);
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;
