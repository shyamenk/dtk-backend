const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  startDateTime: {
    type: Date,
    required: true,
  },
  endDateTime: {
    type: Date,
    required: true,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
