const Joi = require("joi");

const newsValidationSchema = Joi.object({
  title: Joi.object({
    az: Joi.string().required().trim(),
    en: Joi.string().required().trim(),
  }).required(),
  titleInEng: Joi.string().trim(),
  coverImage: Joi.string().trim(),
  content: Joi.string().trim().allow(""),
  author: Joi.string().trim().allow(""),
  slug: Joi.string().trim().allow(""),
  category: Joi.string()
    .valid("Awards", "Research", "Updates", "Other")
    .allow(""),
  status: Joi.string().valid("Draft", "Published", "Archived").allow(""),
  publishDate: Joi.date().allow(""),
  tags: Joi.array().items(Joi.string().trim()).allow(null),
  viewCount: Joi.number().allow(null),
});

module.exports = newsValidationSchema;
