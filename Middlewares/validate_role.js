const ErrorCustom = require("../Utils/error");

const isAdminRole = (req, res, next) => {
  if (!req.userAuth) {
    next(new ErrorCustom("Internal Error Authorization", 500));
  }

  if (req.userAuth.role !== "Admin_Role") {
    next(new ErrorCustom("Unauthorized-Role-Admin", 401));
  }
  next();
};

const isInRoles =
  (...roles) =>
  (req, res, next) => {
    if (!req.userAuth) {
      next(new ErrorCustom("Internal Error Authorization", 500));
    }
    if (!roles.includes(req.userAuth.role)) {
      next(new ErrorCustom(`Unauthorized-Role, you need -> ${roles}`, 401));
    }
    next();
  };
module.exports = {
  isAdminRole,
  isInRoles,
};
