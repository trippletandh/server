const { verifyToken } = require("../utility/verifyToken");
const router = require("express").Router();
const {
  getAllReviews,
  getReviewById,
  addReview,
  deleteReview,
  editReview,
} = require("../controllers/reviewController");

router.get("/", getAllReviews);

router.get("/:id", getReviewById);

router.post("/", verifyToken, addReview);

router.delete("/:id", verifyToken, deleteReview);

router.put("/:id", verifyToken, editReview);

export default router;
