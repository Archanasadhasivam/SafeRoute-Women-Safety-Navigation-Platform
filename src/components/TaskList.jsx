import React from 'react';

function RegisterGate() {
  return (
    <div style={{
      // The box styling updated to match your theme
      backgroundColor: '#fdf2f8', 
      padding: '2rem',
      borderRadius: '16px',
      border: '1px solid #fbcfe8',
      color: '#831843', // Dark pink text for high contrast
      maxWidth: '400px',
      margin: '2rem auto'
    }}>
      
      {/* Example Form Structure */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="text" placeholder="Enter your full name" style={inputStyle} />
        <input type="tel" placeholder="e.g., +1234567890" style={inputStyle} />
        <input type="text" placeholder="Guardian's phone number" style={inputStyle} />
        <input type="text" placeholder="Enter your username" style={inputStyle} />
        <input type="password" placeholder="Enter password (min 6 char)" style={inputStyle} />
        
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
          <input type="checkbox" />
          Authorize SafeRoute live location monitoring layers
        </label>
        
        <button style={{
          backgroundColor: '#db2777',
          color: 'white',
          padding: '0.75rem',
          borderRadius: '8px',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Register
        </button>
      </div>
    </div>
  );
}

// Reusable input style to keep things clean
const inputStyle = {
  padding: '0.75rem',
  borderRadius: '8px',
  border: '1px solid #fbcfe8',
  backgroundColor: '#ffffff'
};

export default RegisterGate;