const {uploadFile} = require("../Helpers");
const Response = require("../Network/response");
const ErrorCustom = require("../Utils/error");

const uploadsFile = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      throw new ErrorCustom("No files were uploaded", 400);
    }

    const fileName = await uploadFile(req.files, undefined, "imgs");
    Response.succes(req, res, {fileName}, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadsFile,
};
