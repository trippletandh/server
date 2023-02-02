const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    transaction_id: { type: String, unique: true },
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        name: { type: String },
        quantity: { type: Number },
        price: { type: Number },
      },
    ],
    amount: { type: Number, default: 0 },
    address: { type: String },
    paymentMethod: { type: String },
    status: {
      type: String,
      default: "Not processed",
      enum: [
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
