const mongoose = require("mongoose");

const tripPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  destination: { 
    type: String, 
    required: true 
  },
  checkIn: { 
    type: Date, 
    required: true 
  },
  checkOut: { 
    type: Date, 
    required: true 
  },
  guests: { 
    type: Number, 
    required: true 
  },
  budget: { 
    type: Number, 
    required: true 
  },
  aiPlan: { 
    type: String 
  },
  recommendedHotels: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "listing" 
    }
  ],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model("TripPlan", tripPlanSchema);