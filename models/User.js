const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    phoneNumber: { type: Number },
    facebookId: { type: String },
    googleId: { type: String },
    provider: { type: String },
    isAdmin: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    image: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk6qKlLk50SrpDFulviyCpf0E2AcU9ncWXpA&usqp=CAU",
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = () => {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.toJSON = () => {
  return {
    id: this._id,
    provider: this.provider,
    email: this.email,
    username: this.username,
    image: this.image,
    name: this.name,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

module.exports = mongoose.model("User", userSchema);
