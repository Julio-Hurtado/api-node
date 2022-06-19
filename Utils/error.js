module.exports = class ErrorCustom extends Error {
  constructor(message = "", code = 500) {
    super(message);
    this.statusCode = code;
  }
};
