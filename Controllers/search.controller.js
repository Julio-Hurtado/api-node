const {ObjectId} = require("mongoose").Types;
const {User, Category, Product} = require("../Models");
const Response = require("../Network/response");
const ErrorCustom = require("../Utils/error");

const searchCollection = async (
  req,
  res,
  Collection,
  param = "",
  filters = []
) => {
  const isMongoId = ObjectId.isValid(param);
  if (isMongoId) {
    const result = await Collection.findById(param);
    return Response.succes(req, res, {results: result ? [result] : []});
  }

  const regex = new RegExp(param, "i");
  const filtersQuery = filters.map((filter) => ({[filter]: regex}));

  console.log(filtersQuery);
  const users = await Collection.find({
    $or: filtersQuery,
    $and: [{state: true}],
  });
  Response.succes(req, res, {results: users}, 200);
};
const searchUsers = async (req, res, param = "") => {
  const isMongoId = ObjectId.isValid(param);
  if (isMongoId) {
    const user = await User.findById(param);
    return Response.succes(req, res, {results: user ? [user] : []}, 200);
  }
  const regex = new RegExp(param, "i");
  const users = await User.find({
    $or: [{name: regex}, {email: regex}],
    $and: [{state: true}],
  });
  Response.succes(req, res, {results: users}, 200);
};

const searchCategories = async (req, res, param = "") => {
  const isMongoId = ObjectId.isValid(param);
  if (isMongoId) {
    const category = await Category.findById(param);
    const results = category ? [category] : [];
    return Response.succes(req, res, {results}, 200);
  }
  const regex = new RegExp(param, "i");
  const categories = await Category.find({name: regex});
  Response.succes(req, res, {results: categories}, 200);
};

const searchProducts = async (req, res, param = "") => {
  const isMongoId = ObjectId.isValid(param);
  const populate = {path: "category", select: "name"};
  const userPopulate = {path: "user", select: "name email"};
  if (isMongoId) {
    const product = await Product.findById(param).populate(populate);
    const results = product ? [product] : [];
    return Response.succes(req, res, {results}, 200);
  }
  const regex = new RegExp(param, "i");
  const products = await Product.find({name: regex})
    .populate(populate)
    .populate(userPopulate);
  Response.succes(req, res, {results: products}, 200);
};

const collectionAvailable = ["category", "product", "user", "role"];

const search = (req, res, next) => {
  const {collection, param} = req.params;
  try {
    if (!collectionAvailable.includes(collection))
      throw new ErrorCustom(
        `collections available are: ${collectionAvailable}`,
        400
      );

    switch (collection) {
      case "user":
        // searchUsers(req, res, param);
        searchCollection(req, res, User, param, ["name", "email"]);
        break;
      case "category":
        // searchCategories(req, res, param);
        searchCollection(req, res, Category, param, ["name"]);
        break;
      case "product":
        searchProducts(req, res, param);
        break;
      default:
        throw new ErrorCustom(`not yet implemented`, 500);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  search,
};
