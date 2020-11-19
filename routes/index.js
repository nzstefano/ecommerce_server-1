const router = require("express").Router();

const UserController = require("../controllers/user");
const productRouter = require("./productRouter.js");
const cartRouter = require("./cartRouter.js");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post('/loginCustomer', UserController.loginCustomer)
router.use("/products", productRouter);
router.use('/carts', cartRouter)

module.exports = router;
