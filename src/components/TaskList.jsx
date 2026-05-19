 
import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onToggleComplete }) {

  // ── Filter counts ────────────────────────────────────
  const totalTasks     = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks   = totalTasks - completedTasks;

  // ── Empty State ──────────────────────────────────────
  if (totalTasks === 0) {
    return (
      <div className="task-empty">
        <i className="fa-solid fa-shield-halved"></i>
        <h3>No tasks yet</h3>
        <p>Add your first safety checklist item above!</p>
      </div>
    );
  }

  return (
    <div className="task-list-wrapper">

      {/* ── Stats Bar ── */}
      <div className="task-stats">
        <div className="stat-box">
          <span className="stat-number">{totalTasks}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-box stat-pending">
          <span className="stat-number">{pendingTasks}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-box stat-done">
          <span className="stat-number">{completedTasks}</span>
          <span className="stat-label">Completed</span>
        </div>

        {/* ── Progress Bar ── */}
        <div className="task-progress">
          <div
            className="task-progress-fill"
            style={{ width: totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : '0%' }}
          ></div>
        </div>
      </div>

      {/* ── Task Items — rendered using map() ── */}
      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>

    </div>
  );
}

export default TaskList;
