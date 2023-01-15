const userController = require("../controllers/userController");
const router = require("express").Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/verify", userController.verify);

module.exports = router;
