const jwt = require("jsonwebtoken");
const { createError } = require("./error");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWTPRIVATEKEY, (err, user) => {
    if (err) return next(createError(403, "Token is invalid!"));
    req.user = user;
    next();
  });
};
