const router = require("express").Router();
const {
  getAllProduct,
  searchProduct,
  listRelated,
} = require("../controllers/productController");

// GET all products
router.get("/", getAllProduct);

// Search product
router.get("/search", searchProduct);

// Get related products
router.get("/related/:category/:productId", listRelated);

module.exports = router;
