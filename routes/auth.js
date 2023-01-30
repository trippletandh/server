const express = require("express");
const router = express.Router();
const passport = require("passport");
const crypto = require("crypto");
const {
  signin,
  signup,
  verifyEmail,
} = require("../controllers/authController");
const Token = require("../models/Token");
const User = require("../models/User");

// Create new user - POST
router.post("/signup", signup);

// Verify email address - GET
router.get("/:id/verify/:token/", verifyEmail);

// User login - POST
router.post("/signin", signin);

// Google login
// Redirects the user to Google, where they will authenticate.
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Completes the authentication sequence when Google redirects the user back to the application.
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: false,
  }),
  async (req, res) => {
    console.log(req.user);

    const token = req.user.generateAuthToken();
    const { password, ...others } = req.user;
    res.cookie("access_token", { token: token, user: others });
    res.redirect("http://localhost:5173");
  }
);

// Facebook login
// Redirects the user to Facebook, where they will authenticate.
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);

// Completes the authentication sequence when Facebook redirects the user back to the application.
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/",
    session: false,
  }),
  async (req, res) => {
    console.log(req.user);

    const token = req.user.generateAuthToken();
    const { password, ...others } = req.user;
    res.cookie("access_token", { token: token, user: others });
    res.redirect("http://localhost:5173");
  }
);

module.exports = router;
