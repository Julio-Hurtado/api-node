const {Router} = require("express");
const {check} = require("express-validator");
const {
  isAutenticated,
  validateData,
  isAdminRole,
  isInRoles,
} = require("../Middlewares");
const {
  isValidRole,
  isExistEmail,
  isExistUserId,
} = require("../Helpers/db_validators");
const {
  getUsers,
  saveUser,
  updateUser,
  activatedUser,
  deleteUser,
} = require("../Controllers/user.controller");

class UserRoutes {
  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.get("/", getUsers);
    this.router.post(
      "/",
      [
        check("name", "name is required").not().isEmpty(),
        check("email", "email is invalid").isEmail(),
        check("email").custom(isExistEmail),
        check("password", "name is required").not().isEmpty(),
        check("role").custom(isValidRole),
        validateData,
      ],
      saveUser
    );
    this.router.put(
      "/:id",
      [
        isAutenticated,
        check("id", "this id is not valid").isMongoId(),
        check("id").custom(isExistUserId),
        check("role").custom(isValidRole),
        validateData,
      ],
      updateUser
    );
    this.router.patch("/:id", activatedUser);
    this.router.delete(
      "/:id",
      [
        isAutenticated,
        // isAdminRole,
        isInRoles("User_Role", "Admin_Role", "Sales_Role"),
        check("id", "this id is not valid").isMongoId(),
        check("id").custom(isExistUserId),
        validateData,
      ],
      deleteUser
    );
  }
}
const userRoutes = new UserRoutes();
module.exports = userRoutes.router;
