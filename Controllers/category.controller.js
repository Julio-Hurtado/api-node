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
        .populate("user", "name")
        .skip(Number(skip))
        .limit(Number(limit)),
    ]);
    Response.succes(req, res, {totalRecords, categories}, 200);
  } catch (error) {
    next(error);
  }
};
const getOneById = async (req, res, next) => {
  try {
    const {id} = req.params;
    const category = await Category.findById(id).populate("user", "name");
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
    const {state, user, ...update} = req.body;
    update.name = update.name.toUpperCase();
    update.user = req.userAuth._id;
    const categoryUpdate = await Category.findByIdAndUpdate(id, update, {
      new: true,
    });
    Response.succes(req, res, {category: categoryUpdate}, 200);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const {id} = req.params;
    const update = {state: false};
    const options = {new: true};
    const categoryDeleted = await Category.findByIdAndUpdate(
      id,
      update,
      options
    );
    Response.succes(req, res, {categoryDeleted}, 200);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAll,
  getOneById,
  createCategory,
  updateCategory,
  deleteCategory,
};
