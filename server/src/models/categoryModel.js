const mongoose = require("mongoose");
const categorySchema = require("../schemas/CategorySchema");

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;


