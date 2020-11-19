const { User } = require("../models");

async function authorizationAdmin(req, res, next) {
  try {
    const { email } = req.User;

    const admin = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!admin) {
      throw { message: `User not found`, status: 404 };
    } else if (admin.role !== "Admin") {
      throw { message: `Authorization failed`, status: 401 };
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function authorizationCustomer(req, res, next) {
  try {
    const { email } = req.User;

    const customer = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!customer) {
      throw { message: `User not found`, status: 404 };
    } else if (customer.role !== "Customer") {
      throw { message: `Authorization failed`, status: 401 };
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { 
  authorizationAdmin,
  authorizationCustomer
};
