const router = require("express").Router();
const {
  getAllProduct,
  getProductById,
  searchProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// GET all products
router.get("/", getAllProduct);

// GET product by id
router.get("/:productId", getProductById);

// Search product
router.get("/search", searchProduct);

// CREATE a new product
router.post("/new", addProduct);

// UPDATE a product by ID
router.put("/:productId", updateProduct);

// DELETE product by ID
router.delete("/:productId", deleteProduct);

module.exports = router;
