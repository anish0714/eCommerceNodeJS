const router = require("express").Router();
const orderController = require("./controller");
const auth = require("../../middleware/auth");

router.get("/",auth, orderController.getAllOrders);
router.get("/:id",auth, orderController.getOrderById);
router.post("/",auth, orderController.saveOrder);

module.exports = router;
