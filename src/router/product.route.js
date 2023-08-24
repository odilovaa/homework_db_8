const { Router } = require("express")
const { getall, sell_product, buy_product, getall_history} = require("../controller/product.control");
const {isAuth} = require("../middleware/login");

const router = Router();

router.post("/product", isAuth, buy_product);
router.delete("/product", isAuth, sell_product)
router.get("/product", isAuth, getall);
router.get("/history", isAuth, getall_history)

module.exports = router;