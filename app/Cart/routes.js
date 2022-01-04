const router = require("express").Router();
const cartController = require("./controller");
const auth = require("../../middleware/auth"); // ---> Private route via valid x-auth-token

router.post("/modifyCart", auth, cartController.addItemToCart);
router.get("/getCart", auth, cartController.getCart);
router.delete("/emptyCart", auth, cartController.emptyCart);
module.exports = router;
