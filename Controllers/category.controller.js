const {Category} = require("../Models");
const Response = require("../Network/response");
const ErrorCustom = require("../Utils");
const getAll = async (req, res, next) => {
  try {
    const {skip = 0, limit = 5} = req.query;
    const query = {state: true};
    const [totalRecords, categories] = await Promise.all([
      Category.countDocuments(query),
      Category.find(query)
        .skip(Number(skip))
        .limit(Number(limit))
        .populate("user"),
    ]);
    Response.succes(req, res, {totalRecords, categories}, 200);
  } catch (error) {
    next(error);
  }
};
const getOneById = async (req, res, next) => {
  try {
    const {id} = req.params;
    const category = await Category.findById(id).populate("user");
    if (!category) throw new ErrorCustom("Category not found", 404);
    Response.succes(req, res, category, 200);
  } catch (error) {
    next(error);
  }
};
const createCategory = async (req, res, next) => {
  try {
    const {_id: user} = req.userAuth;
    const name = req.body.name.toUpperCase();
    const category = new Category({name, user});
    const categorySaved = await category.save();
    Response.succes(req, res, {category: categorySaved}, 200);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const {id} = req.params;
    const name = req.body.name.toUpperCase();
    const categoryUpdate = await Category.findByIdAndUpdate(
      id,
      {name},
      {new: true}
    );
    Response.succes(req, res, {category: categoryUpdate}, 200);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAll,
  getOneById,
  createCategory,
  updateCategory,
};
