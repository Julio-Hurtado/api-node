const {Router} = require("express");
const {check} = require("express-validator");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../Controllers/product.controller");
const {
  isExistProductId,
  isExistProduct,
  existCategoryId,
  isSameProduct,
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
        check("name", "product name is required").not().isEmpty(),
        check("category", "category is required").not().isEmpty(),
        check("category", "category id invalid").isMongoId(),
        validateData,
        check("name").custom(isExistProduct),
        check("category").custom(existCategoryId),
        validateData,
      ],
      createProduct
    );
    this.router.put(
      "/:id",
      [
        isAutenticated,
        check("id", "product id invalid").isMongoId(),
        check("name", "product name is required").not().isEmpty(),
        check("category", "category is required").not().isEmpty(),
        check("category", "category id invalid").isMongoId(),
        validateData,
        check("id").custom(isExistProductId),
        check("category").custom(existCategoryId),
        validateData,
        isSameProduct,
      ],
      updateProduct
    );
    this.router.delete(
      "/",
      [
        isAutenticated,
        check("id", "product id invalid").isMongoId(),
        check("id").custom(isExistProductId),
        validateData,
      ],
      deleteProduct
    );
  }
}

const productRoutes = new ProductRoutes();
module.exports = productRoutes.router;
