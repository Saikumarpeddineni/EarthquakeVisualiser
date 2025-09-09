import React, { useState, useEffect } from 'react';

// Helper function to determine color based on magnitude for consistency
const getMagnitudeColor = (magnitude) => {
  if (magnitude < 5) return '#ff9800'; // Orange
  if (magnitude < 6.5) return '#f44336'; // Red
  return '#b71c1c'; // Dark Red
};

function LatestNews() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      // Fetches significant earthquakes from the past 24 hours
      const apiUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson";
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data.features);
      } catch (e) {
        setError("Could not fetch the latest earthquake data. Please try again later.");
        console.error("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div className="news-container">
      <div className="news-header">
        <h1>📰 Latest Significant Earthquakes</h1>
        <p>A real-time list of significant seismic events from the last 24 hours, provided by the USGS.</p>
      </div>

      {loading && (
        <div className="status-indicator">
            <div className="spinner"></div>
            <p>Fetching latest events...</p>
        </div>
      )}

      {error && <p className="status-indicator error">{error}</p>}
      
      {!loading && !error && events.length === 0 && (
        <p className="status-indicator">No significant earthquakes reported in the past 24 hours.</p>
      )}

      {!loading && !error && events.length > 0 && (
        <div className="events-list">
          {events.map((event) => {
            const { id, properties } = event;
            const { mag, place, time, url } = properties;
            const eventTime = new Date(time).toLocaleString();
            const magnitudeColor = getMagnitudeColor(mag);

            return (
              <div key={id} className="event-card">
                <div className="magnitude-display" style={{ backgroundColor: magnitudeColor }}>
                  {mag.toFixed(1)}
                  <span>MAG</span>
                </div>
                <div className="event-details">
                  <h3>{place}</h3>
                  <p><strong>Time:</strong> {eventTime}</p>
                  <p>A significant earthquake has been reported. Click for more details.</p>
                </div>
                <a href={url} target="_blank" rel="noopener noreferrer" className="details-link">
                  View Event →
                </a>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        .news-container {
          max-width: 900px;
          margin: auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        .news-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .news-header h1 {
          color: #1976d2;
          font-size: 2.5rem;
          margin-bottom: 10px;
        }
        .news-header p {
          font-size: 1.1rem;
          color: #555;
        }
        .status-indicator {
          text-align: center;
          font-size: 1.2rem;
          color: #777;
          padding: 50px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }
        .status-indicator.error { color: #d32f2f; }
        .spinner {
          border: 5px solid rgba(0, 0, 0, 0.1);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border-left-color: #1976d2;
          animation: spin 1s ease infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .events-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .event-card {
          display: flex;
          align-items: center;
          gap: 20px;
          background: #fff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          border: 1px solid #e0e0e0;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .event-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        }
        .magnitude-display {
          flex-shrink: 0;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          line-height: 1;
        }
        .magnitude-display span {
          font-size: 0.8rem;
          font-weight: normal;
          margin-top: 2px;
        }
        .event-details {
          flex-grow: 1;
        }
        .event-details h3 {
          margin: 0 0 10px;
          color: #333;
        }
        .event-details p {
          margin: 5px 0;
          color: #666;
        }
        .details-link {
          background-color: #f4f6f8;
          color: #1976d2;
          padding: 10px 15px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: bold;
          transition: background-color 0.2s, color 0.2s;
        }
        .details-link:hover {
          background-color: #1976d2;
          color: white;
        }
        @media (max-width: 600px) {
            .event-card {
                flex-direction: column;
                text-align: center;
            }
        }
      `}</style>
    </div>
  );
}

export default LatestNews;