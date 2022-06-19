const {verifyToken} = require("../Helpers/generate_jwt");
const User = require("../Models/user.model");
const ErrorCustom = require("../Utils/error");

const isAutenticated = async (req, res, next) => {
  try {
    const errMessage = "Unauthorized";

    const {userId} = await verifyToken(req);

    const user = await User.findById(userId);
    if (!user) throw new ErrorCustom(errMessage, 401);
    if (user.state === false) throw new ErrorCustom(errMessage, 401);

    req.userAuth = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isAutenticated,
};
