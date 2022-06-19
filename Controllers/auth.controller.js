const {signToken} = require("../Helpers/generate_jwt");
const {User} = require("../Models");
const Response = require("../Network/response");
const {comparePassword} = require("../Utils");
const ErrorCustom = require("../Utils/error");

const login = async (req, res, next) => {
  const {email, password} = req.body;
  const errMessage = "email or password invalid",
    errCode = 400;
  try {
    const user = await User.findOne({email});
    if (!user) throw new ErrorCustom(errMessage, errCode);
    if (!user.state) throw new ErrorCustom(errMessage, errCode);

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new ErrorCustom(errMessage, errCode);

    const token = await signToken(user.id);
    
    Response.succes(req, res, {user, token}, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
