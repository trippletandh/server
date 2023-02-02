const router = require("express").Router();
const {
  addOrder,
  deleteOrder,
  getOrdersByUser,
  getAllOrders,
  getIncome,
} = require("../controllers/orderController");

//GET user orders
router.get("/:userId", getOrdersByUser);

//CREATE an order
router.post("/:userId", addOrder);

//DELETE an order by ID
router.delete("/:userId", deleteOrder);

module.exports = router;
