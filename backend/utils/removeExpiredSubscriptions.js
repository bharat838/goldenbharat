const Subscription = require("../models/Subscription");
const User = require("../models/User");

const removeExpiredSubscriptions = async () => {
  const now = new Date();

  try {
    const expiredSubs = await Subscription.find({ expiresAt: { $lt: now } });

    for (const sub of expiredSubs) {
      const user = await User.findById(sub.user);
      if (user) {
        user.subscriptions = user.subscriptions.filter(
          (s) => s.toString() !== sub.plan.toString()
        );
        await user.save();
      }

      await Subscription.findByIdAndDelete(sub._id);
      console.log(`🗑️ Removed expired subscription: ${sub._id}`);
    }
  } catch (err) {
    console.error("❌ Failed to remove expired subscriptions:", err);
  }
};

module.exports = removeExpiredSubscriptions;
