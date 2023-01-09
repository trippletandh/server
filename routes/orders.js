const router = require("express").Router();
const {
  addOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUser,
  getAllOrders,
  getIncome,
} = require("../controllers/orderController");

//CREATE an order
router.post("/", addOrder);

//UPDATE an order by ID
router.put("/:id", updateOrder);

//DELETE an order by ID
router.delete("/:id", deleteOrder);

//GET user orders
router.get("/find/:userId", getOrdersByUser);

//GET ALL orders
router.get("/", getAllOrders);

// GET monthly income
router.get("/income", getIncome);

module.exports = router;
