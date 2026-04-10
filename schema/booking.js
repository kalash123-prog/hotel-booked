const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "data",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  checkIn: Date,
  checkOut: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  guests: {
  type: Number,
  required: true,
},
});

module.exports = mongoose.model("Booking", bookingSchema);