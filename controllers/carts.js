const { response, request } = require("express");
const Cart = require("../models/cart");

const cartGetById = async (req = request, res = response) => {
  const { id } = req.params.id;
  try {
    const cart = await Cart.findOne(id);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCart = async (req, res) => {
  const { id } = req.params.id;
  try {
    const cart = await Cart.findOne(id);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addCart = async (req, res) => {
  const userId = req.body.userId;
  const products = req.body.products;

  const data = {
    userId,
    products,
  };

  const cart = new Cart(data);
  await cart.save();

  res.json({
    cart,
    messaje: "POST Success",
  });
};

const cartPut = async (req, res) => {
  const { id } = req.params;
  const { userId, products, ...rest } = req.body;
  rest.userId = userId;
  rest.products = products;

  const cart = await Cart.findByIdAndUpdate(id, rest, { new: true });

  res.json({
    mensaje: "PUT Success",
    cart,
  });
};

module.exports = {
  cartGetById,
  deleteCart,
  addCart,
  cartPut,
};
