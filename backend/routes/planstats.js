// Express backend - routes/planStats.js

const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');
const Subscription = require('../models/Subscription');

router.get('/stats', async (req, res) => {
  try {
    const plans = await Plan.find({});
    const stats = await Promise.all(plans.map(async (plan) => {
      const subs = await Subscription.find({ planId: plan._id });
      const revenue = subs.reduce((acc, sub) => acc + sub.amountPaid, 0);
      return {
        title: plan.title,
        count: subs.length,
        revenue
      };
    }));
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
