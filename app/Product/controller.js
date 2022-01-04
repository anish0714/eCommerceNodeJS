const ProductModel = require("./model");

//  @type GET
//  desc get all products
//  @access PUBLIC
exports.getProducts = async (req, res) => {
  try {
    let products = await ProductModel.find();
    res.status(200).json({
      status: true,
      data: products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      status: false,
    });
  }
};

//  @type GET:id
//  @desc get a product by id
//  @access PUBLIC
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    let productDetails = await ProductModel.findById(id);
    res.status(200).json({
      status: true,
      data: productDetails,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};

//  @type POST
//  @desc create a product
//  @access PUBLIC
exports.createProduct = async (req, res) => {
  try {
    const { name, price, image, shippingCost } = req.body;
    let payload = { name, price, image, shippingCost };
    let product = await ProductModel.create(payload);
    res.status(200).json({
      status: true,
      data: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      status: false,
    });
  }
};

//  @type DELETE
//  @desc delete a product by id
//  @access PUBLIC
exports.removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let productDetails = await ProductModel.findByIdAndRemove(id);
    if (!productDetails) {
      return res.status(400).json({
        msg: "Please include a valid id",
        data: productDetails,
      });
    }
   return res.status(200).json({
      status: true,
      data: productDetails,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};