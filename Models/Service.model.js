const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Service Schema
const serviceSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
},
{
  versionKey: false,
  timestamps: true,
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
