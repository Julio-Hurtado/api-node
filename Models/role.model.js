const {Schema, model} = require("mongoose");

const RoleSchema = new Schema({
  role: {
    type: String,
    required: [true, "role is required"],
  },
});

const Role = model("Role", RoleSchema);
module.exports = Role;
