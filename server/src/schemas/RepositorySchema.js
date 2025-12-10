const { Schema } = require("mongoose");

const repositorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    fileCount: {
      type: Number,
      default: 0,
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
    size: {
      type: String,
      default: "0 MB",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Researcher",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = repositorySchema;


