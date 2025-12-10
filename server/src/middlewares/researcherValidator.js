const {
  researcherValidationSchema,
  researcherUpdateValidationSchema,
} = require("../validations/researcherValidation");

const validateResearcher = (req, res, next) => {
  const { error } = researcherValidationSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      })),
      errorDetails: error.details
    });
  }

  next();
};

const validateResearcherUpdate = (req, res, next) => {
  const { error } = researcherUpdateValidationSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      })),
      errorDetails: error.details
    });
  }

  next();
};

module.exports = {
  validateResearcher,
  validateResearcherUpdate,
};


