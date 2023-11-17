const express = require("express");
const Appointment = require("../models/Appointment");
const { verifyToken } = require("../controllers/authController");

const appointmentRouter = express.Router();

// Route to add a new appointment
appointmentRouter.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, startDateTime, endDateTime } = req.body;
    const newAppointment = new Appointment({
      title,
      description,
      startDateTime,
      endDateTime,
    });
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to delete an appointment
appointmentRouter.delete("/:id", verifyToken, async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const deletedAppointment = await Appointment.findByIdAndDelete(
      appointmentId
    );
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(deletedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to get all upcoming appointments
appointmentRouter.get("/upcoming", verifyToken, async (req, res) => {
  try {
    const currentDate = new Date();
    const upcomingAppointments = await Appointment.find({
      startDateTime: { $gte: currentDate },
    }).sort("startDateTime");
    res.status(200).json(upcomingAppointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = appointmentRouter;
