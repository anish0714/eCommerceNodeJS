const router = require("express").Router();
const productController = require("./controller");
router.get("/", productController.getProducts); //----> GET ALL PRODUCTS
router.post("/", productController.createProduct); //---> CREEATE A PRODUCT
router.get("/:id", productController.getProductById); //----> CREATE PRODUCT BY ID
router.delete("/:id", productController.removeProduct); //----> DELETE PRODUCT BY ID
module.exports = router;
