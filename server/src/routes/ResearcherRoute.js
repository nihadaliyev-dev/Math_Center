const express = require("express");
const router = express.Router();
const researcherController = require("../controller/ResearcherController");
const protectRoute = require("../middlewares/protectRoute");
const {
  validateResearcher,
  validateResearcherUpdate,
} = require("../middlewares/researcherValidator");
const { uploadImage } = require("../middlewares/uploadMiddleware");

// Public routes - can be accessed without authentication
router.get("/", researcherController.getAllResearchers);
router.get("/search", researcherController.searchResearchers);
router.get("/leaderboard", researcherController.getLeaderboard);
router.get("/:id([0-9a-fA-F]{24})", researcherController.getResearcherById);

// Protected routes - require authentication
router.use(protectRoute());

// Upload researcher avatar (protected)
router.post("/upload/avatar", uploadImage, researcherController.uploadResearcherAvatar);

// Researcher CRUD routes (protected)
router.post("/", validateResearcher, researcherController.createResearcher);
router.put(
  "/:id([0-9a-fA-F]{24})",
  validateResearcherUpdate,
  researcherController.updateResearcher
);
router.delete("/:id([0-9a-fA-F]{24})", researcherController.deleteResearcher);

module.exports = router;
