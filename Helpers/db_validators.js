const {Role, Category, User, Product} = require("../Models");

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
    console.log(existCategory);
    if (existCategory)
      throw new Error(`this category: ${name} is already registered`);
  } catch (error) {
    throw error;
  }
};

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
    console.log(existProduct);
    if (existProduct)
      throw new Error(`this Product: ${name} is already registered`);
  } catch (error) {
    throw error;
  }
};
module.exports = {
  isValidRole,
  isExistEmail,
  isExistUserId,
  isExistCategory,
  existCategoryId,
  isExistProductId,
  isExistProduct,
};
