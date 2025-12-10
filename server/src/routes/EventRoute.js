const express = require("express");
const router = express.Router();
const eventController = require("../controller/EventController");
const protectRoute = require("../middlewares/protectRoute");
const {
  validateEvent,
  validateEventUpdate,
} = require("../middlewares/eventValidator");

// Public GET routes (anyone can view events)
router.get("/", eventController.getAllEvents);
router.get("/upcoming", eventController.getUpcomingEvents);
router.get("/past", eventController.getPastEvents);
router.get("/search", eventController.searchEvents);
router.get("/:id", eventController.getEventById);

// Protected routes (require authentication)
router.post("/", protectRoute(), validateEvent, eventController.createEvent);
router.put(
  "/:id",
  protectRoute(),
  validateEventUpdate,
  eventController.updateEvent
);
router.delete("/:id", protectRoute(), eventController.deleteEvent);

module.exports = router;
