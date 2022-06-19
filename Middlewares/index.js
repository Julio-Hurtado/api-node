const validateData = require("../Middlewares/validate-data");
const validateJwt = require("../Middlewares/validate_jwt");
const validateRole = require("../Middlewares/validate_role");
const globalErrors = require("../Middlewares/errors");

module.exports = {
  ...validateData,
  ...validateJwt,
  ...validateRole,
  globalErrors,
};
