const jwt = require("jsonwebtoken");
const { SECRET_JWT } = require("../config");
const ErrorCustom = require("../Utils/error");

const signToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {userId};
    const options = {expiresIn: "1h"};
    jwt.sign(payload, SECRET_JWT, options, (err, token) => {
      if (err) {
        console.error("[signToken]", err);
        reject(new ErrorCustom("Internal error", 500));
      }
      resolve(token);
    });
  });
};

const verifyToken = (req) => {
  return new Promise((resolve, reject) => {
    const errMessage = "Unauthorized";
    if (!req.headers["authorization"]) reject(new ErrorCustom(errMessage, 401));

    const authHeader = req.headers["authorization"];
    const [bearer, token] = authHeader.split(" ");

    jwt.verify(token, SECRET_JWT, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? errMessage : err.message;
        reject(new ErrorCustom(message, 401));
      }
      resolve(payload);
    });
  });
};
module.exports = {
  signToken,
  verifyToken,
};
