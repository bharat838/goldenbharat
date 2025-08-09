// backend/models/Subscription.js
const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: true,
  },
  subscribedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "unsubscribed"],
    default: "active",
  },
  paymentId: {
    type: String,
  },
  snapshot: {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    features: [{ type: String, required: true }]
  }
}, { timestamps: true });

module.exports = mongoose.model("Subscription", subscriptionSchema);




// const mongoose = require("mongoose");

// const subscriptionSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
//   status: { type: String, default: "active" }, // active, canceled, expired
//   startDate: { type: Date, default: Date.now },
//   endDate: { type: Date },
// });

// module.exports = mongoose.model("Subscription", subscriptionSchema);




//----

// const mongoose = require("mongoose");
// const subscriptionSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
//   status: { type: String, default: "active", enum: ["active", "unsubscribed"] },
//   subscribedAt: { type: Date, default: Date.now },
//   expiresAt: { type: Date, required: true },
//   paymentId: { type: String, default: "FAKE-PAYMENT-ID" },
// });

// module.exports = mongoose.model("Subscription", subscriptionSchema);
