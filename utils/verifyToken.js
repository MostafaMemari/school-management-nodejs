const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return jwt.verify(token, "anyKey", (error, decoded) => {
    if (error) return false;
    return decoded;
  });
};

module.exports = {
  verifyToken,
};
