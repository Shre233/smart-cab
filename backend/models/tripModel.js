const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  trip_id: { type: String, required: true, unique: true },
  start_location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  end_location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  assigned_cab: { type: String, required: true },
  status: { type: String, default: "in-progress" }
});

module.exports = mongoose.model("Trip", tripSchema);
