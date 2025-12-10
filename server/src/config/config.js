require("dotenv").config();

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
