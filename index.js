const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const doctorRoutes = require("./routes/doctorRoutes");

const cors = require("cors");
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false}))

app.use(cors());
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port  ${PORT}`));
