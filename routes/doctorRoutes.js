const express = require("express");
const router = express.Router();
const doctors = require("../controller/doctor.controller");

router.post("/create", doctors.create);
router.get("/get", doctors.findAll);
router.get("/get/more", doctors.findMore);
router.get("/getsingle/:id", doctors.findOne);


module.exports = router;
