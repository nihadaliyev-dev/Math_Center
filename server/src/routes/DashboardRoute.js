const express = require("express");
const router = express.Router();
const dashboardController = require("../controller/DashboardController");
const protectRoute = require("../middlewares/protectRoute");

// All dashboard routes require authentication
router.use(protectRoute());

// Dashboard routes
router.get("/stats", dashboardController.getDashboardStats);
router.get("/user-data", dashboardController.getUserData);
router.get("/user-data/:userId", dashboardController.getUserData);
router.get("/categories", dashboardController.getMathematicalCategories);
router.get("/time-entries", dashboardController.getTimeEntries);
router.get("/notifications", dashboardController.getNotifications);
router.put(
  "/notifications/:id/read",
  dashboardController.markNotificationAsRead
);
router.put(
  "/notifications/read-all",
  dashboardController.markAllNotificationsAsRead
);

module.exports = router;
