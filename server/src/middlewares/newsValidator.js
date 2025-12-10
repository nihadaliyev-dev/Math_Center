const newsValidationSchema = require("../validations/newsValidation");

module.exports = (req, res, next) => {
  const { error } = newsValidationSchema.validate(req.body, {
    abortEarly: false, // Get all errors, not just the first one
  });

  if (error) {
    const { details } = error;
    console.error("Validation Error:", details);
    const errorMessage = details.map((detail) => detail.message).join(", ");
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errorMessage,
    });
  }

  next();
};
