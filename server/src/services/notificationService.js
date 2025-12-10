const NotificationModel = require("../models/notificationModel");

class NotificationService {
  // Create a new notification
  async createNotification(notificationData) {
    try {
      const notification = new NotificationModel(notificationData);
      await notification.save();
      return notification;
    } catch (error) {
      throw error;
    }
  }

  // Get all notifications
  async getAllNotifications(userId = null) {
    try {
      const filter = userId ? { userId } : {};
      const notifications = await NotificationModel.find(filter).sort({
        timestamp: -1,
      });
      return notifications;
    } catch (error) {
      throw error;
    }
  }

  // Get unread notifications
  async getUnreadNotifications(userId = null) {
    try {
      const filter = { read: false };
      if (userId) filter.userId = userId;

      const notifications = await NotificationModel.find(filter).sort({
        timestamp: -1,
      });
      return notifications;
    } catch (error) {
      throw error;
    }
  }

  // Mark notification as read
  async markAsRead(id) {
    try {
      const notification = await NotificationModel.findByIdAndUpdate(
        id,
        { read: true },
        { new: true }
      );
      return notification;
    } catch (error) {
      throw error;
    }
  }

  // Mark all notifications as read
  async markAllAsRead(userId = null) {
    try {
      const filter = userId ? { userId, read: false } : { read: false };
      await NotificationModel.updateMany(filter, { read: true });
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  // Delete notification
  async deleteNotification(id) {
    try {
      const notification = await NotificationModel.findByIdAndDelete(id);
      return notification;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new NotificationService();


