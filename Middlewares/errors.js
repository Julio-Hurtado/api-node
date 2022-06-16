const Response = require("../Network/response");
const globalErrors = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "fail";
  Response.error(req, res, message, statusCode);
};

module.exports = globalErrors;
