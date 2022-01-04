const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const check = require("express-validator").check;
const auth = require("../../middleware/auth");
const userController = require("./controller");
//-----------------------------------------------------------------------REGISTER---
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more character"
    ).isLength({
      min: 6,
    }),
    check("shoppingAddress", "shopping Address is required").not().isEmpty(),
  ],
  userController.registerUser
); //----------------------------------------------------------------------------------> Register User ---> return (x-auth-token)
//-----------------------------------------------------------------------LOGIN---
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  userController.userLogin
); //-----------------------------------------------------------> User Login ---> return (x-auth-token)

router.post("/loggedin", auth, userController.loggedInUser); //-----> Check logged in user by passing (x-auth-token)

module.exports = router;
