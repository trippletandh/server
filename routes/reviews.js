const router = require("express").Router();
const {
  getAllReviews,
  getReviewById,
  addReview,
  deleteReview,
  editReview,
} = require("../controllers/reviewController");

router.get("/", getAllReviews);

router.get("/:productId", getReviewById);

router.post("/", addReview);

router.delete("/:productId", deleteReview);

router.put("/:productId", editReview);

module.exports = router;
