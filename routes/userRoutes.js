const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const { authenticateUser } = require("../middlewares");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
router.get("/getone", authenticateUser, userController.getUserData);
router.patch(
  "/updateone",
  authenticateUser,
  upload.single("file"),
  userController.UpdateUserData
);

module.exports = router;
