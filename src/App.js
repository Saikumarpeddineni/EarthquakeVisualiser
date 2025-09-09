import React, { useState } from 'react';
import MapVisualizer from './components/MapVisualiser';
import LatestNews from './components/LatestNews';
import AboutInfo from './components/AboutInfo';
import SeismicPatterns from './components/SeismicPatterns';

// App Overview Component
function AppOverview() {
  return (
    <div className="overview-container">
      <h1 className="overview-title">Earthquake Explorer</h1>
      <p className="overview-subtitle">
        Explore global seismic events in real-time. Visualize fault lines, track the latest tremors, and understand the powerful science that shapes our world.
      </p>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🌍</div>
          <h3>Map Visualizer</h3>
          <p>An interactive cartographic display of global earthquakes.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📰</div>
          <h3>Latest News</h3>
          <p>A dispatch of the most recent significant seismic events.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌋</div>
          <h3>Seismic Patterns</h3>
          <p>A study of the formations and behaviors of tectonic activity.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">ℹ️</div>
          <h3>About Earthquakes</h3>
          <p>An in-depth guide to magnitudes, effects, and seismology.</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'overview');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
  };

  return (
    <div className="app-container">
      {/* This header is primarily for mobile view */}
      <header className="mobile-header">
        <h1 className="app-title">Earthquake Explorer</h1>
      </header>

      {/* Desktop Sidebar Navigation */}
      <aside className="sidebar desktop-sidebar">
        <h2 className="sidebar-title">Menu</h2>
        {['overview', 'map', 'about', 'patterns', 'news'].map(tab => (
          <button
            key={tab}
            className={`sidebar-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab === 'overview' && '🏠 Overview'}
            {tab === 'map' && '🌍 Visualizer'}
            {tab === 'about' && 'ℹ️ About'}
            {tab === 'patterns' && '🌋 Patterns'}
            {tab === 'news' && '📰 News'}
          </button>
        ))}
      </aside>

      {/* Main Content Area */}
      <main className={`main-content ${activeTab === 'map' ? 'no-padding' : ''}`}>
        {activeTab === 'overview' && <AppOverview />}
        {activeTab === 'map' && <MapVisualizer />}
        {activeTab === 'news' && <LatestNews />}
        {activeTab === 'about' && <AboutInfo />}
        {activeTab === 'patterns' && <SeismicPatterns />}
      </main>

      {/* Mobile-only Bottom Navigation Bar */}
      <nav className="bottom-nav">
        {['overview', 'map', 'news', 'patterns', 'about'].map(tab => (
          <button
            key={tab}
            className={`bottom-nav-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            <div className="icon">
              {tab === 'overview' && '🏠'}
              {tab === 'map' && '🌍'}
              {tab === 'news' && '📰'}
              {tab === 'patterns' && '🌋'}
              {tab === 'about' && 'ℹ️'}
            </div>
            <div className="label">
              {tab === 'overview' && 'Home'}
              {tab === 'map' && 'Map'}
              {tab === 'news' && 'News'}
              {tab === 'patterns' && 'Patterns'}
              {tab === 'about' && 'About'}
            </div>
          </button>
        ))}
      </nav>

      <style>{`
        /* Import Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@500;700&family=Poppins:wght@400;500&display=swap');

        /* CSS Variables for New Theme */
        :root {
          --bg-parchment: #FDF6E3;
          --surface-ivory: #FFFBF2;
          --text-primary: #4A443C;
          --text-secondary: #7A7368;
          --primary-accent: #2A9D8F; /* Muted Teal */
          --border-color: #DCD3C4;
          --shadow-color: rgba(74, 68, 60, 0.1);
        }

        /* General Styles */
        body { 
          margin: 0; 
          font-family: 'Poppins', sans-serif; 
          background: var(--bg-parchment); 
          color: var(--text-primary);
        }
        h1, h2, h3 {
          font-family: 'Lora', serif;
        }
        .app-container { display: flex; min-height: 100vh; }
        
        /* Desktop Sidebar */
        .desktop-sidebar { 
          background: var(--surface-ivory);
          color: var(--text-primary);
          width: 230px; 
          min-height: 100vh; 
          position: fixed; top: 0; left: 0; 
          padding: 20px; 
          display: flex; flex-direction: column; 
          gap: 10px; z-index: 1000;
          border-right: 1px solid var(--border-color);
        }
        .sidebar-title { 
          font-size: 1.8rem; 
          font-weight: 700; 
          text-align: center; 
          margin-bottom: 20px; 
          color: var(--text-primary);
        }
        .sidebar-btn { 
          background: transparent; 
          border: none;
          border-left: 3px solid transparent;
          color: var(--text-secondary); 
          padding: 12px 20px; text-align: left; 
          font-size: 1rem; font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease; 
          display: flex; align-items: center; gap: 12px; 
        }
        .sidebar-btn.active { 
          color: var(--primary-accent);
          background: rgba(42, 157, 143, 0.05);
          border-left: 3px solid var(--primary-accent);
          font-weight: 500;
        }
        .sidebar-btn:hover { 
          background: rgba(42, 157, 143, 0.05);
          color: var(--primary-accent);
        }

        /* Main Content */
        .main-content { 
          margin-left: 230px; 
          flex-grow: 1; 
          padding: 40px; 
          overflow-y: auto; 
          display: flex;
          flex-direction: column;
        }
        .main-content.no-padding { padding: 0; }
        
        /* App Overview Component Styling */
        .overview-container { 
          max-width: 900px; margin: auto; 
          background: transparent; 
          text-align: center; 
        }
        .overview-title { 
          color: var(--text-primary); 
          margin-bottom: 15px; 
          font-size: 3.5rem; font-weight: 700;
        }
        .overview-subtitle { 
          color: var(--text-secondary); 
          margin-bottom: 40px; 
          line-height: 1.7; font-size: 1.1rem;
        }
        .features-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
          gap: 25px; 
        }
        .feature-card { 
          background: var(--surface-ivory); 
          padding: 30px; border-radius: 8px; 
          border: 1px solid var(--border-color);
          box-shadow: 0 4px 15px var(--shadow-color);
          transition: transform 0.2s ease, box-shadow 0.2s ease; 
        }
        .feature-card:hover { 
          transform: translateY(-5px); 
          box-shadow: 0 8px 25px var(--shadow-color); 
        }
        .feature-card h3 { 
          color: var(--text-primary); 
          margin-top: 0; margin-bottom: 10px;
        }
        .feature-card p {
          color: var(--text-secondary);
        }
        .feature-icon { 
          font-size: 2.5rem; 
          margin-bottom: 15px; 
          display: block; 
        }
        
        /* Mobile-only styles */
        .mobile-header, .bottom-nav { display: none; }
        
        @media (max-width: 768px) {
          .app-container { flex-direction: column; }
          .desktop-sidebar { display: none; }
          
          .mobile-header { 
            display: flex; justify-content: center; align-items: center; 
            background: var(--surface-ivory);
            color: var(--text-primary); padding: 5px; position: sticky; top: 0; z-index: 1100; 
            border-bottom: 1px solid var(--border-color);
          }
          .app-title { font-weight: 700; font-size: 1.3rem; }
          
          .main-content { 
            margin-left: 0; padding: 20px; 
            padding-bottom: 85px;
          }
          .main-content.no-padding {
            padding: 0;
            padding-bottom: 65px;
          }
          
          .bottom-nav { 
            display: flex; justify-content: space-around; align-items: center; 
            background: var(--surface-ivory); 
            border-top: 1px solid var(--border-color); 
            position: fixed; bottom: 0; left: 0; right: 0; 
            height: 65px; z-index: 1100; 
          }
          .bottom-nav-btn { 
            color: var(--text-secondary); 
            /* other mobile styles unchanged */
            flex: 1; display: flex; flex-direction: column; 
            align-items: center; justify-content: center; 
            gap: 4px; background: transparent; border: none; 
            font-size: 0.75rem; 
            transition: color 0.2s ease; cursor: pointer;
          }
          .bottom-nav-btn .icon { font-size: 1.4rem; line-height: 1; }
          .bottom-nav-btn.active { color: var(--primary-accent); }
          .overview-title { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  );
}

export default App;