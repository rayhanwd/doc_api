const jwt = require("jsonwebtoken");
const User = require("../Models/User.model");

exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });
    if (!user) {
      throw new Error();
    }
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate." });
  }
};
