const {validationResult} = require("express-validator");
const Response = require("../Network/response");
const ValidateError = require("../Models/validateError");

const validateData = (req, res, next) => {
  let resErros = [];
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().map((err) => {
      resErros = [...resErros, new ValidateError(err.param, err.msg)];
    });
    return Response.error(req, res, {errors: resErros}, 400);
  }
  next();
};

module.exports = {
  validateData,
};
