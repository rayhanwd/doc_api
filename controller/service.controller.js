const Service = require('../Models/Service.model');

// Create and Save a new Service
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.title || !req.body.description) {
      return res.status(400).send({ message: "Title and description cannot be empty!" });
    }

    // Create a Service
    const service = new Service({
      title: req.body.title,
      description: req.body.description,
    });

    // Save Service in the database
    const savedService = await service.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occurred while creating the Service."
    });
  }
};


exports.findAll = async (req, res) => {
    try {
      const services = await Service.find();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({
        message: error.message || "Some error occurred while retrieving services."
      });
    }
  };