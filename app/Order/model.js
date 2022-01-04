const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  shippingDetails: {
    type: String,
  },
  time: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Orders", orderSchema);
