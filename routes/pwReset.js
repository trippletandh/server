const express = require("express");
const router = express.Router();
const {
  sendLink,
  verifyLink,
  setPassword,
} = require("../controllers/pwResetController");

// Send password link - GET
router.post("/", sendLink);

// Verify password reset link - GET
router.get("/:id/:token", verifyLink);

// Set new password - POST
router.post("/:id/:token", setPassword);

module.exports = router;
