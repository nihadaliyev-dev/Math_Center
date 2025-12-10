require("dotenv").config();

// Validate required environment variables
const requiredEnvVars = ["DB_URL", "JWT_SECRET_KEY"];
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error("❌ Missing required environment variables:");
  missingVars.forEach((varName) => {
    console.error(`   - ${varName}`);
  });
  console.error("\n💡 Please create a .env file in the server directory.");
  console.error("   Copy .env.example to .env and fill in the values.");
  console.error("   Example: Copy-Item .env.example .env");
  process.exit(1);
}

module.exports = {
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DB_URL,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_USERNAME: process.env.DB_USERNAME,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  REGISTRATION_SECRET:
    process.env.REGISTRATION_SECRET || "your-secret-registration-key-2024",
};
