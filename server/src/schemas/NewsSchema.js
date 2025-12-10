const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: {
      az: {
        type: String,
        required: true,
        trim: true,
      },
      en: {
        type: String,
        required: true,
        trim: true,
      },
    },
    slug: {
      type: String,
      trim: true,
    },
    author: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Awards", "Research", "Updates", "Other"],
      default: "Other",
    },
    status: {
      type: String,
      enum: ["Draft", "Published", "Archived"],
      default: "Draft",
    },
    coverImage: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      trim: true,
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = newsSchema;
