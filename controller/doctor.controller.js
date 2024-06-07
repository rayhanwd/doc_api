const Doctor = require("../Models/Doctor.model");

// Create and Save a new Doctor
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.title || !req.body.description) {
      return res
        .status(400)
        .send({ message: "Title and description cannot be empty!" });
    }

    // Create a Doctor
    const doctor = new Doctor({
      title: req.body.title,
      description: req.body.description,
    });

    // Save Doctor in the database
    const savedDoctor = await doctor.save();

    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Some error occurred while creating the Service.",
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate({
        path: "doctor_id",
        select: "name profile",
      });

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occurred while retrieving doctors.",
    });
  }
};

exports.findMore = async (req, res) => {
  try {
    const doctor = await Doctor.find().populate({
      path: "doctor_id",
      select: "name profile",
    });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Some error occurred while retrieving services.",
    });
  }
};


exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const doctor = await Doctor.findById(id).populate({
      path: "doctor_id",
      select: "-password  -acceptTerms",
    });
    if (!doctor) {
      return res.status(404).json({ message: "doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Some error occurred while retrieving services.",
    });
  }
};
