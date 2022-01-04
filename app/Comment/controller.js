const ProductModel = require("../Product/model");
const UserModel = require("../User/model");
const CommentModel = require("./model");

const hex = /[0-9A-Fa-f]{6}/g;

exports.postCommentOnProduct = async (req, res) => {
  try {
    const { userId, productId, text, image, rating } = req.body;
    //  VERIFY USER ID
    let userDetails = await UserModel.findById(userId);
    if (!userDetails) {
      return res.status(500).json({
        type: "Not Found",
        msg: "Invalid user id",
      });
    }
    //  VERIFY PRODUCT ID
    let productDetails = await ProductModel.findById(productId);
    if (!productDetails) {
      return res.status(500).json({
        type: "Not Found",
        msg: "Invalid product id",
      });
    }

    const commentData = {
      userId,
      productId,
      text,
      image,
      rating: Number.parseInt(rating),
    };

    const data = new CommentModel(commentData);
    const comment = await data.save();
    res.status(200).json({
      msg: "Comment added successfully",
      data: comment,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      msg: "Server error",
      err: err,
    });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    //  VERIFY USER ID
    let userDetails = await UserModel.findById(userId);
    if (!userDetails) {
      return res.status(500).json({
        type: "Not Found",
        msg: "Invalid user id",
      });
    }
    //  VERIFY PRODUCT ID
    let productDetails = await ProductModel.findById(productId);
    if (!productDetails) {
      return res.status(500).json({
        type: "Not Found",
        msg: "Invalid product id",
      });
    }

    let commentDetails = await CommentModel.find({ productId });

    if (!commentDetails) {
      return res.status(400).json({
        msg: "No Comments on the product",
      });
    }
    return res.status(200).json({
      status: true,
      data: commentDetails,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      msg: "Server error",
      err: err,
    });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (comment) {
      return res.status(200).json({
        status: true,
        data: comment,
      });
    }
    return res.status(500).json({
      msg: "Invalid comment id",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      msg: "Server error",
      err: err,
    });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, userId, text, image } = req.body;

    //  VERIFY PARAM ID
    let commentDetails = await CommentModel.findById(id);
    if (!commentDetails) {
      return res.status(500).json({
        type: "Not Found",
        msg: "Please provde valid comment id to update",
      });
    }

    //  VERIFY USER ID
    let userDetails = await UserModel.findById(userId);
    if (!userDetails) {
      return res.status(500).json({
        type: "Not Found",
        msg: "Invalid user id",
      });
    }
    //  VERIFY PRODUCT ID
    let productDetails = await ProductModel.findById(productId);
    if (!productDetails) {
      return res.status(500).json({
        type: "Not Found",
        msg: "Invalid product id",
      });
    }

    if (text || image) {
      if (text) {
        await CommentModel.findOneAndUpdate({ id }, { text: text });
        return res.status(200).json({
          msg: "Comment updated",
        });
      }
      if (image) {
        await CommentModel.findOneAndUpdate({ id }, { image: image });
        return res.status(200).json({
          msg: "Comment updated",
        });
      }
    } else {
      return res.status(500).json({
        msg: "Please include text or image",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      msg: "Server error",
      err: err,
    });
  }
};
