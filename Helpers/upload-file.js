const path = require("path");
const {v4: uuidv4} = require("uuid");
const ErrorCustom = require("../Utils/error");

const defaultExt = ["png", "jpg", "jpeg"];
const uploadFile = (files, extensionsValid = defaultExt, folder = "") => {
  return new Promise((resolve, reject) => {
    const {file} = files;

    const nameShort = file.name.split(".");
    const extension = nameShort[nameShort.length - 1];

    if (!extensionsValid.includes(extension)) {
      reject(
        new ErrorCustom(
          `extension file ${extension} invalid, valids -> ${extensionsValid}`,
          400
        )
      );
    } else {
      const nameTemp = `${uuidv4()}.${extension}`;
      const uploadPath = path.join(__dirname, "../uploads/", folder, nameTemp);

      file.mv(uploadPath, (err) => {
        if (err) {
          reject(new ErrorCustom(err, 500));
        }
        resolve(nameTemp);
      });
    }
  });
};

module.exports = {
  uploadFile,
};
