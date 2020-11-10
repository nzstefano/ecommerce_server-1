const router = require("express").Router();

const UserController = require("../controllers/user");
const productRouter = require("./productRouter.js");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.use("/products", productRouter);

module.exports = router;
