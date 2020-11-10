const router = require("express").Router();

const ProductController = require("../controllers/product.js");
const authentication = require("../middlewares/authentication");
const { authorizationAdmin } = require("../middlewares/authorization");

router.get("/", ProductController.showProduct);

router.use(authentication);
router.use(authorizationAdmin);
router.post("/", ProductController.addProduct);
router.delete("/:id", ProductController.deleteProduct);
router.put("/:id", ProductController.editProduct);

module.exports = router;
