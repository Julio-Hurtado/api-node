const Role = require("../models/role.model");
const User = require("../Models/user.model");

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
module.exports = {
  isValidRole,
  isExistEmail,
  isExistUserId,
};
