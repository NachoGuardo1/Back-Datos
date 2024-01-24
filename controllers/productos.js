const { response, request } = require("express");
const Product = require("../models/producto");

const productsGet = async (req = request, res = response) => {
  const { skip = 0, limit, searchTerm } = req.query;
  const query = { state: true };

  if (searchTerm) {
    query.title = { $regex: searchTerm, $options: "i" };
  }

  try {
    const [total, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query).skip(skip).limit(limit),
    ]);

    res.json({
      total,
      products,
    });
  } catch (error) {
    res.status(500);
  }
};

const getProduct = async (req, res) => {
  const prodId = req.params.id;

  try {
    const product = await Product.findById(prodId);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const productPost = async (req = request, res = response) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const image = req.body.image;
  const category = req.body.category;
  const rating = req.body.rating;

  const data = {
    title,
    description,
    price,
    category,
    image,
    rating,
  };

  const product = new Product(data);

  await product.save();

  res.json({
    product,
    messaje: "POST Success",
  });
};

const productPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { title, description, price, category, image, rating, ...rest } =
    req.body;
  rest.title = title;
  rest.description = description;
  rest.price = price;
  rest.category = category;
  rest.image = image;
  rest.rating = rating;

  const product = await Product.findByIdAndUpdate(id, rest, { new: true });

  res.json({
    mensaje: "PUT Success",
    product,
  });
};

const productDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const productAutenticated = req.product;
  const product = await Product.findById(id);

  if (!product.state) {
    return res.json({
      msg: "Alredy false",
    });
  }

  const prodInactive = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json({
    msg: "DELETE success",
    prodInactive,
    productAutenticated,
  });
};

const productCategoriesGet = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProductsInCategory = async (req, res) => {
  const { skip = 0, limit } = req.query;
  const category = req.params.category;
  try {
    const products = await Product.find({ category }).skip(skip).limit(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  productsGet,
  productPost,
  getProduct,
  productPut,
  productDelete,
  productCategoriesGet,
  getProductsInCategory,
};
