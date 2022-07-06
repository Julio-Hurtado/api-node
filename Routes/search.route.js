const {Router} = require("express");
const {search} = require("../Controllers/search.controller");

class SearchRoutes {
  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.get("/:collection/:param", search);
  }
}

const searchRoutes = new SearchRoutes();
module.exports = searchRoutes.router;
