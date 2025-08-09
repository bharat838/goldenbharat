const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const existing = await User.findOne({ email: "admin@gmail.com" });
    if (existing) {
      console.log("⚠️ Admin already exists:", existing.email);
    } else {
      const admin = await User.create({
        name: "Super Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        phone: "9999999999", // ✅ Add phone
        dob: "1990-01-01",   // ✅ Add dob
        isAdmin: true,
      });
      console.log("✅ Admin created:", admin.email);
    }
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

createAdmin();
