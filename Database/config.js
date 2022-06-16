const mongoose = require("mongoose");
const {MONGO_URI} = require("../config");
const dbConnect = () => {
  const options = {
    useNewUrlParser: true,
  };
  mongoose
    .connect(MONGO_URI, options)
    .then(() => console.log("DB is online"))
    .catch((err) => {
      console.error("[DB_error]", err);
      throw new Error("Error connection to DB");
    });
};

module.exports = {
  dbConnect,
};
