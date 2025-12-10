const { Schema } = require("mongoose");

const timeEntrySchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      required: true,
    },
    author: {
      type: String,
      required: true,
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

module.exports = timeEntrySchema;


