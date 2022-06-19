const {Router} = require("express");
const {check} = require("express-validator");
const {
  getAllProducts,
  getProductById,
  createProduct,
} = require("../Controllers/product.controller");
const {
  isExistProductId,
  isExistProduct,
  existCategoryId,
} = require("../Helpers/db_validators");
const {validateData, isAutenticated} = require("../Middlewares");

class ProductRoutes {
  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.get("/", getAllProducts);
    this.router.get(
      "/:id",
      [
        check("id", "product id invalid").isMongoId(),
        check("id").custom(isExistProductId),
        validateData,
      ],
      getProductById
    );
    this.router.post(
      "/",
      [
        isAutenticated,
        check("name").custom(isExistProduct),
        check("category").custom(existCategoryId),
        validateData,
      ],
      createProduct
    );
  }
}

const productRoutes = new ProductRoutes();
module.exports = productRoutes.router;
