const router = require("express").Router();

const CartController = require("../controllers/cart.js");
const authentication = require("../middlewares/authentication");
const { authorizationCustomer } = require("../middlewares/authorization");

router.use(authentication);
router.use(authorizationCustomer);
router.get("/", CartController.showCart);
router.post("/", CartController.addToCart);
router.put("/:id", CartController.updateCart);
router.delete("/:id", CartController.deleteCart);

module.exports = router;
