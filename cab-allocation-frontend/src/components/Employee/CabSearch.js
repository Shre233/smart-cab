import React, { useState } from 'react';
import { searchCabs, createTrip } from '../../api';
import './CabSearch.css'; 

const CabSearch = () => {
    const [location, setLocation] = useState({ lat: '', lng: '' });
    const [destination, setDestination] = useState({ lat: '', lng: '' });
    const [radius, setRadius] = useState('');
    const [nearbyCabs, setNearbyCabs] = useState([]);
    const [allocatedCabId, setAllocatedCabId] = useState(null); 

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await searchCabs({ lat: location.lat, lng: location.lng, radius });
            setNearbyCabs(response.data);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const handleAllocate = async (cabId) => {
        try {
            const tripData = {
                trip_id: cabId,
                start_location: {
                    lat: location.lat,
                    lng: location.lng,
                },
                end_location: {
                    lat: destination.lat,
                    lng: destination.lng,
                },
            };
            const response = await createTrip(tripData);
            alert(response.data.message);
            
            setAllocatedCabId(cabId);
            setNearbyCabs(nearbyCabs.map((cab) =>
                cab.cab_id === cabId ? { ...cab, status: 'engaged' } : cab
            ));
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="cab-search-container">
            <h2>Search for Nearby Cabs</h2>
            <form onSubmit={handleSearch} className="cab-search-form">
                <h3>Start Location</h3>
                <input
                    type="number"
                    placeholder="Start Latitude"
                    value={location.lat}
                    onChange={(e) => setLocation({ ...location, lat: e.target.value })}
                    required
                    className="form-input"
                />
                <input
                    type="number"
                    placeholder="Start Longitude"
                    value={location.lng}
                    onChange={(e) => setLocation({ ...location, lng: e.target.value })}
                    required
                    className="form-input"
                />

                <h3>Destination Location</h3>
                <input
                    type="number"
                    placeholder="Destination Latitude"
                    value={destination.lat}
                    onChange={(e) => setDestination({ ...destination, lat: e.target.value })}
                    required
                    className="form-input"
                />
                <input
                    type="number"
                    placeholder="Destination Longitude"
                    value={destination.lng}
                    onChange={(e) => setDestination({ ...destination, lng: e.target.value })}
                    required
                    className="form-input"
                />

                <h3>Search Parameters</h3>
                <input
                    type="number"
                    placeholder="Radius (km)"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    required
                    className="form-input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            <h3>Nearby Cabs</h3>
            <ul className="cab-list">
                {nearbyCabs.length === 0 ? (
                    <li>No cabs found in the area.</li>
                ) : (
                    nearbyCabs.map((cab) => (
                        <li key={cab.cab_id} className="cab-item">
                            {cab.driver_name}
                            {cab.status === 'available' && allocatedCabId !== cab.cab_id && (
                                <button
                                    onClick={() => handleAllocate(cab.cab_id)}
                                    className="allocate-button"
                                >
                                    Allocate Cab
                                </button>
                            )}
                            {allocatedCabId === cab.cab_id && <span> (Engaged)</span>}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default CabSearch;
