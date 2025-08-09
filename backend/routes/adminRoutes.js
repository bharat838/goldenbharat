const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");
const User = require("../models/User");
const Plan = require("../models/Plan");
const Subscription = require("../models/Subscription");

// ✅ Dashboard Stats
router.get("/users-count", adminMiddleware, async (req, res) => {
  res.json({ count: await User.countDocuments() });
});

router.get("/plans-count", adminMiddleware, async (req, res) => {
  res.json({ count: await Plan.countDocuments() });
});

router.get("/active-subs-count", adminMiddleware, async (req, res) => {
  res.json({
    count: await Subscription.countDocuments({ status: "active" }),
  });
});

// ✅ Users Management
router.get("/users", adminMiddleware, async (req, res) => {
  res.json(await User.find().select("-password"));
});

router.put("/users/:id/toggle-admin", adminMiddleware, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.isAdmin = !user.isAdmin;
  await user.save();

  res.json({ message: "Admin role updated", user });
});

router.put("/users/:id/toggle-ban", adminMiddleware, async (req, res) => {
  const user = await User.findById(req.params.id);
 // if (!user) return res.status(404).json({ error: "User not found" });

  user.isBanned = !user.isBanned;
  await user.save();

  res.json({ message: "Ban status updated", user });
});
// GET all plans
router.get("/plans", adminMiddleware, async (req, res) => {
  const plans = await Plan.find().sort({ createdAt: -1 });
  res.json(plans);
});
// GET all plans (public access)
router.get("/plans", async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch plans" });
  }
});

// ✅ Get All Subscriptions
router.get("/subscriptions", adminAuth, async (req, res) => {
  try {
    const subs = await Subscription.find()
      .populate("user", "name email")
      .populate("plan", "name price");

    res.json(subs);
  } catch (err) {
    console.error("Error fetching subscriptions:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});



module.exports = router;





// const express = require("express");
// const router = express.Router();
// const adminMiddleware = require("../middleware/adminMiddleware");
// const Plan = require("../models/Plan");
// const User = require("../models/User");
// const Subscription = require("../models/Subscription");

// // ✅ Admin Dashboard
// router.get("/dashboard", adminMiddleware, (req, res) => {
//   res.json({ message: "Welcome Admin", admin: req.user });
// });

// // ✅ Create Plan
// router.post("/plans", adminMiddleware, async (req, res) => {
//   try {
//     const { title, price, features } = req.body;
//     const plan = await Plan.create({ title, price, features });
//     res.json(plan);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // ✅ Get All Plans
// router.get("/plans", adminMiddleware, async (req, res) => {
//   const plans = await Plan.find();
//   res.json(plans);
// });

// // ✅ Update Plan
// router.put("/plans/:id", adminMiddleware, async (req, res) => {
//   try {
//     const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedPlan);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // ✅ Delete Plan
// router.delete("/plans/:id", adminMiddleware, async (req, res) => {
//   try {
//     await Plan.findByIdAndDelete(req.params.id);
//     res.json({ message: "Plan deleted" });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // ✅ Get All Users (without passwords)
// router.get("/users", adminMiddleware, async (req, res) => {
//   const users = await User.find().select("-password");
//   res.json(users);
// });

// // ✅ Toggle Admin Status
// router.put("/users/:id/toggle-admin", adminMiddleware, async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (!user) return res.status(404).json({ error: "User not found" });

//   user.isAdmin = !user.isAdmin;
//   await user.save();
//   res.json({ message: "Admin role updated", user });
// });

// // ✅ Ban/Unban User
// router.put("/users/:id/toggle-ban", adminMiddleware, async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (!user) return res.status(404).json({ error: "User not found" });

//   user.isBanned = !user.isBanned;
//   await user.save();
//   res.json({ message: "Ban status updated", user });
// });

// // ✅ Get All Subscriptions
// router.get("/subscriptions", adminMiddleware, async (req, res) => {
//   const subscriptions = await Subscription.find().populate("user plan");
//   res.json(subscriptions);
// });

// // ✅ Dashboard Counts
// router.get("/users-count", adminMiddleware, async (req, res) => {
//   const count = await User.countDocuments();
//   res.json({ count });
// });

// router.get("/plans-count", adminMiddleware, async (req, res) => {
//   const count = await Plan.countDocuments();
//   res.json({ count });
// });

// router.get("/active-subs-count", adminMiddleware, async (req, res) => {
//   const count = await Subscription.countDocuments({ status: "active" });
//   res.json({ count });
// });

// module.exports = router;
