const router = require("express").Router();
const {
  getAllProduct,
  getProductById,
  searchProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  listRelated,
} = require("../controllers/productController");

// GET all products
router.get("/", getAllProduct);

// GET product by id
router.get("/:productId", getProductById);

// UPDATE a product by ID
router.put("/:productId", updateProduct);

// DELETE product by ID
router.delete("/:productId", deleteProduct);

// Search product
router.get("/search", searchProduct);

// Get related products
router.get("/related/:category/:productId", listRelated);

// CREATE a new product
router.post("/new", addProduct);

module.exports = router;
