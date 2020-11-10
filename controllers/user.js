const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      // console.log(`==== Registering ====`);
      const email = req.body.email;
      const password = req.body.password;
      let payload = {
        email,
        password,
      };

      if (req.body.role) {
        payload = {
          email,
          password,
          role: req.body.role,
        };
      }

      const user = await User.create(payload);
      return res.status(201).json({
        id: user.id,
        email: user.email,
        role: user.role,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      // console.log(`==== Loging in ====`);
      const email = req.body.email;
      const password = req.body.password;

      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw { message: "Invalid email/password", status: 400 };
      } else if (!comparePassword(password, user.password)) {
        throw { message: "Invalid email/password", status: 400 };
      } else {
        const access_token = signToken({
          id: user.id,
          email: user.email,
        });
        res.status(200).json({
          access_token: access_token,
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
