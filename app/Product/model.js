const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add the product name"],
  },
  image: {
    type: String,
    required: [true, "Please add the product image"],
  },
  price: {
    type: String,
    required: [true, "Please add the product price"],
  },
  shippingCost: {
    type: String,
    required: [true, "Please add the product shipping cost"],
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
