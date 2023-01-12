const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");
const cartsRoutes = require("./routes/carts");
const ordersRoutes = require("./routes/orders");
const pwResetRoutes = require("./routes/pwReset");

const app = express();
dotenv.config();

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

mongoose.set("strictQuery", false);
mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/public"));
app.use(cookieParser());
app.use(passport.initialize());
require("./services/facebookStrategy");
require("./services/googleStrategy");

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/carts", cartsRoutes);
app.use("/orders", ordersRoutes);
app.use("/password-reset", pwResetRoutes);

app.get("/", (req, res, next) => {
  res.send("<h1>Welcome to BirthBlessing shop API ^^</h1>");
});

app.listen(5000, () => {
  connection();
  console.log("Connected to backend");
});
