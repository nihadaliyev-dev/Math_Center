const {
  documentValidationSchema,
  documentUpdateValidationSchema,
} = require("../validations/documentValidation");

const validateDocument = (req, res, next) => {
  const { error } = documentValidationSchema.validate(req.body);

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

const validateDocumentUpdate = (req, res, next) => {
  const { error } = documentUpdateValidationSchema.validate(req.body);

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
  validateDocument,
  validateDocumentUpdate,
};


