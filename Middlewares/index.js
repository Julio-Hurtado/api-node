const validateData = require("./validate-data");
const validateJwt = require("./validate_jwt");
const validateRole = require("./validate_role");
const globalErrors = require("./errors");
const validatedFile = require("./validate_fileUp");
module.exports = {
  ...validateData,
  ...validateJwt,
  ...validateRole,
  ...validatedFile,
  globalErrors,
};
