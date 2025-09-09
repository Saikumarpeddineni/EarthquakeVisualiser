import React from 'react';

function SeismicPatterns() {
  return (
    <div className="patterns-container">
      <div className="patterns-header">
        <h1>🌋 Understanding Seismic Patterns</h1>
        <p>
          Seismic patterns reveal the story of our planet's dynamic crust. By studying where and how earthquakes occur, we can understand the forces that shape our world and better prepare for their impact.
        </p>
      </div>

      <div className="patterns-grid">
        {/* Card 1: Plate Tectonics */}
        <div className="pattern-card">
          <h3>🌍 The "Ring of Fire" and Plate Boundaries</h3>
          <p>
            The vast majority of earthquakes (around 90%) occur along the edges of tectonic plates. The most famous example is the **"Ring of Fire"** in the Pacific Ocean, a 40,000 km horseshoe-shaped zone where the massive Pacific Plate interacts with numerous smaller plates. This constant grinding, colliding, and sliding is what generates intense seismic activity.
          </p>
        </div>

        {/* Card 2: Measuring Earthquakes */}
        <div className="pattern-card">
          <h3>📈 Magnitude vs. Intensity</h3>
          <p>
            Earthquakes are measured in two main ways:
          </p>
          <ul>
            <li><strong>Magnitude (e.g., Moment Magnitude Scale):</strong> Measures the total energy released at the earthquake's source. It is a single, objective value.</li>
            <li><strong>Intensity (e.g., Mercalli Scale):</strong> Measures the shaking and damage at a specific location. Intensity varies from place to place.</li>
          </ul>
        </div>
      </div>
      
      {/* Section: Fault Types */}
      <div className="section-container">
        <h2>Types of Faults</h2>
        <p>A fault is a fracture in the Earth's crust. When an earthquake occurs, it's because of sudden movement along one of these faults.</p>
        
        <div className="patterns-grid">
          <div className="pattern-card">
            <h4>➡️ Strike-Slip Faults</h4>
            <p>Caused by shearing forces where two blocks of crust slide horizontally past each other. The San Andreas Fault in California is a world-famous example.</p>
          </div>
          <div className="pattern-card">
            <h4>⬇️ Normal Faults</h4>
            <p>Caused by extensional forces where the crust is being stretched apart. One block of land slips downwards relative to the other. Common in places like the Great Rift Valley in Africa.</p>
          </div>
          <div className="pattern-card">
            <h4>⬆️ Reverse (Thrust) Faults</h4>
            <p>Caused by compressional forces where the crust is being squeezed. One block is pushed up over the other. These are common in mountain ranges like the Himalayas.</p>
          </div>
        </div>
      </div>
      
      {/* Section: Seismic Waves */}
      <div className="section-container">
        <h2>🌊 Seismic Wave Propagation</h2>
        <p>When a fault ruptures, it releases energy in the form of seismic waves that travel through the Earth.</p>
        <div className="patterns-grid">
          <div className="pattern-card">
            <h4>P-Waves (Primary)</h4>
            <p>The fastest waves. They move in a push-pull, compressional motion and can travel through solids, liquids, and gases. They are the first waves to be detected by seismographs.</p>
          </div>
          <div className="pattern-card">
            <h4>S-Waves (Secondary)</h4>
            <p>Slower than P-waves, they move in a side-to-side, shearing motion. They can only travel through solid rock, which is how scientists learned that the Earth has a liquid outer core.</p>
          </div>
          <div className="pattern-card">
            <h4>Surface Waves</h4>
            <p>These are the slowest waves but cause the most destruction. They are confined to the surface of the Earth and include **Love waves** (side-to-side) and **Rayleigh waves** (rolling motion).</p>
          </div>
        </div>
      </div>

      <div className="patterns-footer">
        <h3>🔧 Why This Matters</h3>
        <p>Understanding these patterns is crucial for seismic hazard assessment, engineering safer buildings, and developing early warning systems that can save lives.</p>
        <a href="https://earthquake.usgs.gov/learn/" target="_blank" rel="noopener noreferrer" className="learn-more-btn">
          📚 Learn More at USGS
        </a>
      </div>

      <style>{`
        .patterns-container {
          max-width: 900px;
          margin: auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #333;
        }
        .patterns-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .patterns-header h1 {
          color: #1976d2;
          font-size: 2.5rem;
          margin-bottom: 10px;
        }
        .patterns-header p {
          font-size: 1.1rem;
          color: #555;
          line-height: 1.6;
        }
        .section-container {
          margin-bottom: 40px;
          text-align: center;
        }
        .section-container h2 {
          font-size: 2rem;
          color: #1976d2;
          margin-bottom: 10px;
        }
        .section-container > p {
            margin-bottom: 20px;
        }
        .patterns-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        .pattern-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          border: 1px solid #e0e0e0;
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          text-align: left;
        }
        .pattern-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        }
        .pattern-card h3 {
          color: #1976d2;
          margin-top: 0;
          font-size: 1.3rem;
        }
        .pattern-card h4 {
          color: #1976d2;
          margin-top: 0;
          font-size: 1.1rem;
        }
        .pattern-card p, .pattern-card ul {
          line-height: 1.7;
          font-size: 1rem;
          color: #444;
        }
        .pattern-card ul {
          padding-left: 20px;
        }
        .patterns-footer {
          text-align: center;
          background: #f4f6f8;
          padding: 30px;
          border-radius: 12px;
        }
        .learn-more-btn {
          display: inline-block;
          margin-top: 20px;
          padding: 12px 25px;
          background-color: #1976d2;
          color: white;
          text-decoration: none;
          font-weight: bold;
          border-radius: 8px;
          transition: background-color 0.2s;
        }
        .learn-more-btn:hover {
          background-color: #1565c0;
        }
      `}</style>
    </div>
  );
}

export default SeismicPatterns;