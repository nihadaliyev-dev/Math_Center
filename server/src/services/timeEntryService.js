const TimeEntryModel = require("../models/timeEntryModel");

class TimeEntryService {
  // Create a new time entry
  async createTimeEntry(timeEntryData) {
    try {
      const timeEntry = new TimeEntryModel(timeEntryData);
      await timeEntry.save();
      return timeEntry;
    } catch (error) {
      throw error;
    }
  }

  // Get time entries by date
  async getTimeEntriesByDate(date) {
    try {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      const timeEntries = await TimeEntryModel.find({
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      });

      return timeEntries;
    } catch (error) {
      throw error;
    }
  }

  // Get all time entries
  async getAllTimeEntries(filters = {}) {
    try {
      const timeEntries = await TimeEntryModel.find(filters).sort({ date: -1 });
      return timeEntries;
    } catch (error) {
      throw error;
    }
  }

  // Get time entry by ID
  async getTimeEntryById(id) {
    try {
      const timeEntry = await TimeEntryModel.findById(id);
      return timeEntry;
    } catch (error) {
      throw error;
    }
  }

  // Update time entry
  async updateTimeEntry(id, updateData) {
    try {
      const timeEntry = await TimeEntryModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      return timeEntry;
    } catch (error) {
      throw error;
    }
  }

  // Delete time entry
  async deleteTimeEntry(id) {
    try {
      const timeEntry = await TimeEntryModel.findByIdAndDelete(id);
      return timeEntry;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TimeEntryService();
