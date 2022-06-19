const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

/*
sobreescribe el metodo toJSON => 
para quitar propiedades que no 
se quieran retornar al cliente*/
UserSchema.methods.toJSON = function () {
  const {__v, _id, password, ...user} = this.toObject();
  user.userId = _id;
  return user;
};
const User = model("User", UserSchema);
module.exports = User;
