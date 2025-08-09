// models/Plan.js
// const mongoose = require("mongoose");

// const planSchema = new mongoose.Schema({
//   title: String,
//   price: Number,
//   description: String,
//   features: [String],
//   image: String,
//   isActive: { type: Boolean, default: true },
//   duration: { type: Number, default: 30 }  // ➕ Add this (in days)
// });

// module.exports = mongoose.model("Plan", planSchema);


// backend/models/Plan.js
const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // ✅ Required for subscribing via slug
  price: { type: Number, required: true },
  features: [String],
  duration: { type: Number, default: 30 }, // in days
  image: { type: String },// ✅ Image URL
});

module.exports = mongoose.model("Plan", planSchema);







//------testing---




// const mongoose = require("mongoose");

// const planSchema = new mongoose.Schema({
//   title: { type: String, required: true }, // updated 'name' → 'title'
//   price: { type: String, required: true },
//   features: { type: [String], default: [] },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Plan", planSchema);
