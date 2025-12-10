const Joi = require("joi");

const researcherValidationSchema = Joi.object({
  fullName: Joi.string().required().trim().min(2).max(100),
  email: Joi.string().required().email().lowercase().trim(),
  affiliation: Joi.string().trim().allow("", null),
  role: Joi.string()
    .valid("Admin", "Editor", "Researcher")
    .default("Researcher"),
  orcid: Joi.string().trim().allow("", null),
  contributions: Joi.number().integer().min(0).default(0),
  bio: Joi.string().allow("", null),
  avatar: Joi.string().trim().allow("", null),
  password: Joi.string().allow("", null).custom((value, helpers) => {
    // If password is provided and not empty, it must be at least 6 characters
    if (value && value.trim().length > 0 && value.trim().length < 6) {
      return helpers.error("string.min", { limit: 6 });
    }
    return value;
  }),
  joinedDate: Joi.string().allow("", null),
});

const researcherUpdateValidationSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(100),
  email: Joi.string().email().lowercase().trim(),
  affiliation: Joi.string().trim().allow("", null),
  role: Joi.string().valid("Admin", "Editor", "Researcher"),
  orcid: Joi.string().trim().allow("", null),
  contributions: Joi.number().integer().min(0),
  bio: Joi.string().allow("", null),
  avatar: Joi.string().trim().allow("", null),
  password: Joi.string().allow("", null).custom((value, helpers) => {
    // If password is provided and not empty, it must be at least 6 characters
    if (value && value.trim().length > 0 && value.trim().length < 6) {
      return helpers.error("string.min", { limit: 6 });
    }
    return value;
  }),
  joinedDate: Joi.string().allow("", null),
  id: Joi.string().allow("", null),
}).min(1);

module.exports = {
  researcherValidationSchema,
  researcherUpdateValidationSchema,
};


