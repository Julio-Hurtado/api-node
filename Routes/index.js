const userRoutes = require("./user.route");
const authRoutes = require("./auth.route");
const categoryRoutes = require("./category.route");
const productRoutes = require("./product.route");
const  searchRoutes= require("./search.route")
const uploadRoutes=require("./uploads.route")
module.exports = {
  authRoutes,
  categoryRoutes,
  productRoutes,
  searchRoutes,
  userRoutes,
  uploadRoutes
};
