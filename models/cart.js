const { Schema, model } = require("mongoose");
const User = require("./usuario");
const Product = require("./producto");

const CartSchema = Schema({
  userId: {
    type: Number,
    ref: User,
    required: true,
  },
  products: [
    {
      productId: {
        type: Number,
        ref: Product,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = model("Cart", CartSchema);
