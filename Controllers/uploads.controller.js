const path = require("path");
const fs = require("fs");
const {uploadFile} = require("../Helpers");
const {User, Product} = require("../Models");
const Response = require("../Network/response");
const ErrorCustom = require("../Utils/error");

const showImage = async (req, res, next) => {
  const {collection, id} = req.params;
  try {
    let Model;
    switch (collection) {
      case "user":
        Model = await User.findById(id);
        if (!Model) throw new ErrorCustom("user not found", 404);
        break;
      case "products":
        Model = await Product.findById(id);
        if (!Model) throw new ErrorCustom("product not found", 404);
        break;
      default:
        throw new ErrorCustom("not implement", 500);
    }

    if (Model.image) {
      const pathImg = path.join(
        __dirname,
        "../uploads",
        collection,
        Model.image
      );
      if (fs.existsSync(pathImg)) {
        return res.sendFile(pathImg);
      }
    }
    const defaultPath = path.join(__dirname, "../assets", "no-image.jpg");
    res.sendFile(defaultPath);
  } catch (error) {
    next(error);
  }
};
const uploadsFile = async (req, res, next) => {
  try {
    const fileName = await uploadFile(req.files, undefined, "imgs");
    Response.succes(req, res, {fileName}, 200);
  } catch (error) {
    next(error);
  }
};

const updateImage = async (req, res, next) => {
  const {collection, id} = req.params;
  try {
    let Model;
    switch (collection) {
      case "user":
        Model = await User.findById(id);
        if (!Model) throw new ErrorCustom("user not found", 404);
        break;
      case "products":
        Model = await Product.findById(id);
        if (!Model) throw new ErrorCustom("product not found", 404);
        break;
      default:
        throw new ErrorCustom("not implement", 500);
    }

    /**
     * clean previous img
     */
    if (Model.image) {
      const pathImg = path.join(
        __dirname,
        "../uploads",
        collection,
        Model.image
      );
      if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
      }
    }

    const fileName = await uploadFile(req.files, undefined, collection);
    Model.image = fileName;
    await Model.save();
    Response.succes(req, res, Model, 200);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  uploadsFile,
  updateImage,
  showImage,
};
