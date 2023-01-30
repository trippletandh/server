const router = require("express").Router();
const {
  addCart,
  getCartByUser,
  deleteCartItem,
  updateCartItem,
  deleteCart,
} = require("../controllers/cartController");

//CREATE a cart
router.post("/:userId", addCart);

//GET user cart
router.get("/:userId", getCartByUser);

//DELETE cart by userId
router.delete("/:userId", deleteCart);

//DELETE cart item
router.delete("/:userId/:productId", deleteCartItem);

//UPDATE cart by ID
router.put("/:userId/:productId", updateCartItem);

module.exports = router;
