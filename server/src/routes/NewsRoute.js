const express = require("express");
const {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  uploadNewsImage,
} = require("../controller/NewsController");
const newsValidator = require("../middlewares/newsValidator");
const protectRoute = require("../middlewares/protectRoute");
const { uploadImage } = require("../middlewares/uploadMiddleware");
const router = express.Router();

// Upload news image (protected)
router.post("/upload/image", protectRoute("admin"), uploadImage, uploadNewsImage);

// GET all news (public access)
router.get("/", getNews);

// GET one news by ID (public access)
router.get("/:id", getNewsById);

// CREATE new news (protected, only authenticated users can create)
router.post("/", protectRoute("admin"), newsValidator, createNews);

// UPDATE news by ID (protected, only authenticated users can update)
router.put("/:id", protectRoute("admin"), updateNews);

// DELETE news by ID (protected, only authenticated users can delete)
router.delete("/:id", protectRoute("admin"), deleteNews);

module.exports = router;
