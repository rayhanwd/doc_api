const Appointment = require("../Models/Appointment.model");
const User = require("../Models/User.model");

// Create and Save a new Appointment
exports.create = async (req, res) => {
  try {
    const { doctor, date, reason } = req.body;

    // Validate request
    if (!doctor || !date || !reason) {
      return res.status(400).send({ message: "All fields are required!" });
    }
    const { _id } = req.user;

    // Fetch user data
    const userdata = await User.findById(_id).select("-password");

    if (!userdata) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create an Appointment
    const appointment = new Appointment({
      user: userdata._id,
      doctor,
      date,
      reason,
    });

    // Save Appointment in the database
    const savedAppointment = await appointment.save();

    res.status(201).send(savedAppointment);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the appointment.",
    });
  }
};

// Retrieve all appointments for a specific user

exports.findUserAppointments = async (req, res) => {
  try {
    const { _id } = req.user;

    // Fetch user data
    const userdata = await User.findById(_id).select("-password");

    if (!userdata) {
      return res.status(404).json({ error: "User not found" });
    }

    let appointments;

    if (userdata.accountType === "doctor") {
      appointments = await Appointment.find({ doctor: _id });
    } else {
      appointments = await Appointment.find({ user: _id });
    }

    if (!appointments) {
      return res.status(404).json({ message: "No appointments found" });
    }

    return res.status(200).json({ appointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while retrieving user appointments.",
    });
  }
};

// find Users Single Appointment

exports.findUserSingleAppointment = async (req, res) => {
  try {
    const { _id } = req.user;
    const id = req.params.id;
    // Fetch user data
    const userdata = await User.findById(_id).select("-password");

    if (!userdata) {
      return res.status(404).json({ error: "User not found" });
    }

    if (userdata.accountType === "doctor") {
      const doctorappointment = await Appointment.find({
        doctor: userdata._id,
      });

      if (!doctorappointment) {
        return res.status(404).json({ message: "No appointments found" });
      }

      const singleappointmentdoctor = await Appointment.findOne({
        _id: id,
        doctor: doctorappointment._id,
      });

      const doctor = await User.findById({
        _id: singleappointmentdoctor.doctor,
      }).select("-password");

      return res.status(200).json({
        data: {
          appointment: singleappointmentdoctor,
          doctor,
          user: userdata,
        },
      });
    }

    const userappointment = await Appointment.find({ user: userdata._id });

    if (!userappointment) {
      return res.status(404).json({ message: "No appointments found" });
    }

    const singleappointmentuser = await Appointment.findOne({
      _id: id,
      user: userdata._id,
    });

    const doctor = await User.findById({
      _id: singleappointmentuser.doctor,
    }).select("-password");

    return res.status(200).json({
      data: {
        appointment: singleappointmentuser,
        doctor,
        user: userdata,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while retrieving user appointments.",
    });
  }
};
