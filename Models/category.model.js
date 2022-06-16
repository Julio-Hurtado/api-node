const {Schema, model} = require("mongoose");

const CategorySchema = new Schema({
  name: {
    type: String,
    require: [true, "category name is required"],
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user id is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// CategorySchema.methods.toJSON = function () {
//   const {__v,createdAt, ...category} = this.toObject();
//   category.createdAt = createdAt.toString();
//   return category;
// };
const Category = model("Category", CategorySchema);
module.exports = Category;
