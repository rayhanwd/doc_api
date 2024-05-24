const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const { authenticateUser } = require("../middlewares");

router.get("/getone", authenticateUser, userController.getUserData);

module.exports = router;
