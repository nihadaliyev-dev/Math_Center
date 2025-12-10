const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY, REGISTRATION_SECRET } = require("../config/config");
const bcrypt = require("bcryptjs");
const {
  findUserByEmail,
  register,
  comparePasswords,
} = require("../services/authenticationService");

const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Server error" });
  }
};

const registerUser = async (req, res, next) => {
  const { email, password, trustPass } = req.body;

  try {
    // Check if required fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Validate registration secret key
    if (!trustPass) {
      return res.status(403).json({
        success: false,
        message: "Registration secret key is required",
      });
    }

    if (trustPass !== REGISTRATION_SECRET) {
      return res.status(403).json({
        success: false,
        message: "Invalid registration secret key. Access denied.",
      });
    }

    // Password hashing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Call the register function in the service
    const response = await register({
      ...req.body,
      password: hashedPassword,
    });

    if (!response.success) {
      throw new Error(response.message);
    }

    res.status(201).json({
      success: true,
      message: "Admin account registered successfully",
      data: response.data,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    next(error);
  }
};

// Get current user
const getCurrentUser = async (req, res, next) => {
  try {
    // req.user is set by protectRoute middleware
    const user = await findUserByEmail(req.user.email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { login, registerUser, getCurrentUser };
