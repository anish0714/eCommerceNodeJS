const mongoose = require("mongoose");

let itemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity can not be less then 1."],
  },
  price: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [itemSchema],
  subTotal: {
    default: 0,
    type: Number,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
