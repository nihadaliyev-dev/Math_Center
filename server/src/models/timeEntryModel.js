const mongoose = require("mongoose");
const timeEntrySchema = require("../schemas/TimeEntrySchema");

const TimeEntryModel = mongoose.model("TimeEntry", timeEntrySchema);

module.exports = TimeEntryModel;


