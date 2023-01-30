const router = require("express").Router();
const {
  addOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUser,
  getAllOrders,
  getIncome,
} = require("../controllers/orderController");

//GET ALL orders
router.get("/", getAllOrders);

//CREATE an order
router.post("/:userId", addOrder);

//DELETE an order by ID
router.delete("/:userId", deleteOrder);

//GET user orders
router.get("/:userId", getOrdersByUser);

// GET monthly income
router.get("/income", getIncome);

module.exports = router;
