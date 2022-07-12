const {Router} = require("express");
const {uploadsFile} = require("../Controllers/uploads.controller");

class uploadRoutes {
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post("/", uploadsFile);
  }
}

const uploadRoute = new uploadRoutes();
module.exports = uploadRoute.router;
