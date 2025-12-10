const dashboardService = require("../services/dashboardService");
const categoryService = require("../services/categoryService");
const notificationService = require("../services/notificationService");
const timeEntryService = require("../services/timeEntryService");

class DashboardController {
  // Get dashboard statistics
  async getDashboardStats(req, res, next) {
    try {
      const stats = await dashboardService.getDashboardStats();
      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get user data
  async getUserData(req, res, next) {
    try {
      const userId = req.params.userId || req.user?.userId;
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required",
        });
      }
      const userData = await dashboardService.getUserData(userId);
      res.status(200).json({
        success: true,
        data: userData,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get mathematical categories (time tracking)
  async getMathematicalCategories(req, res, next) {
    try {
      const categories = await categoryService.getAllCategories();
      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get time entries by date
  async getTimeEntries(req, res, next) {
    try {
      const { date } = req.query;
      if (!date) {
        return res.status(400).json({
          success: false,
          message: "Date parameter is required",
        });
      }
      const timeEntries = await timeEntryService.getTimeEntriesByDate(date);
      res.status(200).json({
        success: true,
        data: timeEntries,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get notifications
  async getNotifications(req, res, next) {
    try {
      const userId = req.user?.userId;
      const notifications = await notificationService.getAllNotifications(
        userId
      );
      res.status(200).json({
        success: true,
        data: notifications,
      });
    } catch (error) {
      next(error);
    }
  }

  // Mark notification as read
  async markNotificationAsRead(req, res, next) {
    try {
      const { id } = req.params;
      const notification = await notificationService.markAsRead(id);
      if (!notification) {
        return res.status(404).json({
          success: false,
          message: "Notification not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Notification marked as read",
      });
    } catch (error) {
      next(error);
    }
  }

  // Mark all notifications as read
  async markAllNotificationsAsRead(req, res, next) {
    try {
      const userId = req.user?.userId;
      await notificationService.markAllAsRead(userId);
      res.status(200).json({
        success: true,
        message: "All notifications marked as read",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DashboardController();
