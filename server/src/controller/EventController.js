const eventService = require("../services/eventService");
const { formatMongoData } = require("../utils/formatMongoData");

class EventController {
  // Create a new event
  async createEvent(req, res, next) {
    try {
      const event = await eventService.createEvent(req.body);
      res.status(201).json({
        success: true,
        message: req.t("event_created_success"),
        data: formatMongoData(event),
      });
    } catch (error) {
      next(error);
    }
  }

  // Get all events
  async getAllEvents(req, res, next) {
    try {
      const { lang, ...filters } = req.query;
      const events = await eventService.getAllEvents(filters);
      res.status(200).json({
        success: true,
        data: formatMongoData(events),
      });
    } catch (error) {
      next(error);
    }
  }

  // Get upcoming events
  async getUpcomingEvents(req, res, next) {
    try {
      const events = await eventService.getUpcomingEvents();
      res.status(200).json({
        success: true,
        data: formatMongoData(events),
      });
    } catch (error) {
      next(error);
    }
  }

  // Get past events
  async getPastEvents(req, res, next) {
    try {
      const events = await eventService.getPastEvents();
      res.status(200).json({
        success: true,
        data: formatMongoData(events),
      });
    } catch (error) {
      next(error);
    }
  }

  // Get event by ID
  async getEventById(req, res, next) {
    try {
      const event = await eventService.getEventById(req.params.id);
      if (!event) {
        return res.status(404).json({
          success: false,
          message: req.t("event_not_found"),
        });
      }
      res.status(200).json({
        success: true,
        data: formatMongoData(event),
      });
    } catch (error) {
      next(error);
    }
  }

  // Update event
  async updateEvent(req, res, next) {
    try {
      const event = await eventService.updateEvent(req.params.id, req.body);
      if (!event) {
        return res.status(404).json({
          success: false,
          message: req.t("event_not_found"),
        });
      }
      res.status(200).json({
        success: true,
        message: req.t("event_updated_success"),
        data: formatMongoData(event),
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete event
  async deleteEvent(req, res, next) {
    try {
      const event = await eventService.deleteEvent(req.params.id);
      if (!event) {
        return res.status(404).json({
          success: false,
          message: req.t("event_not_found"),
        });
      }
      res.status(200).json({
        success: true,
        message: req.t("event_deleted_success"),
      });
    } catch (error) {
      next(error);
    }
  }

  // Search events
  async searchEvents(req, res, next) {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({
          success: false,
          message: "Search query is required",
        });
      }
      const events = await eventService.searchEvents(q);
      res.status(200).json({
        success: true,
        data: formatMongoData(events),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EventController();
