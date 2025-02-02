const mongoose = require("mongoose");

/**
 * Middleware to validate a MongoDB ObjectId in a specific parameter.
 * @param {string} paramName - The name of the parameter in req.params to validate.
 */
const validateObjectId = (paramName) => {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error(`Invalid ${paramName}`);
      error.status = 400;
      return next(error);
    }
    next();
  };
};

module.exports = validateObjectId;
