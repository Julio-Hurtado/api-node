const {Role, Category, User, Product} = require("../Models");
const ErrorCustom = require("../Utils/error");

/**
 *
 * @validations_user
 */
const isValidRole = async (role = "") => {
  if (role === "") throw new Error("role is required");
  const existRole = await Role.findOne({role});
  if (!existRole) throw new Error(`role: ${role}, is not valid`);
};

const isExistEmail = async (email = "") => {
  const existEmail = await User.findOne({email});
  if (existEmail)
    throw new Error(`email: ${email}, is already been registered`);
};

const isExistUserId = async (id) => {
  try {
    const errMessage = `this id: ${id} not exist`;
    const existUser = await User.findById(id);
    if (!existUser) throw new Error(errMessage);
    if (!existUser.state) throw new Error(errMessage);
  } catch (error) {
    const message = error.kind ? `this id: ${id} is wrong cast` : error.message;
    // console.log(message);
    throw new Error(message);
  }
};

/**
 *
 * @validations_category
 *
 */
const existCategoryId = async (id) => {
  try {
    const errMessage = `this category id ${id} not exist`;
    const existCategory = await Category.findById(id);
    if (!existCategory) throw new Error(errMessage);
    if (!existCategory.state) throw new Error(errMessage);
  } catch (error) {
    const message = error.kind ? `this id: ${id} is wrong cast` : error.message;
    throw new Error(message);
  }
};
const isExistCategory = async (name) => {
  try {
    const param = name.toUpperCase();
    const existCategory = await Category.findOne({name: param});
    if (existCategory)
      throw new Error(`this category: ${name} is already registered`);
  } catch (error) {
    throw error;
  }
};
const isSameCategory = async (req, res, next) => {
  const {id} = req.params;
  const {name} = req.body;
  let param = name.toUpperCase();
  const existCategory = await Category.findOne({name: param});
  if (!existCategory) {
    next();
  } else {
    existCategory._id.toString() === id.toString()
      ? next()
      : next(
          new ErrorCustom(`this Category: ${name} has already registered`, 409)
        );
  }
};
/**
 *
 * @validations_product
 *
 */
const isExistProductId = async (id) => {
  try {
    const errMessage = `this product id ${id} not exist`;
    const productId = await Product.findById(id);
    if (!productId) throw new Error(errMessage);
    if (!productId.state) throw new Error(errMessage);
    if (!productId.available) throw new Error("product not available");
  } catch (error) {
    const message = error.kind ? `this id: ${id} is wrong cast` : error.message;
    throw new Error(message);
  }
};

const isExistProduct = async (name) => {
  try {
    const param = name.toUpperCase();
    const existProduct = await Product.findOne({name: param});
    if (existProduct)
      throw new Error(`this Product: ${name} is already registered`);
  } catch (error) {
    throw error;
  }
};
const isSameProduct = async (req, res, next) => {
  const {id} = req.params;
  const {name} = req.body;
  let param = name.toUpperCase();
  const existProduct = await Product.findOne({name: param});
  if (!existProduct) {
    next();
  } else {
    existProduct._id.toString() === id.toString()
      ? next()
      : next(
          new ErrorCustom(`this Product: ${name} has already registered`, 409)
        );
  }
};

/**
 * validation before to upload file
 * @param {name_collection} collection
 * @param {array collections available} avbCollections
 * @returns true or Error
 */

const collectionsAvailable = (collection, avbCollections = []) => {
  const include = avbCollections.includes(collection);
  if (!include) {
    throw new Error(`Collection ${collection} is not available`);
  }
  return true;
};
module.exports = {
  isValidRole,
  isExistEmail,
  isExistUserId,
  isExistCategory,
  existCategoryId,
  isSameCategory,
  isExistProductId,
  isExistProduct,
  isSameProduct,
  collectionsAvailable,
};
