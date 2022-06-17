const {Schema, model} = require("mongoose");

const ProductSchema = new Schema({
  name: {
    type: String,
    require: [true, "product name is required"],
    unique: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "category id is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user id is required"],
  },
  description: {type: String},
  state: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  available: {type: Boolean, default: true},
});

ProductSchema.methods.toJSON = function () {
  const {__v, state, ...product} = this.toObject();
  return product;
};

const Product = model("Product", ProductSchema);
module.exports = Product;
