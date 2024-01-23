const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  category: { type: String, required: true },
  image: { type: String, required: [true, "Img is required"] },
});

ProductSchema.methods.toJSON = function () {
  const { __v, id, ...product } = this.toObject();
  product.uid = id;
  return product;
};
module.exports = model("Product", ProductSchema);
