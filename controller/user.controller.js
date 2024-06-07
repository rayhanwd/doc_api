const User = require("../Models/User.model");
const Doctor = require("../Models/Doctor.model");
const cloudinary = require("cloudinary");
const fs = require("fs");
const { error } = require("console");

cloudinary.v2.config({
  cloud_name: process.env.CN_Cloud_name,
  api_key: process.env.CN_Api_key,
  api_secret: process.env.CN_Api_secret,
  folder: process.env.CN_Folder,
});
// Controller to get user data
exports.getUserData = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let userData = user.toObject();
    let type = "patient";
    if (user.type === "doctor") {
      type = "doctor";
      const doctorData = await Doctor.findOne({ userId: user._id });
      userData = { ...userData, type, doctorData };
    }

    return res.json(userData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.UpdateUserData = async (req, res) => {
  try {

    const { _id } = req.user;

    const user = await User.findById(_id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: process.env.CN_Folder,
    });
    // Remove file from server after uploading to Cloudinary
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
    });
    req.body.profile = result.secure_url;

    const updated = await await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    return res.json(updated);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
