const mongoose = require("mongoose");
const repositorySchema = require("../schemas/RepositorySchema");

const RepositoryModel = mongoose.model("Repository", repositorySchema);

module.exports = RepositoryModel;


