const Joi = require("joi");

const documentValidationSchema = Joi.object({
  title: Joi.string().required().trim().min(3).max(200),
  abstract: Joi.string().required().min(10),
  authors: Joi.array().items(Joi.string().trim()).min(1).required(),
  fileType: Joi.string()
    .valid("PDF", "DOCX", "LaTeX", "Markdown")
    .default("PDF"),
  category: Joi.string()
    .valid("Algebra", "Topology", "Applied Math", "Analysis", "Other")
    .default("Other"),
  tags: Joi.array().items(Joi.string().trim()),
  publicationStatus: Joi.string()
    .valid("Draft", "Peer-reviewed", "Published")
    .default("Draft"),
  doi: Joi.string().trim().allow("", null),
  visibility: Joi.string().valid("Public", "Internal").default("Internal"),
  fileUrl: Joi.string().trim().allow("", null),
  fileSize: Joi.string().trim().allow("", null),
  imageUrl: Joi.string().trim().allow("", null),
});

const documentUpdateValidationSchema = Joi.object({
  title: Joi.string().trim().min(3).max(200),
  abstract: Joi.string().min(10),
  authors: Joi.array().items(Joi.string().trim()).min(1),
  fileType: Joi.string().valid("PDF", "DOCX", "LaTeX", "Markdown"),
  category: Joi.string().valid(
    "Algebra",
    "Topology",
    "Applied Math",
    "Analysis",
    "Other"
  ),
  tags: Joi.array().items(Joi.string().trim()),
  publicationStatus: Joi.string().valid("Draft", "Peer-reviewed", "Published"),
  doi: Joi.string().trim().allow("", null),
  visibility: Joi.string().valid("Public", "Internal"),
  fileUrl: Joi.string().trim().allow("", null),
  fileSize: Joi.string().trim().allow("", null),
  imageUrl: Joi.string().trim().allow("", null),
}).min(1);

module.exports = {
  documentValidationSchema,
  documentUpdateValidationSchema,
};
