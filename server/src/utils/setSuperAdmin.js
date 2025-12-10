require("dotenv").config();
const mongoose = require("mongoose");
const UserModel = require("../models/userModel");
const { DB_URL } = require("../config/config");

const setSuperAdmin = async () => {
  try {
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(DB_URL);
    console.log("✅ Connected to MongoDB");

    const email = "admin000@gmail.com";

    let user = await UserModel.findOne({ email });

    if (user) {
      console.log(`👤 Found user: ${user.email}`);
      user.isSuperAdmin = true;
      await user.save();
      console.log(`✅ User ${email} set as superadmin`);
    } else {
      console.log(`⚠️  User with email ${email} not found.`);
      console.log("ℹ️  Please create the user account first.");
    }
  } catch (error) {
    console.error("❌ Error setting superadmin:", error);
  } finally {
    await mongoose.disconnect();
    console.log("✅ Database connection closed");
  }
};

setSuperAdmin();
