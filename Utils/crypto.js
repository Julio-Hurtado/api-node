const crypto = require("crypto");

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("base64");
    crypto.pbkdf2(password, salt, 1000, 64, "sha1", (err, buff) => {
      if (err) reject(err);
      const hashedPassword = `${buff.toString("base64")}.${salt}`;
      resolve(hashedPassword);
    });
  });
};

const comparePassword = (password, storePassword) => {
  return new Promise((resolve, reject) => {
    const [hashedPassword, salt] = storePassword.split(".");
    crypto.pbkdf2(password, salt, 1000, 64, "sha1", (err, buff) => {
      if (err) reject(err);
      resolve(buff.toString("base64") === hashedPassword);
    });
  });
};

module.exports = {
  hashPassword,
  comparePassword,
};
