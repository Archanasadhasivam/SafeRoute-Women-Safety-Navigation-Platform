import React from 'react';

function TaskItem({ task, onDelete, onToggleComplete }) {

  // ── Priority config ──────────────────────────────────
  const priorityConfig = {
    low:    { label: '🟢 Low',    className: 'badge-low' },
    medium: { label: '🟡 Medium', className: 'badge-medium' },
    high:   { label: '🔴 High',   className: 'badge-high' },
  };

  const { label, className } = priorityConfig[task.priority] || priorityConfig.medium;

  return (
    <div className={`task-item ${task.completed ? 'task-completed' : ''}`}>

      {/* ── Left: Checkbox + Text ── */}
      <div className="task-item-left">
        <button
          className={`task-check-btn ${task.completed ? 'checked' : ''}`}
          onClick={() => onToggleComplete(task.id)}
          title="Mark complete"
        >
          {task.completed
            ? <i className="fa-solid fa-circle-check"></i>
            : <i className="fa-regular fa-circle"></i>
          }
        </button>

        <div className="task-item-info">
          <p className={`task-item-text ${task.completed ? 'line-through' : ''}`}>
            {task.text}
          </p>
          <span className="task-item-time">
            <i className="fa-solid fa-clock"></i> Added at {task.createdAt}
          </span>
        </div>
      </div>

      {/* ── Right: Priority Badge + Delete ── */}
      <div className="task-item-right">
        <span className={`priority-badge ${className}`}>{label}</span>
        <button
          className="task-delete-btn"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>

    </div>
  );
}

export default TaskItem;
