import React, { useState, useEffect } from 'react';

function Header() {

  // useEffect – shows live task count label update in real time
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Set time immediately on mount
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }));
    };

    updateTime();

    // Update every minute
    const interval = setInterval(updateTime, 60000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="task-header">
      <div className="task-header-left">
        <h2 className="task-section-title">
          <i className="fa-solid fa-list-check"></i> Safety Task Manager
        </h2>
        <p className="task-section-sub">
          Manage your safety checklist before every commute
        </p>
      </div>
      <div className="task-header-right">
        <span className="task-time-badge">
          <i className="fa-solid fa-clock"></i> {currentTime}
        </span>
      </div>
    </div>
  );
}

export default Header;
