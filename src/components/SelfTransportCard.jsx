import React, { useState } from 'react';
import { MapPin, Loader2, ExternalLink } from 'lucide-react';

const SelfTransportCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState('');
  const [showPinInput, setShowPinInput] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [userLocation, setUserLocation] = useState(null);

  // Haversine formula to calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getLocationFromPin = async (pin) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${pin}&country=India&format=json`, {
        headers: {
          'User-Agent': 'EmergencyDashboardApp/1.0'
        }
      });
      const data = await response.json();
      if (data.length > 0) {
        return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
      }
      throw new Error('PIN code not found. Please check and try again.');
    } catch (err) {
      if (err.message === 'PIN code not found. Please check and try again.') {
        throw err;
      }
      throw new Error('Unable to get location from PIN code');
    }
  };

  const fetchHospitals = async (lat, lon) => {
    try {
      const query = `[out:json];(node["amenity"="hospital"](around:10000,${lat},${lon});way["amenity"="hospital"](around:10000,${lat},${lon}););out center;`;
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query
      });
      const data = await response.json();
      const hospitalList = data.elements
        .map(element => {
          const name = element.tags?.name || 'Unnamed Hospital';
          const hLat = element.lat || element.center?.lat;
          const hLon = element.lon || element.center?.lon;
          if (hLat && hLon) {
            const distance = calculateDistance(lat, lon, hLat, hLon);
            return { name, lat: hLat, lon: hLon, distance };
          }
          return null;
        })
        .filter(h => h && h.distance <= 10)
        .sort((a, b) => a.distance - b.distance);
      return hospitalList;
    } catch (err) {
      throw new Error('Unable to fetch hospitals right now. Please try again in a moment.');
    }
  };

  const handleFindHospitals = async () => {
    setLoading(true);
    setError('');
    setHospitals([]);
    setShowPinInput(false);

    try {
      let location = userLocation;
      if (!location) {
        // Try geolocation
        location = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
            (err) => reject(err)
          );
        });
        setUserLocation(location);
      }

      const hospitalList = await fetchHospitals(location.lat, location.lon);
      setHospitals(hospitalList);
      setIsExpanded(true);
    } catch (geoErr) {
      // Geolocation failed, show PIN input
      setError('Please allow location access or enter your PIN code to continue.');
      setShowPinInput(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePinSubmit = async () => {
    if (!pinCode.trim()) {
      setError('Please enter a PIN code');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const location = await getLocationFromPin(pinCode);
      setUserLocation(location);
      const hospitalList = await fetchHospitals(location.lat, location.lon);
      setHospitals(hospitalList);
      setIsExpanded(true);
      setShowPinInput(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openInMaps = (lat, lon) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`, '_blank');
  };

  return (
    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
          <span className="text-2xl">🚗</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Self Transport</h3>
          <p className="text-slate-500 text-sm">No ambulance available? Find the nearest hospital yourself.</p>
        </div>
      </div>

      <button
        onClick={handleFindHospitals}
        disabled={loading}
        className="w-full primary-gradient text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50 mb-4"
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : <MapPin size={18} />}
        Find Nearby Hospitals
      </button>

      {showPinInput && (
        <div className="mb-4">
          <p className="text-sm text-slate-600 mb-2">Enter your PIN code to find hospitals:</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              placeholder="PIN code"
              className="flex-1 px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handlePinSubmit}
              disabled={loading}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : 'Submit'}
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}

      {isExpanded && hospitals.length > 0 && (
        <div className="border-t border-slate-100 pt-4">
          <h4 className="font-bold text-slate-900 mb-3">Nearby Hospitals:</h4>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {hospitals.map((hospital, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏥</span>
                  <div>
                    <p className="font-medium text-slate-900">{hospital.name}</p>
                    <p className="text-sm text-slate-500">{hospital.distance.toFixed(1)} km away</p>
                  </div>
                </div>
                <button
                  onClick={() => openInMaps(hospital.lat, hospital.lon)}
                  className="text-primary hover:text-primary-dark transition-colors"
                >
                  <ExternalLink size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {isExpanded && hospitals.length === 0 && !loading && (
        <p className="text-slate-500 text-sm">No hospitals found within 10 km of your location.</p>
      )}
    </div>
  );
};

export default SelfTransportCard;