const { Router } = require("express");
const router = Router();
const {
  productsGet,
  productCategoriesGet,
  getProductsInCategory,
  getProduct,
  productPost,
  productPut,
  productDelete,
} = require("../controllers/productos");

router.get("/", productsGet);
router.get("/categories", productCategoriesGet);
router.get("/category/:category", getProductsInCategory);
router.get("/:id", getProduct);
router.post("/", productPost);
router.put("/:id", productPut);
router.delete("/:id", productDelete);

module.exports = router;
