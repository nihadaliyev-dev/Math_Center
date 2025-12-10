const express = require("express");
const router = express.Router();
const repositoryController = require("../controller/RepositoryController");
const protectRoute = require("../middlewares/protectRoute");
const {
  validateRepository,
  validateRepositoryUpdate,
  validateRepositoryVisibility,
} = require("../middlewares/repositoryValidator");

// All repository routes require authentication
router.use(protectRoute());

// Repository CRUD routes
router.post("/", validateRepository, repositoryController.createRepository);
router.get("/", repositoryController.getAllRepositories);
router.get("/user", repositoryController.getUserRepositories);
router.get("/user/:userId", repositoryController.getUserRepositories);
router.get("/:id", repositoryController.getRepositoryById);
router.put(
  "/:id",
  validateRepositoryUpdate,
  repositoryController.updateRepository
);
router.put(
  "/:id/visibility",
  validateRepositoryVisibility,
  repositoryController.updateRepositoryVisibility
);
router.delete("/:id", repositoryController.deleteRepository);

module.exports = router;
