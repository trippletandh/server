const Review = require("../models/Review");
const Product = require("../models/Product");

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: "desc" })
      .populate("user");

    res.json({
      reviews: reviews.map((m) => {
        return m.toJSON();
      }),
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

// Get all reviews at one product
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.find({ productId: req.params.productId });
    if (!review) return res.status(404).json({ message: "No review found." });
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

// Add review to a product
exports.addReview = async (req, res) => {
  try {
    let review = await Review.create(req.body);
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await review.findByIdAndRemove(req.params.reviewId);
    if (!review) return res.status(404).json({ message: "No review found." });
    res.status(200).json({ review });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

exports.editReview = async (req, res) => {
  const { error } = validateMessage(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let review = await Review.findByIdAndUpdate(
      req.params.reviewId,
      { text: req.body.text, user: tempReview.user.id },
      { new: true }
    );
    if (!review) return res.status(404).json({ message: "No message found." });
    review = await review.populate("user").execPopulate();

    res.status(200).json({ review });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

exports.addReviewProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    if (product.reviews.find((x) => x.name === req.user.name)) {
      return res
        .status(400)
        .send({ message: "You already submitted a review" });
    }
    const review = {
      name: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).send({
      message: "Review Created",
      review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
    });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
};
