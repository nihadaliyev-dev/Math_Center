const {
  eventValidationSchema,
  eventUpdateValidationSchema,
} = require("../validations/eventValidation");

const validateEvent = (req, res, next) => {
  const { error } = eventValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: req.t("validation_error"),
      errors: error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      })),
    });
  }

  next();
};

const validateEventUpdate = (req, res, next) => {
  const { error } = eventUpdateValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: req.t("validation_error"),
      errors: error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      })),
    });
  }

  next();
};

module.exports = {
  validateEvent,
  validateEventUpdate,
};


