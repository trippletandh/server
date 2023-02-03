const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    photos: { type: [String] },
    size: { type: [Number] },
    colors: { type: [String] },
    styles: { type: [String] },
    rating: { type: Number, min: 0, max: 5, default: 0, ref: "Review" },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    sold: { type: Number, default: 0 },
    inStock: { type: Number, default: 100 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
