const { Product } = require("../models");

class ProductController {
  static async showProduct(req, res, next) {
    try {
      // console.log(`==== Registering ====`);
      const product = await Product.findAll();
      return res.status(200).json({
        product,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addProduct(req, res, next) {
    try {
      const { name, image_url, price, stock } = req.body;
      const payload = {
        name,
        image_url,
        price,
        stock,
      };

      const product = await Product.create(payload);
      return res.status(201).json({
        product,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;

      const productTemp = await Product.findByPk(id);

      const product = await Product.destroy({
        where: {
          id: id,
        },
      });

      return res.status(200).json({
        message: `Product ${productTemp.name} succesfully deleted`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async editProduct(req, res, next) {
    try {
      const { id } = req.params;

      const { name, image_url, price, stock } = req.body;

      const payload = { name, image_url, price, stock };

      const newProduct = await Product.update(payload, {
        where: {
          id: id,
        },
      });

      if (!newProduct) {
        throw { message: "Product not found", status: 404 };
      }

      const product = await Product.findByPk(id);
      return res.status(200).json({
        product,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;
