const {
  repositoryValidationSchema,
  repositoryUpdateValidationSchema,
  repositoryVisibilityValidationSchema,
} = require("../validations/repositoryValidation");

const validateRepository = (req, res, next) => {
  const { error } = repositoryValidationSchema.validate(req.body);

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

const validateRepositoryUpdate = (req, res, next) => {
  const { error } = repositoryUpdateValidationSchema.validate(req.body);

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

const validateRepositoryVisibility = (req, res, next) => {
  const { error } = repositoryVisibilityValidationSchema.validate(req.body);

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
  validateRepository,
  validateRepositoryUpdate,
  validateRepositoryVisibility,
};









