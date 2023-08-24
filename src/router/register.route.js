const { Router } = require("express")
const { add, getall} = require("../controller/register.control");
const {isAuth, isAdmin} = require("../middleware/login");

const router = Router();

router.post("/register", isAdmin, add);
router.get("/register",isAuth, getall);

module.exports = router;