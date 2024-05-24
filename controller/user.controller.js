const User = require("../Models/User.model");
const Doctor = require("../Models/Doctor.model");

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
