const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
 userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
 productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
 text : {
  type: String
 },
 image : {
  type: String
 },
 rating : {
  type: Number
 }
})

const Comment = mongoose.model('Comment',commentSchema );
module.exports = Comment;
