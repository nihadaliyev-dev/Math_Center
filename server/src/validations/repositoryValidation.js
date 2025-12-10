const Joi = require("joi");

const repositoryValidationSchema = Joi.object({
  name: Joi.string().required().trim().min(2).max(100),
  category: Joi.string().required().trim(),
  isPublic: Joi.boolean().default(false),
  fileCount: Joi.number().integer().min(0).default(0),
  size: Joi.string().trim().default("0 MB"),
  owner: Joi.string().required(),
});

const repositoryUpdateValidationSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  category: Joi.string().trim(),
  isPublic: Joi.boolean(),
  fileCount: Joi.number().integer().min(0),
  size: Joi.string().trim(),
  owner: Joi.string(),
}).min(1);

const repositoryVisibilityValidationSchema = Joi.object({
  isPublic: Joi.boolean().required(),
});

module.exports = {
  repositoryValidationSchema,
  repositoryUpdateValidationSchema,
  repositoryVisibilityValidationSchema,
};


