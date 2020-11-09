"use strict";
const { Model } = require("sequelize");

const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        isEmail: true,
        allowNull: false,
        isEmail: true,
        validate: {
          isEmail: {
            msg: "Please input the correct email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          passwordLength(value) {
            if (value.length < 8 || value.length > 12) {
              throw {
                message:
                  "Password must contain at least 8 characters and less then 13 characters",
                status: 400,
              };
            }
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate(user) {
          user.password = hashPassword(user.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
