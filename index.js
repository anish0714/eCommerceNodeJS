const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

// Connect Database
require("./config/db")(app);

// Init Middleware
app.use(express.json({ extended: false }));

// Initial route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to shopping cart API" });
});

// Define Routes
require("./app/routerHandler")(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
