const { Cart, Product } = require("../models");

class CartController {
  static async showCart(req, res, next) {
    try {
      console.log(`==== Fetching Cart ====`);
      const carts = await Cart.findAll({
        where: {
          UserId: req.User.id
        },
        include: Product
      });
      return res.status(200).json({
        carts,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addToCart(req, res, next) {
    try {
      const { ProductId, qty } = req.body;
      let payload = {
        ProductId,
        UserId: req.User.id,
      };

      if (qty <= 0) {
        throw { message: 'Please input correct quantity', status: 400}
      }

      console.log('==== Check Product ====')
      const product = await Product.findByPk(ProductId)

      if (!product) {
        throw { message: 'Product not found', status: 404}
      }

      console.log('==== Check Cart ====')
      const cartCheck = await Cart.findOne({
        where: payload
      })
      if (cartCheck) {
        if ((cartCheck.qty + qty) > product.stock) {
          throw { message: 'Out of stock', status: 400}
        } else {
          console.log('==== Update Cart ====')
          let tempQty = cartCheck.qty
          tempQty += qty
          await Cart.update({
            qty: tempQty
          }, {
            where: {
              id: cartCheck.id
            }
          })
          return res.status(200).json({
            product
          })
        }
      } else {
        if (qty > product.stock) {
          throw { message: 'Out of stock', status: 400}
        } else {
          payload.qty = qty
          console.log('==== Add Cart ====')
          await Cart.create(payload);
          return res.status(201).json({
            product,
          });
        } 
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateCart(req, res, next) {
    try {
      const { ProductId, qty } = req.body;
      const payload = { qty };

      if (qty <= 0) {
        throw { message: 'Please input correct quantity', status: 400}
      }
      
      const data = await Product.findByPk(ProductId)

      if (payload.qty > data.stock) {
        throw {message: 'Out of stock', status: 400}
      } else {
        const cart = await Cart.update(payload, {
          where: {
            id: req.params.id,
          },
        });
        if (!cart) {
          throw { message: "Cart not found", status: 404 };
        } else {
          return res.status(200).json({
            message: 'Updated'
          });
        }
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteCart(req, res, next) {
    try {
      const { id } = req.params;

      const cartTemp = await Cart.findByPk(id, {
        include: Product
      });

      await Cart.destroy({
        where: {
          id: id,
        },
      });

      return res.status(200).json({
        message: `Product ${cartTemp.Product.name} succesfully removed from cart`,
      });
    } catch (err) {
      next(err);
    }
  }

  
}

module.exports = CartController;
