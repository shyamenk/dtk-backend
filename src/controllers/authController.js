const { compare } = require("bcrypt");
const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ message: "Access denied. Token missing." });
  }
  verify(
    token,
    process.env.SECRET_KEY,
    { algorithms: ["HS256"] },
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token." });
      }
      req.user = decoded;
      next();
    }
  );
}

module.exports = {
  compare,
  bcrypt,
  sign,
  verify,
  verifyToken,
};
