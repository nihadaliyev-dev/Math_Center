const { Schema } = require("mongoose");

const researcherSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    affiliation: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Editor", "Researcher"],
      default: "Researcher",
    },
    orcid: {
      type: String,
      trim: true,
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
    contributions: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
    },
    avatar: {
      type: String,
      default: "/avatar.png",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = researcherSchema;

