import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';
import StudentList from './components/StudentList';

function App() {
  // ── Auth State ───────────────────────────────────────
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem('username') || null
  );
  const [authTab, setAuthTab] = useState('login');
  const [currentTab, setCurrentTab] = useState('dashboard');

  // ── Route Search State ───────────────────────────────
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [routeData, setRouteData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // ── Task State (localStorage) ────────────────────────
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('saferoute-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('saferoute-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // ── Task Handlers ────────────────────────────────────
  const handleAddTask = (taskText, priority) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      priority: priority,
      completed: false,
      createdAt: new Date().toLocaleTimeString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleLoginSuccess = (username) => {
    localStorage.setItem('username', username);
    setLoggedInUser(username);
    setCurrentTab('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setLoggedInUser(null);
    setAuthTab('login');
  };

  const handleSOS = () => {
    if (!navigator.geolocation) {
      alert('❌ Geolocation system unavailable.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
      },
      (error) => alert(`🛰️ Beacon Alert: ${error.message}`),
      { enableHighAccuracy: true }
    );
  };

  const handleRouteSearch = (e) => {
    e.preventDefault();
    if (!source.trim() || !destination.trim()) {
      alert("Please enter both a source and destination point.");
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      setRouteData({
        optimalPath: "Optimal Path Checked — 92% Safety Rating",
        optimalDesc: `High infrastructure illumination metrics verified safely from ${source} to ${destination}. Low historical incident logs detected across active parameters.`,
        altB: `Alternative Trace B — 80% Safety Index via standard pedestrian transit paths.`,
        altC: `Alternative Trace C — 65% Safety Index with minor lighting index variations.`
      });
      setIsAnalyzing(false);
    }, 1200);
  };

  // ══════════════════════════════════════════════════════
  // ── VIEW 1: DASHBOARD (after login) ──────────────────
  // ══════════════════════════════════════════════════════
  if (loggedInUser) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#bae6fd', color: '#0f172a', width: '100vw', overflowX: 'hidden', fontFamily: '"Inter", sans-serif' }}>

        {/* ── Navbar ── */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 4rem', background: '#fbcfe8', borderBottom: '2px solid #f472b6', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontWeight: '800', fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#db2777', letterSpacing: '-0.5px' }}>
            <i className="fa-solid fa-shield-halved"></i> SafeRoute
          </div>
          <nav style={{ flexGrow: 1, marginLeft: '4rem' }}>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '2.5rem', margin: 0, padding: 0 }}>
              <li>
                <button onClick={() => setCurrentTab('dashboard')} style={{ background: 'none', border: 'none', color: currentTab === 'dashboard' ? '#db2777' : '#475569', cursor: 'pointer', fontSize: '1rem', fontWeight: '700', borderBottom: currentTab === 'dashboard' ? '3px solid #db2777' : 'none', paddingBottom: '6px' }}>
                  Dashboard Hub
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('users')} style={{ background: 'none', border: 'none', color: currentTab === 'users' ? '#db2777' : '#475569', cursor: 'pointer', fontSize: '1rem', fontWeight: '700', borderBottom: currentTab === 'users' ? '3px solid #db2777' : 'none', paddingBottom: '6px' }}>
                  Workspace Directory
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('tasks')} style={{ background: 'none', border: 'none', color: currentTab === 'tasks' ? '#db2777' : '#475569', cursor: 'pointer', fontSize: '1rem', fontWeight: '700', borderBottom: currentTab === 'tasks' ? '3px solid #db2777' : 'none', paddingBottom: '6px' }}>
                  Commute Checklist
                </button>
              </li>
            </ul>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <span style={{ color: '#0f172a', fontSize: '0.9rem', fontWeight: '700', padding: '0.5rem 1.2rem', background: '#ffffff', borderRadius: '30px', border: '1px solid #f472b6' }}>
              👤 Profile: {loggedInUser}
            </span>
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#db2777', color: '#ffffff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '0.88rem' }}>
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </div>
        </header>

        {/* ── Main Content ── */}
        <main style={{ flex: 1, width: '100%', maxWidth: '1440px', margin: '0 auto', padding: '2.5rem', boxSizing: 'border-box' }}>

          {/* ══ DASHBOARD TAB ══ */}
          {currentTab === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

              {/* Welcome Banner */}
              <section style={{ background: '#fbcfe8', padding: '1.8rem 2.5rem', borderRadius: '16px', border: '2px solid #f472b6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <div>
                  <h1 style={{ fontSize: '2rem', margin: 0, fontWeight: '800', color: '#9d174d', letterSpacing: '-0.5px' }}>
                    Welcome back, {loggedInUser}! ✨
                  </h1>
                  <p style={{ color: '#475569', margin: '0.3rem 0 0 0', fontSize: '1rem', fontWeight: '500' }}>
                    Your active security matrix components are initialized.
                  </p>
                </div>
                <button onClick={handleSOS} style={{ backgroundColor: '#db2777', color: '#ffffff', fontSize: '1rem', fontWeight: '800', padding: '0.9rem 2.2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', boxShadow: '0 4px 12px rgba(219, 39, 119, 0.3)' }}>
                  <i className="fa-solid fa-tower-broadcast"></i> SEND EMERGENCY SOS
                </button>
              </section>

              {/* Dashboard Grid — Route Search + Task Manager */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.30fr 1fr', gap: '2rem', width: '100%', alignItems: 'start' }}>

                {/* ── Left: Route Search ── */}
                <div style={{ background: '#fbcfe8', border: '2px solid #f472b6', borderRadius: '16px', padding: '1.8rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.2rem', fontWeight: '800', color: '#9d174d' }}>
                    <i className="fa-solid fa-route"></i> Spatial Assessment Core Engine
                  </h3>
                  <form onSubmit={handleRouteSearch} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <input
                        type="text"
                        placeholder="Starting point (e.g., Jothipuram)..."
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        style={{ padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #f472b6', backgroundColor: '#ffffff', color: '#0f172a', fontSize: '0.9rem', fontWeight: '600', outline: 'none' }}
                      />
                      <input
                        type="text"
                        placeholder="Destination point..."
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        style={{ padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #f472b6', backgroundColor: '#ffffff', color: '#0f172a', fontSize: '0.9rem', fontWeight: '600', outline: 'none' }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isAnalyzing}
                      style={{ backgroundColor: '#db2777', color: '#ffffff', padding: '0.65rem', borderRadius: '8px', border: 'none', fontWeight: '800', cursor: isAnalyzing ? 'not-allowed' : 'pointer', fontSize: '0.9rem' }}
                    >
                      {isAnalyzing ? '⚡ Analyzing...' : '🔍 Map Safest Route'}
                    </button>
                  </form>

                  {!routeData && !isAnalyzing && (
                    <div style={{ padding: '2rem', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px dashed #f472b6', color: '#64748b', fontSize: '0.9rem', fontWeight: '600', textAlign: 'center' }}>
                      Enter your transit coordinates above to calculate optimal security routing patterns.
                    </div>
                  )}
                  {isAnalyzing && (
                    <div style={{ padding: '2rem', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #f472b6', color: '#db2777', fontSize: '0.95rem', fontWeight: '700', textAlign: 'center' }}>
                      ⏳ Synchronizing localized geo-mesh safety metrics...
                    </div>
                  )}
                  {routeData && !isAnalyzing && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ background: '#ffffff', border: '1px solid #f472b6', padding: '1.2rem', borderRadius: '12px' }}>
                        <strong style={{ fontSize: '1rem', color: '#db2777', display: 'block', marginBottom: '4px' }}>{routeData.optimalPath}</strong>
                        <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0, lineHeight: '1.5', fontWeight: '500' }}>{routeData.optimalDesc}</p>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #f472b6' }}>
                          <span style={{ color: '#9d174d', fontWeight: '700', fontSize: '0.95rem' }}>Alternate Path B</span>
                          <p style={{ fontSize: '0.85rem', color: '#475569', margin: '4px 0 0 0', fontWeight: '500' }}>{routeData.altB}</p>
                        </div>
                        <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #f472b6' }}>
                          <span style={{ color: '#9d174d', fontWeight: '700', fontSize: '0.95rem' }}>Alternate Path C</span>
                          <p style={{ fontSize: '0.85rem', color: '#475569', margin: '4px 0 0 0', fontWeight: '500' }}>{routeData.altC}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* ── Right: Task Manager ── */}
                <div style={{ background: '#fbcfe8', border: '2px solid #f472b6', borderRadius: '16px', padding: '1.8rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 0.2rem 0', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.2rem', fontWeight: '800', color: '#9d174d' }}>
                    <i className="fa-solid fa-list-check"></i> Pre-Commute Checklist
                  </h3>
                  <p style={{ color: '#475569', fontSize: '0.9rem', margin: '0 0 1.5rem 0', fontWeight: '500' }}>
                    Confirm localized travel metrics before departing.
                  </p>
                  <div style={{ background: '#ffffff', padding: '1.2rem', borderRadius: '12px', border: '1px solid #f472b6' }}>
                    <Header />
                    <TaskForm onAddTask={handleAddTask} />
                    <div style={{ marginTop: '1.2rem' }}>
                      <TaskList tasks={tasks} onDelete={handleDeleteTask} onToggleComplete={handleToggleComplete} />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ══ WORKSPACE DIRECTORY TAB ══ */}
          {currentTab === 'users' && (
            <div style={{ background: '#fbcfe8', border: '2px solid #f472b6', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0', fontWeight: '800', color: '#9d174d' }}>
                📁 Central Identity Directory
              </h3>
              <p style={{ color: '#475569', marginBottom: '1.8rem', fontSize: '0.95rem' }}>
                Active system profiles logged inside the database arrays.
              </p>
              <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #f472b6' }}>
                <StudentList />
              </div>
            </div>
          )}

          {/* ══ COMMUTE CHECKLIST TAB ══ */}
          {currentTab === 'tasks' && (
            <div style={{ background: '#fbcfe8', border: '2px solid #f472b6', borderRadius: '16px', padding: '2.5rem', maxWidth: '850px', margin: '0 auto', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0', fontWeight: '800', color: '#9d174d' }}>
                🛡️ Safety Checkpoint Hub
              </h3>
              <p style={{ color: '#475569', marginBottom: '1.8rem', fontSize: '0.95rem' }}>
                Manage and trigger destination checkpoint items parameters comprehensively.
              </p>
              <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #f472b6' }}>
                <Header />
                <TaskForm onAddTask={handleAddTask} />
                <div style={{ marginTop: '1.8rem' }}>
                  <TaskList tasks={tasks} onDelete={handleDeleteTask} onToggleComplete={handleToggleComplete} />
                </div>
              </div>
            </div>
          )}

        </main>

        {/* ── Footer ── */}
        <footer style={{ background: '#fbcfe8', borderTop: '2px solid #f472b6', padding: '1.2rem', textAlign: 'center', color: '#475569', fontSize: '0.9rem', fontWeight: '600' }}>
          <p>© 2026 SafeRoute Framework Core. Personalized Interface Layout Node.</p>
        </footer>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════
  // ── VIEW 2: LANDING PAGE (before login) ──────────────
  // ══════════════════════════════════════════════════════
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#bae6fd', color: '#0f172a', width: '100vw', overflowX: 'hidden', fontFamily: '"Inter", sans-serif' }}>

      {/* Landing Navbar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 4rem', background: '#fbcfe8', borderBottom: '2px solid #f472b6' }}>
        <div style={{ fontWeight: '800', fontSize: '1.4rem', color: '#db2777' }}>
          <i className="fa-solid fa-shield-halved"></i> SafeRoute
        </div>
      </header>

      {/* Landing Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem', boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '4rem', alignItems: 'center' }}>

          {/* Left: Hero Text */}
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1.2, marginBottom: '1.5rem', color: '#0f172a', letterSpacing: '-1px' }}>
              Spatial Safety Integration with{' '}
              <span style={{ color: '#db2777' }}>Route Guarding</span>
            </h1>
            <p style={{ color: '#334155', fontSize: '1.15rem', lineHeight: '1.6', marginBottom: '2rem', fontWeight: '500' }}>
              Analyze infrastructure details, lighting parameters, and active tracking variables side-by-side.
            </p>
          </div>

          {/* Right: Auth Card */}
          <div style={{ background: '#fbcfe8', border: '2px solid #f472b6', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', background: '#ffffff', padding: '0.3rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #f472b6' }}>
              <button
                onClick={() => setAuthTab('login')}
                style={{ flex: 1, padding: '0.6rem', border: 'none', background: authTab === 'login' ? '#db2777' : 'transparent', color: authTab === 'login' ? '#ffffff' : '#475569', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}
              >
                Login Gate
              </button>
              <button
                onClick={() => setAuthTab('register')}
                style={{ flex: 1, padding: '0.6rem', border: 'none', background: authTab === 'register' ? '#db2777' : 'transparent', color: authTab === 'register' ? '#ffffff' : '#475569', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}
              >
                Register Gate
              </button>
            </div>
            <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #f472b6' }}>
              {authTab === 'login'
                ? <Login onLoginSuccess={handleLoginSuccess} />
                : <Register />
              }
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;