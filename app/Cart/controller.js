const ProductModel = require("../Product/model");
const CartModel = require("./model");
const UserModel = require("../User/model");

//  @type GET
//  @desc get all cart item
//  @access PRIVATE
exports.getCart = async (req, res) => {
  try {
    const cartData = await CartModel.find().populate({
      path: "items.productId",
      select: "name price total",
    });
    let cart = cartData[0];

    if (!cart) {
      return res.status(400).json({
        type: "Invalid",
        msg: "Cart not Found",
      });
    }
    res.status(200).json({
      status: true,
      data: cart,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something went wrong",
      err: err,
    });
  }
};

//  @type POST
//  @desc add/remove items to cart
//  @access PRIVATE
exports.addItemToCart = async (req, res) => {
  const { productId, userId } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  try {
    const cartData = await CartModel.find().populate({
      path: "items.productId",
      select: "name price total",
    });
    let cart = cartData[0];

    let userDetails = await UserModel.findById(userId);
    if (!userDetails) {
      return res.status(500).json({
        type: "Not Found",
        msg: "Invalid user id",
      });
    }

    let productDetails = await ProductModel.findById(productId);
    if (!productDetails) {
      return res.status(500).json({
        type: "Not Found",
        msg: "Invalid product id",
      });
    }
    // check for existing cart
    if (cart) {
      const indexFound = cart.items.findIndex(
        (item) => item.productId.id == productId
      );
      //  Remove item from the cart
      if (indexFound !== -1 && quantity <= 0) {
        cart.items.splice(indexFound, 1);
        if (cart.items.length == 0) {
          cart.subTotal = 0;
        } else {
          cart.subTotal = cart.items
            .map((item) => item.total)
            .reduce((acc, next) => acc + next);
        }
      }
      // Update cart for Same product and incrrease product quantity and add total proce
      else if (indexFound !== -1) {
        cart.items[indexFound].quantity =
          cart.items[indexFound].quantity + quantity;
        cart.items[indexFound].total =
          cart.items[indexFound].quantity * productDetails.price;
        cart.items[indexFound].price = productDetails.price;
        cart.subTotal = cart.items
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
      }
      // If quantity is 0 then add new item
      else if (quantity > 0) {
        cart.items.push({
          productId: productId,
          quantity: quantity,
          price: productDetails.price,
          total: parseInt(productDetails.price * quantity),
        });
        cart.subTotal = cart.items
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
      }
      //  Cost iof quantity is 0 then throw error
      else {
        return res.status(400).json({
          type: "Invalid",
          msg: "Invalid request",
        });
      }
      let data = await cart.save();
      res.status(200).json({
        type: "success",
        mgs: "Process successful",
        data: data,
      });
    }
    //  Creates new cart add data to cart model
    else {
      const cartData = {
        userId: userId,
        items: [
          {
            productId: productId,
            quantity: quantity,
            total: parseInt(productDetails.price * quantity),
            price: productDetails.price,
          },
        ],
        subTotal: parseInt(productDetails.price * quantity),
      };

      cart = await CartModel.create(cartData);
      res.json(cart);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something went wrong",
      err: err,
    });
  }
};

//  @type DELETE
//  @desc remove all cart items
//  @access PRIVATE
exports.emptyCart = async (req, res) => {
  try {
    const cartData = await CartModel.find().populate({
      path: "items.productId",
      select: "name price total",
    });
    let cart = cartData[0];
    cart.items = [];
    cart.subTotal = 0;
    let data = await cart.save();
    res.status(200).json({
      type: "success",
      mgs: "Cart has been emptied",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something went wrong",
      err: err,
    });
  }
};
