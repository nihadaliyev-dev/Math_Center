const mongoose = require("mongoose");
const notificationSchema = require("../schemas/NotificationSchema");

const NotificationModel = mongoose.model("Notification", notificationSchema);

module.exports = NotificationModel;









