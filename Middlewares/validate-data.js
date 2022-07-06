const {validationResult} = require("express-validator");
const Response = require("../Network/response");
const ValidateError = require("../Models/validateError");

const validateData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const valErrors = errors
      .array()
      .map((err) => new ValidateError(err.param, err.msg));
    return Response.error(req, res, {errors: valErrors}, 400);
  }
  next();
};

module.exports = {
  validateData,
};
