const {Product} = require("../Models");
const Response = require("../Network/response");
const ErrorCustom = require("../Utils/error");
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .populate("user", "name");
    Response.succes(req, res, {products}, 200);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const {id} = req.params;
    const product = await Product.findById(id)
      .populate("category", "name")
      .populate("user", "name");
    if (!product) throw new ErrorCustom("product not found", 404);
    Response.succes(req, res, {product}, 200);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const {state, available, user, ...product} = req.body;
    product.name = product.name.toUpperCase();
    product.user = req.userAuth._id;
    const newProduct = new Product(product);
    const productSaved = await newProduct.save();
    Response.succes(req, res, {product: productSaved}, 201);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {state, available, user, ...update} = req.body;
    update.name = update.name.toUpperCase();
    update.user = req.userAuth._id;
    const productUpdated = await Product.findByIdAndUpdate(id, update, {
      new: true,
    });
    Response.succes(req, res, {productUpdated}, 200);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const {id} = req.params;
    const update = {state: false};
    const options = {new: true};
    const productDeleted = await Product.findByIdAndUpdate(id, update, options);
    Response.succes(req, res, {productDeleted}, 200);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
