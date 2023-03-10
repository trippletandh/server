const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    productId: { type: String, required: true },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

reviewSchema.methods.toJSON = function () {
  return {
    id: this._id,
    title: this.title,
    content: this.content,
    rating: this.rating,
    name: this.name,
    email: this.email,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    // user: this.user.toJSON(),
  };
};

module.exports = mongoose.model("Review", reviewSchema);
