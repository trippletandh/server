const router = require("express").Router();
const {
  getAllReviews,
  getReviewById,
  addReview,
  deleteReview,
  editReview,
} = require("../controllers/reviewController");

// router.get("/", getAllReviews);
router.post("/", addReview);

router.get("/:productId", getReviewById);

router.delete("/:productId/:reviewId", deleteReview);

router.put("/:productId/:reviewId", editReview);

module.exports = router;
