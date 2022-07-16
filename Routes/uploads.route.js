const {Router} = require("express");
const {check} = require("express-validator");
const {
  uploadsFile,
  updateImage,
  showImage,
} = require("../Controllers/uploads.controller");
const {collectionsAvailable} = require("../Helpers");
const {validateData} = require("../Middlewares");
const {validatedUploadFile} = require("../Middlewares/validate_fileUp");

class uploadRoutes {
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get(
      "/:collection/:id",
      [
        check("id", "id is invalid").isMongoId(),
        check("collection").custom((c) =>
          collectionsAvailable(c, ["user", "products"])
        ),
        validateData,
      ],
      showImage
    );
    this.router.post("/", validatedUploadFile, uploadsFile);
    this.router.put(
      "/:collection/:id",
      [
        validatedUploadFile,
        check("id", "id is invalid").isMongoId(),
        check("collection").custom((c) =>
          collectionsAvailable(c, ["user", "products"])
        ),
        validateData,
      ],
      updateImage
    );
  }
}

const uploadRoute = new uploadRoutes();
module.exports = uploadRoute.router;
