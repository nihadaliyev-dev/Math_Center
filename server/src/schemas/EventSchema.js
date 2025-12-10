const { Schema } = require("mongoose");

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      enum: ["Online", "On-Campus"],
      default: "Online",
    },
    organizer: {
      type: String,
      required: true,
    },
    speakers: [
      {
        type: String,
      },
    ],
    registrationLink: {
      type: String,
      trim: true,
    },
    coverImage: {
      type: String,
      trim: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["Draft", "Published", "Cancelled"],
      default: "Draft",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = eventSchema;

