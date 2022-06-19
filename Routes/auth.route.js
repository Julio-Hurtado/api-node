const {Router} = require("express");
const {check} = require("express-validator");
const {login} = require("../Controllers/auth.controller");
const {validateData} = require("../Middlewares");

class AuthRoutes {
  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.post(
      "/login",
      [
        check("email", "email is required").isEmail(),
        check("password", "password is required").not().isEmpty(),
        validateData,
      ],
      login
    );
  }
}

const authRoutes = new AuthRoutes();
module.exports = authRoutes.router;
