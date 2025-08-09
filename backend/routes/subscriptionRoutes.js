// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const Plan = require("../models/Plan");
// const Subscription = require("../models/Subscription");
// const adminMiddleware = require("../middleware/adminMiddleware");

// // ✅ Middleware: Validate JWT
// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ error: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id;
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// };

// // ✅ Admin – Get All Subscriptions
// router.get("/admin/all", adminMiddleware, async (req, res) => {
//   try {
//     const subs = await Subscription.find()
//       .populate("userId", "name email")
//       .populate("planId", "name price");
//     res.json(subs);
//   } catch (err) {
//     console.error("❌ Error fetching subscriptions:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // ✅ Subscribe to a plan
// router.post("/subscribe", authMiddleware, async (req, res) => {
//   try {
//     const { planId } = req.body;

//     const plan = await Plan.findById(planId);
//     if (!plan) return res.status(404).json({ error: "Plan not found" });

//     const user = await User.findById(req.userId);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     // ✅ Add to subscriptions if not already subscribed
//     if (!user.subscriptions.includes(planId)) {
//       user.subscriptions.push(planId);
//       await user.save();
//     }

//     res.json({ message: "Subscribed successfully", subscriptions: user.subscriptions });
//   } catch (err) {
//     console.error("Subscription Error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // ✅ Get current user's active subscriptions
// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     const now = new Date();

//     const subscriptions = await Subscription.find({
//       userId: req.userId,
//       endDate: { $gt: now },
//     })
//       .populate("planId", "name price features")
//       .sort({ startDate: -1 });

//     res.json(subscriptions);
//   } catch (err) {
//     console.error("❌ Subscriptions fetch error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // ✅ Unsubscribe from a plan
// router.post("/unsubscribe", authMiddleware, async (req, res) => {
//   const { planId } = req.body;

//   try {
//     const subscription = await Subscription.findOne({
//       userId: req.userId,
//       planId,
//     });

//     if (!subscription) {
//       return res.status(404).json({ error: "Subscription not found" });
//     }

//     if (subscription.status === "unsubscribed") {
//       return res.status(400).json({ error: "Already unsubscribed" });
//     }

//     subscription.status = "unsubscribed";
//     await subscription.save();

//     res.json({ message: "Unsubscribed successfully" });
//   } catch (err) {
//     console.error("❌ Unsubscribe error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;



// backend/routes/subscriptionRoutes.js

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Plan = require("../models/Plan");
const Subscription = require("../models/Subscription");
const adminMiddleware = require("../middleware/adminMiddleware");

// ✅ Admin – View all subscriptions with user + plan populated
router.get("/admin/subscriptions", adminMiddleware, async (req, res) => {
  try {
    const subs = await Subscription.find()
      .populate("user", "name email")
      .populate("plan", "title price");

    res.json(subs);
  } catch (err) {
    console.error("❌ Admin fetch failed:", err);
    res.status(500).json({ error: "Failed to fetch subscriptions" });
  }
});

// ✅ Middleware: Validate JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("🛡 Token received:", token);

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("❌ Invalid token:", err.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};

// ✅ POST /api/subscription/subscribe
router.post("/subscribe", authMiddleware, async (req, res) => {
  try {
    const { planId } = req.body;

    if (!planId) {
      return res.status(400).json({ error: "Plan ID is required" });
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ error: "Plan not found" });
    }

    if (!plan.duration || typeof plan.duration !== "number") {
      return res.status(400).json({ error: "Invalid or missing plan duration" });
    }

    const now = new Date();

    const existing = await Subscription.findOne({
      user: req.userId,
      plan: planId,
      expiresAt: { $gt: now },
    });

    if (existing) {
      return res.status(400).json({
        error: "You have already subscribed to this plan.",
      });
    }

    const expiresAt = new Date(
      now.getTime() + plan.duration * 24 * 60 * 60 * 1000
    );

    const subscription = new Subscription({
      user: req.userId,
      plan: plan._id,
      subscribedAt: now,
      expiresAt,
      status: "active",
      paymentId: "demo-payment", // future use
      snapshot: {
        title: plan.title,
        price: plan.price,
        features: plan.features,
      },
    });

    await subscription.save();

    res.status(201).json({
      message: "Subscription successful",
      subscription,
    });
  } catch (err) {
    console.error("❌ Subscribe failed:", err.message || err);
    res.status(500).json({ error: "Server error: " + (err.message || "Unknown issue") });
  }
});


// ✅ GET: All active subscriptions of current user (POPULATED + not expired)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const now = new Date();

    const subscriptions = await Subscription.find({
      user: req.userId,
      expiresAt: { $gt: now },
    })
      .populate({
        path: "plan",
        model: "Plan",
        select: "title price features",
      })
      .sort({ subscribedAt: -1 });

    res.json(subscriptions);
  } catch (err) {
    console.error("❌ Subscriptions fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ POST: Unsubscribe (mark as unsubscribed)
router.post("/unsubscribe", authMiddleware, async (req, res) => {
  const { planId } = req.body;

  try {
    const subscription = await Subscription.findOne({
      user: req.userId,
      plan: planId,
    });

    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    if (subscription.status === "unsubscribed") {
      return res.status(400).json({ error: "Already unsubscribed" });
    }

    subscription.status = "unsubscribed";
    await subscription.save();

    res.json({ message: "Unsubscribed. Will be removed after expiry." });
  } catch (err) {
    console.error("❌ Unsubscribe error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;



