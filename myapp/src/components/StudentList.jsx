import React, { useState, useEffect } from 'react';
import API from '../api/axios';

function StudentList() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get('/students'); // ✅ fixed: was '/auth/users'
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        setMessage('❌ Failed to fetch users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9d174d', fontSize: '1rem', fontWeight: '800' }}>
        <i className="fa-solid fa-users"></i> Registered SafeRoute Users
      </h3>

      {loading && <p style={{ color: '#64748b', fontSize: '0.9rem' }}>⏳ Loading users...</p>}
      {message && <p style={{ color: '#dc2626', fontSize: '0.9rem' }}>{message}</p>}

      {!loading && users.length === 0 && (
        <p style={{ color: '#64748b', fontSize: '0.9rem', textAlign: 'center', padding: '1rem' }}>
          No users registered yet inside the node ledger.
        </p>
      )}

      {!loading && users.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: '#fce7f3', borderBottom: '1px solid #f472b6' }}>
              <th style={{ padding: '0.7rem 1rem', textAlign: 'left', color: '#9d174d', fontWeight: '700' }}>#</th>
              <th style={{ padding: '0.7rem 1rem', textAlign: 'left', color: '#9d174d', fontWeight: '700' }}>Username</th>
              <th style={{ padding: '0.7rem 1rem', textAlign: 'left', color: '#9d174d', fontWeight: '700' }}>Registered On</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} style={{ borderBottom: '1px solid #fce7f3' }}>
                <td style={{ padding: '0.7rem 1rem', color: '#475569' }}>{index + 1}</td>
                <td style={{ padding: '0.7rem 1rem', color: '#0f172a', fontWeight: '600' }}>
                  <i className="fa-solid fa-shield-halved" style={{ color: '#db2777', marginRight: '0.4rem' }}></i>
                  {user.username}
                </td>
                <td style={{ padding: '0.7rem 1rem', color: '#475569' }}>
                  {new Date(user.createdAt).toLocaleDateString('en-IN', {
                    day: '2-digit', month: 'short', year: 'numeric'
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentList;