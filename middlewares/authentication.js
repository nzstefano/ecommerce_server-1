const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { message: "Authentication failed", status: 401 };
    }

    let currentUser = verifyToken(access_token);

    const user = await User.findOne({
      where: {
        email: currentUser.email,
      },
    });

    if (!user) {
      throw { message: "Authentication failed", status: 401 };
    } else {
      req.User = user;
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
