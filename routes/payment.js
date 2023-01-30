const express = require("express");
const router = express.Router();
// const { userById } = require("../controller/user");
const {
  processPayment,
  generateToken,
} = require("../controllers/paymentController");
const { verifyToken } = require("../utility/verifyToken");

router.get("/getToken/:userId", generateToken);
router.post("/payment/:userId", processPayment);

// router.param("userId", userById);

module.exports = router;
