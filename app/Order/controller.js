const OrderModel = require("./model");
const UserModel = require("../User/model");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json({
      status: true,
      data: orders,
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
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await OrderModel.findById(id);
    res.status(200).json({
      status: true,
      data: orders,
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
exports.saveOrder = async (req, res) => {
  try {
    const { userId, shippingDetails } = req.body;
    //  VERIFY USER ID
    let userDetails = await UserModel.findById(userId);
    if (!userDetails) {
      return res.status(500).json({
        type: "Not Found",
        msg: "Invalid user id",
      });
    }

    const orderData = { userId, shippingDetails, time: new Date() };
    const data = new OrderModel(orderData);
    const order = await data.save();
    res.status(200).json({
      msg: "Order created successfully",
      data: order,
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
