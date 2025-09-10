import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';

// Helper function to determine circle color based on earthquake magnitude
const getMagnitudeColor = (magnitude) => {
  if (magnitude < 3) return '#4caf50'; // Green for minor
  if (magnitude < 5) return '#ffeb3b'; // Yellow for light
  if (magnitude < 6) return '#ff9800'; // Orange for moderate
  if (magnitude < 7) return '#f44336'; // Red for strong
  return '#b71c1c'; // Dark Red for major
};

function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [minMagnitude, setMinMagnitude] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')
      .then(response => {
        setEarthquakes(response.data.features);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to load earthquake data. Please try again later.');
        setLoading(false);
      });
  }, []);

  const mapCenter = [20, 0];

  // Fix for Leaflet's default icon issue with Webpack/CRA
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });

  const filteredEarthquakes = earthquakes.filter(eq => eq.properties.mag >= minMagnitude);

  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{
        position: 'absolute', top: 50, left: '50%', transform: 'translateX(-50%)',
        zIndex: 1000, background: 'white', padding: '15px', borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '15px',
        flexWrap: 'wrap'
      }}>
        <label style={{ fontWeight: 'bold' }}>
          Min Magnitude:
          <input
            type="number"
            step="0.1"
            value={minMagnitude}
            onChange={(e) => setMinMagnitude(parseFloat(e.target.value) || 0)}
            style={{ marginLeft: '10px', padding: '5px', width: '80px' }}
            disabled={loading}
          />
        </label>
        
        {!loading && !error && (
          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
            Showing: {filteredEarthquakes.length} earthquakes
          </div>
        )}

        {loading && <span>Loading earthquake data...</span>}
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </div>

      {!loading && !error && filteredEarthquakes.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '100px', fontSize: '18px' }}>
          No earthquakes found matching the filter.
        </div>
      )}

      {!loading && !error && filteredEarthquakes.length > 0 && (
        <MapContainer center={mapCenter} zoom={2} style={{ flex: 1, width: '100%' }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a> contributors &copy; OpenStreetMap contributors'
          />

          {filteredEarthquakes.map(eq => {
            const [lon, lat, depth] = eq.geometry.coordinates;
            const mag = eq.properties.mag;
            const place = eq.properties.place;
            const time = new Date(eq.properties.time).toLocaleString();
            const url = eq.properties.url;

            // Determine the color based on magnitude
            const circleColor = getMagnitudeColor(mag);

            return (
              <Circle
                key={eq.id}
                center={[lat, lon]}
                radius={mag * 20000} // Radius scales with magnitude
                color={circleColor} // Apply dynamic color
                fillColor={circleColor} // Apply dynamic fill color
                fillOpacity={0.6} // Slightly higher opacity for better visibility
              >
                <Popup>
                  <div>
                    <strong>Location:</strong> {place}<br />
                    <strong>Magnitude:</strong> <span style={{ color: circleColor, fontWeight: 'bold' }}>{mag}</span><br />
                    <strong>Depth:</strong> {depth} km<br />
                    <strong>Time:</strong> {time}<br />
                    <a href={url} target="_blank" rel="noopener noreferrer">Event Details</a>
                  </div>
                </Popup>
              </Circle>
            );
          })}
        </MapContainer>
      )}
    </div>
  );
}

export default App;