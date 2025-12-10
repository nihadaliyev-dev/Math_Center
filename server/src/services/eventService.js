const EventModel = require("../models/eventModel");

class EventService {
  // Create a new event
  async createEvent(eventData) {
    try {
      const event = new EventModel(eventData);
      await event.save();
      return event;
    } catch (error) {
      throw error;
    }
  }

  // Get all events
  async getAllEvents(filters = {}) {
    try {
      const events = await EventModel.find(filters).sort({ startDate: -1 });
      return events;
    } catch (error) {
      throw error;
    }
  }

  // Get upcoming events
  async getUpcomingEvents() {
    try {
      const now = new Date();
      const events = await EventModel.find({
        startDate: { $gte: now },
        status: "Published",
      }).sort({ startDate: 1 });
      return events;
    } catch (error) {
      throw error;
    }
  }

  // Get past events
  async getPastEvents() {
    try {
      const now = new Date();
      const events = await EventModel.find({
        startDate: { $lt: now },
      }).sort({ startDate: -1 });
      return events;
    } catch (error) {
      throw error;
    }
  }

  // Get event by ID
  async getEventById(id) {
    try {
      const event = await EventModel.findById(id);
      return event;
    } catch (error) {
      throw error;
    }
  }

  // Update event
  async updateEvent(id, updateData) {
    try {
      const event = await EventModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      return event;
    } catch (error) {
      throw error;
    }
  }

  // Delete event
  async deleteEvent(id) {
    try {
      const event = await EventModel.findByIdAndDelete(id);
      return event;
    } catch (error) {
      throw error;
    }
  }

  // Search events
  async searchEvents(query) {
    try {
      const events = await EventModel.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { tags: { $in: [new RegExp(query, "i")] } },
        ],
      }).sort({ startDate: -1 });
      return events;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new EventService();


