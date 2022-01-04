const productRoutes = require("./Product/routes");
const userRoutes = require("./User/routes");
const cartRoutes = require("./Cart/routes");
const commentRoutes = require("./Comment/routes");
const orderRoutes = require("./Order/routes");

module.exports = (app) => {
  //-------------------------------------USER---
  app.use("/user", userRoutes);
  //-------------------------------------PRODUCT---
  app.use("/product", productRoutes);
  //-------------------------------------CART---
  app.use("/cart", cartRoutes);
  //-------------------------------------COMMENT---
  app.use("/comment", commentRoutes);
  //-------------------------------------ORDER---
  app.use("/order", orderRoutes);
};
