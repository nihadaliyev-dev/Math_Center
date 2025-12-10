const Joi = require("joi");

const eventValidationSchema = Joi.object({
  title: Joi.string().required().trim().min(3).max(200),
  description: Joi.string().required().min(10),
  startDate: Joi.date().required(),
  endDate: Joi.date().required().greater(Joi.ref("startDate")),
  location: Joi.string().valid("Online", "On-Campus").default("Online"),
  organizer: Joi.string().required().trim(),
  speakers: Joi.array().items(Joi.string().trim()),
  registrationLink: Joi.string().uri().trim().allow("", null),
  coverImage: Joi.string().uri().trim().allow("", null),
  tags: Joi.array().items(Joi.string().trim()),
  status: Joi.string()
    .valid("Draft", "Published", "Cancelled")
    .default("Draft"),
});

const eventUpdateValidationSchema = Joi.object({
  title: Joi.string().trim().min(3).max(200),
  description: Joi.string().min(10),
  startDate: Joi.date(),
  endDate: Joi.date().when("startDate", {
    is: Joi.exist(),
    then: Joi.date().greater(Joi.ref("startDate")),
  }),
  location: Joi.string().valid("Online", "On-Campus"),
  organizer: Joi.string().trim(),
  speakers: Joi.array().items(Joi.string().trim()),
  registrationLink: Joi.string().uri().trim().allow("", null),
  coverImage: Joi.string().uri().trim().allow("", null),
  tags: Joi.array().items(Joi.string().trim()),
  status: Joi.string().valid("Draft", "Published", "Cancelled"),
}).min(1);

module.exports = {
  eventValidationSchema,
  eventUpdateValidationSchema,
};









