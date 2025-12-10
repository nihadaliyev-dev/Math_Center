const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { DB_URL } = require("../config/config");
const UserModel = require("../models/userModel");

const createAdmin = async () => {
  try {
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(DB_URL);
    console.log("✅ Connected to MongoDB");

    const email = "olcaycoskun@gmail.com";
    const password = "WSywvqJzrD";

    // Check if admin already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      console.log(`⚠️  Admin user with email ${email} already exists`);
      console.log("🔄 Updating password...");
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
      existingUser.role = "admin";
      await existingUser.save();
      console.log(`✅ Admin user password updated: ${email}`);
    } else {
      console.log("👤 Creating admin user...");
      const hashedPassword = await bcrypt.hash(password, 10);
      const adminUser = await UserModel.create({
        email: email,
        password: hashedPassword,
        role: "admin",
      });
      console.log(`✅ Admin user created: ${adminUser.email}`);
    }

    await mongoose.connection.close();
    console.log("✅ Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

createAdmin();

