const { Schema } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    timeSpent: {
      type: Number,
      default: 0, // in hours
    },
    color: {
      type: String,
      required: true,
      default: "#000000",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = categorySchema;

