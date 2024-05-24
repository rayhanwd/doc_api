const express = require("express");
const router = express.Router();
const appointments = require("../controller/appointment.controller");
const { authenticateUser } = require("../middlewares");

// Create a new Appointment
router.post("/create", authenticateUser, appointments.create);
router.get("/user/get", authenticateUser, appointments.findUserAppointments);
router.get("/user/getsingle/:id", authenticateUser, appointments.findUserSingleAppointment);


module.exports = router;
