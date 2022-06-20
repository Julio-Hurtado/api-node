const {Router} = require("express");
const {check} = require("express-validator");
const {
  getAll,
  getOneById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../Controllers/category.controller");
const {isExistCategory, existCategoryId, isSameCategory} = require("../Helpers/db_validators");
const {validateData, isAutenticated, isAdminRole} = require("../Middlewares");

class CategoryRoutes {
  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.get("/", getAll);
    this.router.get(
      "/:id",
      [
        check("id", "category id invalid").isMongoId(),
        check("id").custom(existCategoryId),
        validateData,
      ],
      getOneById
    );
    this.router.post(
      "/",
      [
        isAutenticated,
        check("name", "category name is required").not().isEmpty(),
        validateData,        
        check("name").custom(isExistCategory),
        validateData,
      ],
      createCategory
    );
    this.router.put(
      "/:id",
      [
        isAutenticated,
        check("id", "category id is invalid").isMongoId(),
        check("name", "category name is required").not().isEmpty(),
        validateData,
        check("id").custom(existCategoryId),
        validateData,
        isSameCategory,
      ],
      updateCategory
    );
    this.router.delete(
      "/:id",
      [
        isAutenticated,
        isAdminRole,
        check("id", "category id is invalid").isMongoId(),
        check("id").custom(existCategoryId),
        validateData,
      ],
      deleteCategory
    );
  }
}

const categoryRoutes = new CategoryRoutes();
module.exports = categoryRoutes.router;
