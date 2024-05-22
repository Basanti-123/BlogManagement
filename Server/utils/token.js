const crypto = require("crypto");
const JWT = require("jsonwebtoken");

const signJWT = (payload) => {
  return JWT.sign(
    {
      data: payload,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_DURATION }
  );
};

const verifyJWT = (token) => {
  return JWT.verify(token, process.env.JWT_SECRET);
};

const generateSixDigitToken = () => {
  return crypto.randomInt(100000,999999);
};

module.exports = { signJWT, verifyJWT, generateSixDigitToken };
