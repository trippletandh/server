const Review = require("../models/Review");

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

exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate("user");
    if (!review) return res.status(404).json({ message: "No message found." });
    res.json({ message: message.toJSON() });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

exports.addReview = async (req, res) => {
  const { error } = validateMessage(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let review = await Review.create({
      text: req.body.text,
      user: req.user.id,
    });
    review = await review.populate("user").execPopulate();

    res.status(200).json({ message: message.toJSON() });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const tempReview = await Review.findById(req.params.id).populate("user");
    if (!(tempReview.user.id === req.user.id || req.user.role === "ADMIN"))
      return res
        .status(400)
        .json({ message: "Not the message owner or admin." });

    const review = await review
      .findByIdAndRemove(req.params.id)
      .populate("user");
    if (!review) return res.status(404).json({ message: "No message found." });
    res.status(200).json({ review });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

exports.editReview = async (req, res) => {
  const { error } = validateMessage(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const tempReview = await Review.findById(req.params.id).populate("user");
    if (!(tempReview.user.id === req.user.id || req.user.role === "ADMIN"))
      return res
        .status(400)
        .json({ message: "Not the message owner or admin." });

    let review = await Review.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text, user: tempreview.user.id },
      { new: true }
    );
    if (!review) return res.status(404).json({ message: "No message found." });
    review = await review.populate("user").execPopulate();

    res.status(200).json({ review });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
