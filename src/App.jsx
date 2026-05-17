import React from 'react';

function App() {
  return (
    <>
      {/* 1. Header & Navigation */}
      <header className="navbar">
        <div className="logo">
          <i className="fa-solid fa-shield-halved"></i> SafeRoute
        </div>
        <nav>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#roles">User Roles</a></li>
            <li><a href="#contact">Emergency Contact</a></li>
          </ul>
        </nav>
        <button className="btn btn-primary">Download App</button>
      </header>

      {/* 2. Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Empowering Women with <span className="highlight">AI-Powered</span> Safe Navigation</h1>
          <p>Navigate confidently using real-time crime data, street lighting metrics, and crowd density analysis to choose the safest path home.</p>
          <div className="hero-buttons">
            <a href="#how-it-works" class="btn btn-secondary">Explore Live Map</a>
            <button className="btn btn-sos"><i className="fa-solid fa-circle-exclamation"></i> Trigger SOS Demo</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="map-placeholder">
            <div className="route safe"><i className="fa-solid fa-circle-check"></i> Safest Route (🟢 Active)</div>
            <div className="route moderate"><i className="fa-solid fa-triangle-exclamation"></i> Alternate Route (🟡 Crowded)</div>
            <div className="route risky"><i className="fa-solid fa-circle-xmark"></i> Avoid Route (🔴 High Risk)</div>
          </div>
        </div>
      </section>

      {/* 3. Key Features Section */}
      <section id="features" className="features-section">
        <h2>Core Platform Features</h2>
        <p className="section-sub">Advanced MERN-Stack architecture designed for real-world impact.</p>
        
        <div className="features-grid">
          <div className="feature-card">
            <i className="fa-solid fa-route icon-safe"></i>
            <h3>Safe Route Recommendations</h3>
            <p>Calculates safety scores using historical crime density, streetlights, and proximity to safe zones like police stations.</p>
          </div>
          <div className="feature-card">
            <i className="fa-solid fa-bell icon-danger"></i>
            <h3>Instant SOS System</h3>
            <p>Hold for 3 seconds to stream live coordinates via Socket.io and blast automated Twilio SMS alerts to trusted guardians.</p>
          </div>
          <div className="feature-card">
            <i className="fa-solid fa-location-crosshairs icon-info"></i>
            <h3>Live Location Tracking</h3>
            <p>Keeps your trusted contacts updated in real-time. Detects sudden deviations or prolonged, unusual stops.</p>
          </div>
        </div>
      </section>

      {/* 4. Interactive Architecture/Flow Overview */}
      <section id="how-it-works" className="flow-section">
        <h2>How SafeRoute Protects You</h2>
        <div className="flow-container">
          <div className="flow-step">
            <span className="step-num">1</span>
            <h4>Set Destination</h4>
            <p>Input your travel endpoint using Google Maps auto-suggest feature.</p>
          </div>
          <div className="flow-step">
            <span className="step-num">2</span>
            <h4>AI Analysis</h4>
            <p>Our machine learning model processes current time, lighting data, and local crime heatmaps.</p>
          </div>
          <div className="flow-step">
            <span className="step-num">3</span>
            <h4>Secure Commute</h4>
            <p>Follow the safely-vetted route while your data syncs securely with MongoDB cloud storage.</p>
          </div>
        </div>
      </section>

      {/* 5. User Roles Section */}
      <section id="roles" className="roles-section">
        <h2>Platform Ecosystem</h2>
        <div className="roles-grid">
          <div className="role-box">
            <i className="fa-solid fa-user"></i>
            <h3>End User (Woman)</h3>
            <p>Register profiles, save emergency contacts, view safe pathways, and toggle instant audio/GPS SOS triggers.</p>
          </div>
          <div className="role-box">
            <i className="fa-solid fa-users"></i>
            <h3>Community</h3>
            <p>Report safety incidents, log broken streetlights, rate areas, and validate crowdsourced safety parameters.</p>
          </div>
          <div className="role-box">
            <i className="fa-solid fa-user-shield"></i>
            <h3>Admin Console</h3>
            <p>Manage community incident validation, evaluate critical hotspot analytics, and coordinate with local authorities.</p>
          </div>
        </div>
      </section>

      {/* 6. Demo Registration Form / Contact Footer */}
      <footer id="contact" className="footer-section">
        <div className="footer-content">
          <div className="footer-form">
            <h3>Stay Informed & Secure</h3>
            <p>Sign up to get notified when our comprehensive MERN application beta goes live.</p>
            <form action="#" method="POST" onSubmit={(e) => { e.preventDefault(); alert('Demo Registration Successful!'); }}>
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" className="btn btn-primary">Register for Beta</button>
            </form>
          </div>
        </div>
        <hr />
        <div className="footer-bottom">
          <p>&copy; 2026 SafeRoute Platform. Developed for Next-Gen Full Stack MERN Internship Assessment.</p>
        </div>
      </footer>
    </>
  );
}

export default App;