const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  image: {
    type: String,
    required: false,
  },
  specialty: {
    type: String,
    required: true, // Made required
  },
  bio: {
    type: String,
    required: false,
  },
  thamnail: {
    type: String,
    required: false,
    default: "",
  },
  address: {
    type: String,
    required: false,
  },
  exp: {
    type: Number, // Changed to Number for experience in years
    required: false,
  },
  education: {
    type: String,
    required: false,
  },
  languages: {
    type: [String], // Changed to an array of strings to store multiple languages
    required: false,
  },
  specialty: {
    type: String,
  },
  licenseNumber: {
    type: String,
  },
  doctor_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},
{
  versionKey: false,
  timestamps: true,
});

doctorSchema.index({ name: 1 });
doctorSchema.index({ specialty: 1 });

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
