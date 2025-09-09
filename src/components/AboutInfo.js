import React, { useState } from 'react';

// Data for the magnitude scale visualization
const magnitudeData = [
  { mag: '1-2', label: 'Micro', effect: 'Not felt, but recorded by seismographs.', color: '#a5d6a7' },
  { mag: '3-4', label: 'Minor', effect: 'Often felt by people, but very rarely causes damage.', color: '#fff59d' },
  { mag: '5', label: 'Moderate', effect: 'Can cause damage of varying severity to poorly constructed buildings.', color: '#ffcc80' },
  { mag: '6', label: 'Strong', effect: 'Can cause damage in populated areas. Strong shaking.', color: '#ff8a65' },
  { mag: '7', label: 'Major', effect: 'Causes serious damage over larger areas.', color: '#e57373' },
  { mag: '8+', label: 'Great', effect: 'Catastrophic destruction across huge areas.', color: '#b71c1c' },
];

// Data for the accordion FAQ
const faqData = [
  {
    question: 'What is an earthquake?',
    answer: "An earthquake is the shaking of the Earth's surface caused by a sudden release of energy in the planet's crust. This release creates seismic waves that travel outwards, causing the ground to tremble."
  },
  {
    question: 'Why do earthquakes happen?',
    answer: "The Earth's crust is made of large pieces called tectonic plates. These plates are in constant, slow motion. Earthquakes occur when these plates get stuck at their edges (fault lines). The stress builds up and eventually, the rock breaks or slips, releasing the stored energy in waves."
  },
  {
    question: 'Can we predict earthquakes?',
    answer: "No, scientists cannot yet predict the exact time, place, and magnitude of a future earthquake. However, they can forecast the probability of one occurring in a specific area over a period of years. Modern Earthquake Early Warning (EEW) systems can detect the first, faster P-waves and provide seconds of warning before the more destructive S-waves and surface waves arrive."
  },
  {
    question: 'What should I do during an earthquake?',
    answer: "If you are indoors, follow the 'Drop, Cover, and Hold On' protocol. Drop to the ground, take cover under a sturdy table or desk, and hold on until the shaking stops. Stay away from windows, glass, or anything that could fall. If you are outdoors, move to an open area away from buildings, trees, and power lines."
  }
];

function AboutInfo() {
  const [openIndex, setOpenIndex] = useState(0); // Keep the first item open by default

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>ℹ️ All About Earthquakes</h1>
        <p>A guide to understanding the science behind seismic events and how to stay safe.</p>
      </div>

      {/* Accordion FAQ Section */}
      <div className="accordion">
        {faqData.map((item, index) => (
          <div key={index} className="accordion-item">
            <button className="accordion-header" onClick={() => handleToggle(index)}>
              {item.question}
              <span className={`accordion-icon ${openIndex === index ? 'open' : ''}`}>▼</span>
            </button>
            {openIndex === index && (
              <div className="accordion-content">
                <p>{item.answer}</p>
                {item.question === 'What should I do during an earthquake?' && 
                  <div className="safety-image-placeholder"></div>
                }
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Magnitude Scale Section */}
      <div className="magnitude-section">
        <h2>📊 How Are Earthquakes Measured?</h2>
        <p>The Moment Magnitude Scale is logarithmic. For each whole number you go up, the ground shaking increases by 10 times, and the energy released increases by about 32 times.</p>
        <div className="magnitude-scale">
          {magnitudeData.map(item => (
            <div key={item.mag} className="scale-item">
              <div className="scale-mag" style={{ backgroundColor: item.color, color: item.mag === '8+' ? 'white' : 'black' }}>{item.mag}</div>
              <div className="scale-details">
                <strong>{item.label}:</strong> {item.effect}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .about-container {
          max-width: 900px;
          margin: auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        .about-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .about-header h1 {
          color: #1976d2;
          font-size: 2.5rem;
        }
        .about-header p {
          font-size: 1.1rem;
          color: #555;
        }
        .accordion {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          border: 1px solid #e0e0e0;
          margin-bottom: 40px;
        }
        .accordion-item {
          border-bottom: 1px solid #e0e0e0;
        }
        .accordion-item:last-child {
          border-bottom: none;
        }
        .accordion-header {
          width: 100%;
          background: #fff;
          border: none;
          padding: 20px;
          text-align: left;
          font-size: 1.2rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #1976d2;
        }
        .accordion-header:hover {
          background: #f9f9f9;
        }
        .accordion-icon {
          transition: transform 0.3s ease;
        }
        .accordion-icon.open {
          transform: rotate(180deg);
        }
        .accordion-content {
          padding: 0 20px 20px 20px;
          background: #fdfdfd;
          line-height: 1.7;
          color: #333;
        }
        .safety-image-placeholder {
          margin-top: 15px;
          font-style: italic;
          color: #555;
          text-align: center;
        }
        .magnitude-section {
          text-align: center;
          margin-top: 40px;
        }
        .magnitude-section h2 {
          color: #1976d2;
          font-size: 2rem;
          margin-bottom: 10px;
        }
        .magnitude-section p {
            max-width: 700px;
            margin: 0 auto 25px auto;
            color: #555;
        }
        .magnitude-scale {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .scale-item {
          display: flex;
          align-items: center;
          background: #f9f9f9;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #eee;
        }
        .scale-mag {
          padding: 15px;
          font-weight: bold;
          font-size: 1.2rem;
          width: 80px;
          text-align: center;
          flex-shrink: 0;
        }
        .scale-details {
          padding: 15px;
          text-align: left;
        }
      `}</style>
    </div>
  );
}

export default AboutInfo;