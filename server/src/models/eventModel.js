const mongoose = require("mongoose");
const eventSchema = require("../schemas/EventSchema");

const EventModel = mongoose.model("Event", eventSchema);

module.exports = EventModel;


