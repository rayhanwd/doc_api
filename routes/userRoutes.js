const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const { authenticateUser } = require("../middlewares");

router.get("/getone", authenticateUser, userController.getUserData);
router.put("/updateone", authenticateUser, userController.UpdateUserData);


module.exports = router;
