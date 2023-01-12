const crypto = require("crypto");
const sendEmail = require("../services/sendEmail");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Token = require("../models/Token");
const Joi = require("joi");

// send password link
exports.sendLink = async (req, res) => {
  try {
    const emailSchema = Joi.object({
      email: Joi.string().email().required().label("Email"),
    });
    const { error } = emailSchema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(409)
        .send({ message: "User with given email does not exist!" });

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
      console.log(token);
    }

    const url = `${process.env.CLIENT_URL_DEV}/password-reset/${user._id}/${token.token}/`;
    await sendEmail(
      user.email,
      "Password Reset",
      `       You are receiving this because you (or someone else) have requested the reset of the password for your account.\n
      Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n
      ${url}\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`
    );

    res
      .status(200)
      .send({ message: "Password reset link sent to your email account" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// verify password reset link
exports.verifyLink = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    res.status(200).send({ message: "Valid Url" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//  set new password
exports.setPassword = async (req, res) => {
  try {
    const passwordSchema = Joi.object({
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required()
        .label("Password"),
    });
    const { error } = passwordSchema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    if (!user.verified) user.verified = true;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashPassword;
    await user.save();
    await token.remove();

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
