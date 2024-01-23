const { Router } = require("express");
const router = Router();
const {
  cartGetById,
  cartPut,
  addCart,
  deleteCart,
} = require("../controllers/carts");

router.get("/", cartGetById);
router.post("/", addCart);
router.put("/:id", cartPut);
router.delete("/:id", deleteCart);

module.exports = router;
