const express = require("express");
const router = express.Router();
const Plan = require("../models/Plan");
const Subscription = require("../models/Subscription"); // ✅ Added

// GET all plans
router.get("/", async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch plans" });
  }
});

// POST new plan
router.post("/", async (req, res) => {
  try {
    const { name, price, features } = req.body;
    const newPlan = new Plan({ name, price, features });
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (err) {
    res.status(400).json({ error: "Invalid plan data" });
  }
});

// ✅ Revenue Chart Endpoint
router.get("/revenue-stats", async (req, res) => {
  try {
    const plans = await Plan.find();
    const result = [];

    for (let plan of plans) {
      const subs = await Subscription.find({ plan: plan._id }); // ✅ fixed plan field
      const revenue = subs.reduce((sum, sub) => sum + (sub.snapshot?.price || 0), 0);

      const monthly = {};
      subs.forEach((sub) => {
        const month = new Date(sub.subscribedAt).toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
        monthly[month] = (monthly[month] || 0) + (sub.snapshot?.price || 0);
      });

      result.push({
        title: plan.title,
        revenue,
        color: getColorForPlan(plan.title),
        monthlyBreakdown: monthly,
      });
    }

    res.json(result);
  } catch (err) {
    console.error("Revenue chart error:", err);
    res.status(500).json({ error: "Failed to fetch revenue stats" });
  }
});

function getColorForPlan(title) {
  const map = {
    "Bharat Rakshak": "#f97316",    // Orange
    "Vigyaan Shakti": "#38bdf8",    // Sky Blue
    "Golden Bharat": "#10b981",     // Emerald Green
  };
  return map[title] || "#64748b";   // Default Gray
}

module.exports = router;










/// for charts 

// const express = require("express");
// const router = express.Router();
// const Plan = require("../models/Plan");


// // GET all plans
// router.get("/", async (req, res) => {
//   try {
//     const plans = await Plan.find();
//     res.json(plans);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch plans" });
//   }
// });

// // POST new plan
// router.post("/", async (req, res) => {
//   try {
//     const { name, price, features } = req.body;
//     const newPlan = new Plan({ name, price, features });
//     await newPlan.save();
//     res.status(201).json(newPlan);
//   } catch (err) {
//     res.status(400).json({ error: "Invalid plan data" });
//   }
// });
// // chart k liye niche

// router.get("/revenue-stats", async (req, res) => {
//   try {
//     const plans = await Plan.find();
//     const result = [];

//     for (let plan of plans) {
//       const subs = await Subscription.find({ planId: plan._id });
//       const revenue = subs.reduce((sum, sub) => sum + (sub.amountPaid || 0), 0);

//       // Month-wise revenue breakdown
//       const monthly = {};
//       subs.forEach((sub) => {
//         const month = new Date(sub.createdAt).toLocaleString("default", { month: "short", year: "numeric" });
//         monthly[month] = (monthly[month] || 0) + (sub.amountPaid || 0);
//       });

//       result.push({
//         title: plan.title,
//         revenue,
//         color: getColorForPlan(plan.title),
//         monthlyBreakdown: monthly,
//       });
//     }

//     res.json(result);
//   } catch (err) {
//     console.error("Revenue chart error:", err);
//     res.status(500).json({ error: "Failed to fetch revenue stats" });
//   }
// });

// function getColorForPlan(title) {
//   const map = {
//     "Bharat Rakshak": "#f97316",    // Orange
//     "Vigyaan Shakti": "#38bdf8",    // Sky Blue
//     "Golden Bharat": "#10b981",     // Emerald Green
//   };
//   return map[title] || "#64748b";   // Default Gray
// }


// module.exports = router;
