const express = require("express");
const Cab = require("../models/cabModel");
const Trip = require("../models/tripModel");

const router = express.Router();

// Add new cab
router.post("/register-cab", async (req, res) => {
  const { cab_id, driver_name, location } = req.body;
  
  try {
    const newCab = new Cab({
      cab_id,
      driver_name,
      location
    });
    await newCab.save();
    res.status(201).json({ message: "Cab registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all cabs
router.get("/cabs", async (req, res) => {
  try {
    const cabs = await Cab.find();
    res.status(200).json(cabs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
 
// cab allocation for a trip
router.post("/allocate-cab", async (req, res) => {
  const { trip_id, start_location, end_location } = req.body;
  
  try {
    const availableCabs = await Cab.find({ status: "available" });

    
    const nearestCab = availableCabs.reduce((prev, curr) => {
      const distancePrev = getDistance(start_location, prev.location);
      const distanceCurr = getDistance(start_location, curr.location);
      return distancePrev < distanceCurr ? prev : curr;
    });

    
    nearestCab.status = "engaged";
    nearestCab.current_trip = trip_id;
    await nearestCab.save();

    const newTrip = new Trip({
      trip_id,
      start_location,
      end_location,
      assigned_cab: nearestCab.cab_id
    });
    
    await newTrip.save();
    res.status(201).json({ message: "Cab allocated successfully", cab: nearestCab });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Utility function for distance calculation
function getDistance(loc1, loc2) {
  const R = 6371; // Radius of Earth in km
  const dLat = (loc2.lat - loc1.lat) * (Math.PI / 180);
  const dLng = (loc2.lng - loc1.lng) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(loc1.lat * (Math.PI / 180)) * Math.cos(loc2.lat * (Math.PI / 180)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

module.exports = router;
