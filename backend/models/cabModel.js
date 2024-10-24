const mongoose = require("mongoose");

const cabSchema = new mongoose.Schema({
  cab_id: { type: String, required: true, unique: true },
  driver_name: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  status: { type: String, default: "available" },
  current_trip: { type: String, default: null }
});

module.exports = mongoose.model("Cab", cabSchema);
