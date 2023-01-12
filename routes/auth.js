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
    let token = await Token.findOne({ userId: req.user.id });
    if (!token) {
      token = await new Token({
        userId: req.user.id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const user = await User.findOne({ googleId: req.user.id });
    // const { password, ...others } = user._doc;
    res.status(200).send({
      user_token: token,
      user: user,
      message: "logged in successfully",
    });

    // const token = req.user.generateAuthToken();
    // res.cookie("x-auth-cookie", token);
    // res.redirect("http://localhost:5173");
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
    let token = await Token.findOne({ userId: req.user.id });

    if (!token) {
      token = await new Token({
        userId: req.user.id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const user = await User.findOne({ facebookId: req.user.id });
    // const { password, ...others } = user._doc;
    res.status(200).send({
      user_token: token,
      user: user,
      message: "logged in successfully",
    });

    // const token = req.user.generateAuthToken();
    // res.cookie("x-auth-cookie", token);
    // res.redirect("http://localhost:5173");
  }
);

module.exports = router;
