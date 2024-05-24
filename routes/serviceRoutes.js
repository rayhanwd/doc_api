const express = require('express');
const router = express.Router();
const services = require('../controller/service.controller');

// Create a new Service
router.post('/create', services.create);

// Retrieve all Services
router.get('/get', services.findAll);

module.exports = router;
