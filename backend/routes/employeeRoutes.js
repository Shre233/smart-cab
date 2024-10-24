const express = require("express");
const Cab = require("../models/cabModel");

const router = express.Router();

// Search for nearby cabs 
router.get("/search-cabs", async (req, res) => {
  const { lat, lng, radius } = req.query;
  
  try {
    const cabs = await Cab.find();
    const nearbyCabs = cabs.filter(cab => {
      const distance = getDistance({ lat, lng }, cab.location);
      // console.log(lat);
      return distance <= radius;
    });

    res.status(200).json(nearbyCabs);
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
