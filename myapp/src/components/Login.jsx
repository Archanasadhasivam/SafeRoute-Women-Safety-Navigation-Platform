import React, { useState } from 'react';
import API from '../api/axios';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!username || !password) {
      setMessage('❌ Username and password are required!');
      setLoading(false);
      return;
    }

    try {
      const response = await API.post('/auth/sign-in', { username, password });
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.data.username);
        
        setMessage('✅ Login successful! Syncing safe-workspace panels...');
        
        setTimeout(() => {
          onLoginSuccess(response.data.data.username);
        }, 800);
      } else {
        setMessage('❌ Invalid response structure returned from security controller.');
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Login connection refused. Verify server status.';
      setMessage('❌ ' + errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      backgroundColor: '#fdf2f8', // Matches your theme
      padding: '1.5rem',
      borderRadius: '12px',
      border: '1px solid #fbcfe8',
      color: '#9d174d'
    }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0 0 0.5rem 0' }}>
        <i className="fa-solid fa-shield-halved"></i> Login to SafeRoute
      </h2>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569' }}>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569' }}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        
        {message && <p style={{ fontSize: '0.85rem', fontWeight: '700', color: '#db2777', margin: 0 }}>{message}</p>}
        
        <button type="submit" disabled={loading} style={{
          backgroundColor: '#db2777',
          color: '#ffffff',
          padding: '0.75rem',
          borderRadius: '8px',
          border: 'none',
          fontWeight: '800',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginTop: '0.5rem'
        }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: '0.6rem',
  borderRadius: '8px',
  border: '1px solid #f472b6',
  backgroundColor: '#ffffff',
  fontSize: '0.9rem',
  outline: 'none'
};

export default Login;