const jwt = require("jsonwebtoken");
const signToken = (payload) => {
  return jwt.sign(payload, "nzstefano");
};

const verifyToken = (access_token) => {
  return jwt.verify(access_token, "nzstefano");
};

module.exports = {
  signToken,
  verifyToken,
};
