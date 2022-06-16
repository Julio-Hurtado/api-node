const express = require("express");
const cors = require("cors");
const {PORT} = require("../config");
const {dbConnect} = require("../Database/config");
const ErrorCustom = require("../Utils");
const {authRoutes, userRoutes,categoryRoutes} = require("../Routes");
const { globalErrors } = require("../Middlewares");

module.exports = class Server {
  #app;
  #path;
  constructor() {
    this.#app = express();
    this.port = PORT;
    this.#path = "/api";
    this.connectionDB();
    this.#middlewares();
    this.#routes();
  }

  #routes() {
    this.#app.use(`${this.#path}/auth`, authRoutes);
    this.#app.use(`${this.#path}/categories`, categoryRoutes);
    this.#app.use(`${this.#path}/user`, userRoutes);
    this.#app.all("*", (req, res, next) => {
      console.log(req.originalUrl)
      next(new ErrorCustom("resource not found", 404));
    });
    this.#app.use(globalErrors);
  }
  connectionDB() {
    dbConnect();
  }
  #middlewares() {
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({extended: false}));
    this.#app.use(cors());
  }

  listen() {
    this.#app.listen(this.port, () => {
      console.log(`api listening in http://localhost:${this.port}`);
    });
  }
};
