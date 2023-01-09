const router = require("express").Router();
const {
  addCart,
  deleteCart,
  getCartByUser,
  getAllCart,
  updateCart,
} = require("../controllers/cartController");

//CREATE a cart
router.post("/", addCart);

//UPDATE cart by ID
router.put("/:id", updateCart);

//DELETE cart by ID
router.delete("/:id", deleteCart);

//GET user cart
router.get("/find/:userId", getCartByUser);

//GET ALL carts
router.get("/", getAllCart);

module.exports = router;
