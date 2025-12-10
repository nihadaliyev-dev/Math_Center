const mongoose = require("mongoose");
const researcherSchema = require("../schemas/ResearcherSchema");

const ResearcherModel = mongoose.model("Researcher", researcherSchema);

module.exports = ResearcherModel;


