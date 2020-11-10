"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          validPrice(value) {
            if (value <= 0) {
              throw { message: `Invalid price`, status: 400 };
            }
          },
        },
      },
      stock: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          validStock(value) {
            if (value <= 0) {
              throw { message: `Invalid stock`, status: 400 };
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
