const router = require("express").Router();
const {
  getAllProduct,
  getProductById,
  searchProduct,
  listRelated,
} = require("../controllers/productController");

// GET all products
router.get("/", getAllProduct);

// GET product by id
router.get("/:productId", getProductById);

// Search product
router.get("/search", searchProduct);

// Get related products
router.get("/related/:category/:productId", listRelated);

module.exports = router;
