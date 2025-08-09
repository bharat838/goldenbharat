// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phone: { type: String },
//   dob: { type: Date },
//   isAdmin: { type: Boolean, default: false },

//   // ✅ Add this field
//   isBanned: { type: Boolean, default: false },
// });

// module.exports = mongoose.model("User", userSchema);

// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    isAdmin: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    //isVerified: { type: Boolean, default: false },
    subscriptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
