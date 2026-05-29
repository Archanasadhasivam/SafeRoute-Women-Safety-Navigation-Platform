import React, { useState } from 'react';
import API from '../api/axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [locationConsent, setLocationConsent] = useState(true);
  
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!username || !password || !fullName || !phone || !emergencyContact) {
      setMessage('❌ All safety profile registration fields are required!');
      setLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setMessage('❌ Password must be at least 6 characters!');
      setLoading(false);
      return;
    }

    try {
      const response = await API.post('/auth/sign-up', { 
        username, 
        password,
        fullName,
        phone,
        emergencyContact,
        locationConsent
      });

      setMessage('✅ Account created for ' + response.data.data.username + '! You can now login.');
      setUsername('');
      setPassword('');
      setFullName('');
      setPhone('');
      setEmergencyContact('');
      setLocationConsent(true);
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Registration failed. Try again.';
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
        <i className="fa-solid fa-user-plus"></i> Register for SafeRoute
      </h2>
      
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {[
          { label: 'Full Name', val: fullName, set: setFullName, type: 'text', placeholder: 'Enter your full name' },
          { label: 'Your Phone Number', val: phone, set: setPhone, type: 'tel', placeholder: '+1234567890' },
          { label: 'Guardian Phone', val: emergencyContact, set: setEmergencyContact, type: 'tel', placeholder: "Guardian's phone number" },
          { label: 'Username', val: username, set: setUsername, type: 'text', placeholder: 'Enter your username' },
          { label: 'Password', val: password, set: setPassword, type: 'password', placeholder: 'Min 6 chars' }
        ].map((field, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569' }}>{field.label}</label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={field.val}
              onChange={(e) => field.set(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
        ))}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
          <input
            type="checkbox"
            checked={locationConsent}
            onChange={(e) => setLocationConsent(e.target.checked)}
            style={{ cursor: 'pointer' }}
          />
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#475569' }}>
            Authorize SafeRoute live location monitoring
          </label>
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
          {loading ? 'Registering...' : 'Register'}
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

export default Register;