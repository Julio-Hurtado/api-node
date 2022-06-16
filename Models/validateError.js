module.exports = class ValidateError {
  constructor(value, message) {
    (this.value = value), (this.message = message);
  }
};
