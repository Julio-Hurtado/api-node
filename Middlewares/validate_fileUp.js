const ErrorCustom = require("../Utils/error");

const validatedUploadFile = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    next(new ErrorCustom("No files were uploaded", 400));
  } else {
    next();
  }
};

module.exports = {
  validatedUploadFile,
};
