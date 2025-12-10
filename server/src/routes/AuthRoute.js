const express = require("express");
const {
  login,
  registerUser,
  getCurrentUser,
} = require("../controller/AuthenticationController");
const protectRoute = require("../middlewares/protectRoute");

const router = express.Router();

// Login route
router.post("/login", login);

// Register route
router.post("/register", registerUser);

// Get current user (protected)
router.get("/me", protectRoute(), getCurrentUser);

module.exports = router;
