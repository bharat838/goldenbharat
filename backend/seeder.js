// backend/seeder.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Plan = require("./models/Plan");

dotenv.config();

const plans = [
  {
    title: "Bharat Rakshak",
    slug: "defence",
    price: 100,
    duration: 30,
    features: [
      "Support Indian Army, Navy, Air Force",
      "Monthly defence inspiration digest",
      "Name on supporter wall",
    ],
  },
  {
    title: "Vigyaan Shakti",
    slug: "research",
    price: 100,
    duration: 30,
    features: [
      "Support ISRO & Indian research",
      "Monthly science updates",
      "Name in supporter list",
    ],
  },
  {
    title: "Golden Bharat Patron",
    slug: "patron",
    price: 199,
    duration: 30,
    features: [
      "Support both Defence & Research",
      "Bonus content access",
      "Name in golden patron hall",
    ],
  },
];

const seedPlans = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Plan.deleteMany();
    await Plan.insertMany(plans);
    console.log("✅ Plans seeded!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedPlans();
