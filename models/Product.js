const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    photos: { type: [String] },
    colors: { type: [String] },
    rating: { type: Number, min: 0, max: 5, default: 5 },
    price: { type: Number, required: true },
    inStock: { type: Number, default: 100 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
