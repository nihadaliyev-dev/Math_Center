const mongoose = require("mongoose");
const documentSchema = require("../schemas/DocumentSchema");

const DocumentModel = mongoose.model("Document", documentSchema);

module.exports = DocumentModel;









