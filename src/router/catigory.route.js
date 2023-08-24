const { Router } = require("express")
const { add, getall} = require("../controller/catigory.control");
const {isAuth} = require("../middleware/login");

const router = Router();

router.post("/category", isAuth, add);
router.get("/category", isAuth, getall);

module.exports = router;