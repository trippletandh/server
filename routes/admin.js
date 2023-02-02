const router = require("express").Router();
const {
  deleteUser,
  getAllUsers,
  getUserStats,
  addUser,
} = require("../controllers/userController");

const {
  deleteOrder,
  getAllOrders,
  getIncome,
} = require("../controllers/orderController");

const {
  getAllProduct,
  searchProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Users
//GET ALL USER
router.get("/users", getAllUsers);

//Create Anonymous USER
router.post("/users", addUser);

//DELETE user by ID
router.delete("/users/:id", deleteUser);

//GET USER STATS
router.get("/users/stats", getUserStats);

//Order
//GET ALL orders
router.get("/orders", getAllOrders);

//DELETE an order by ID
router.delete("/orders/:userId", deleteOrder);

// GET monthly income
router.get("/orders/income", getIncome);

//Products
// GET all products
router.get("/products", getAllProduct);

// UPDATE a product by ID
router.put("/products/:productId", updateProduct);

// DELETE product by ID
router.delete("/products/:productId", deleteProduct);

// Search product
router.get("/products/search", searchProduct);

// CREATE a new product
router.post("/products/new", addProduct);

module.exports = router;
