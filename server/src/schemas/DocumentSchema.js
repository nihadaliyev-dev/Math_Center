const { Schema } = require("mongoose");

const versionHistorySchema = new Schema(
  {
    version: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    note: {
      type: String,
    },
  },
  { _id: false }
);

const documentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    abstract: {
      type: String,
      required: true,
    },
    authors: [
      {
        type: String,
        required: true,
      },
    ],
    fileType: {
      type: String,
      enum: ["PDF", "DOCX", "LaTeX", "Markdown"],
      default: "PDF",
    },
    category: {
      type: String,
      enum: ["Algebra", "Topology", "Applied Math", "Analysis", "Other"],
      default: "Other",
    },
    tags: [
      {
        type: String,
      },
    ],
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    lastEdited: {
      type: Date,
      default: Date.now,
    },
    publicationStatus: {
      type: String,
      enum: ["Draft", "Peer-reviewed", "Published"],
      default: "Draft",
    },
    doi: {
      type: String,
      trim: true,
    },
    visibility: {
      type: String,
      enum: ["Public", "Internal"],
      default: "Internal",
    },
    versionHistory: [versionHistorySchema],
    fileUrl: {
      type: String,
    },
    fileSize: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = documentSchema;

