import React from 'react';

function TaskItem({ task, onDelete, onToggleComplete }) {
  // Extract correct MongoDB or Frontend Unique Identifier safely
  const taskId = task._id || task.id;

  // ── Priority config (Supports capitalized keys from App.jsx securely) ──
  const priorityConfig = {
    low:    { label: '🟢 Low',    color: '#2563eb', bg: '#eff6ff' },
    medium: { label: '🟡 Medium', color: '#d97706', bg: '#fef3c7' },
    high:   { label: '🔴 High',   color: '#dc2626', bg: '#fee2e2' },
    Low:    { label: '🟢 Low',    color: '#2563eb', bg: '#eff6ff' },
    Medium: { label: '🟡 Medium', color: '#d97706', bg: '#fef3c7' },
    High:   { label: '🔴 High',   color: '#dc2626', bg: '#fee2e2' },
  };

  const currentPriority = priorityConfig[task.priority] || priorityConfig.Medium;

  // ── Clean ISO Timestamp Formatting Fallback ──
  const formatTime = (timeString) => {
    if (!timeString) return 'Just now';
    try {
      const date = new Date(timeString);
      // Returns format like "11:49 pm" to match your UI mockup styling
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();
    } catch (e) {
      return timeString;
    }
  };

  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#fff5f7', // Beautiful soft pink row card element
        border: '1px solid #fbcfe8',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.01)',
        opacity: task.completed ? 0.7 : 1,
        transition: 'all 0.2s ease-in-out',
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: '0.75rem' // Added clean separation between database list nodes
      }}
    >

      {/* ── Left: Checkbox + Text ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
        <button
          onClick={() => onToggleComplete(taskId)} // Fixed: Sends live database _id
          style={{
            background: 'none',
            border: 'none',
            color: task.completed ? '#db2777' : '#94a3b8',
            cursor: 'pointer',
            fontSize: '1.25rem',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s'
          }}
          title="Mark complete"
        >
          {task.completed
            ? <i className="fa-solid fa-circle-check"></i>
            : <i className="fa-regular fa-circle"></i>
          }
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <p 
            style={{
              margin: 0,
              fontSize: '0.95rem',
              fontWeight: '700',
              color: '#0f172a', // Clean charcoal text instead of invisible blue-dark
              textDecoration: task.completed ? 'line-through' : 'none',
              opacity: task.completed ? 0.5 : 1,
              lineHeight: '1.4'
            }}
          >
            {task.text}
          </p>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <i className="fa-solid fa-clock" style={{ color: '#db2777' }}></i> Added at {formatTime(task.createdAt)}
          </span>
        </div>
      </div>

      {/* ── Right: Priority Badge + Delete ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span 
          style={{
            fontSize: '0.75rem',
            fontWeight: '700',
            padding: '0.3rem 0.6rem',
            borderRadius: '6px',
            backgroundColor: currentPriority.bg,
            color: currentPriority.color,
            border: `1px solid ${currentPriority.color}`,
            whiteSpace: 'nowrap'
          }}
        >
          {currentPriority.label}
        </span>
        
        <button
          onClick={() => onDelete(taskId)} // Fixed: Sends live database _id
          style={{
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            fontSize: '1rem',
            padding: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.15s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#dc2626'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
          title="Delete task"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>

    </div>
  );
}

export default TaskItem;