const { Schema } = require("mongoose");

const notificationSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["info", "warning", "success", "error"],
      default: "info",
    },
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    read: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = notificationSchema;


