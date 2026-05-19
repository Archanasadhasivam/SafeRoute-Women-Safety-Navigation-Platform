import React, { useState } from 'react';

function TaskForm({ onAddTask }) {

  // ── Local State ──────────────────────────────────────
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [error, setError] = useState('');

  // ── Form Validation + Submit ─────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (taskText.trim() === '') {
      setError('⚠️ Task cannot be empty!');
      return;
    }
    if (taskText.trim().length < 3) {
      setError('⚠️ Task must be at least 3 characters!');
      return;
    }
    if (taskText.trim().length > 100) {
      setError('⚠️ Task must be under 100 characters!');
      return;
    }

    // Clear error and add task
    setError('');
    onAddTask(taskText.trim(), priority);

    // Reset form fields
    setTaskText('');
    setPriority('medium');
  };

  return (
    <div className="task-form-wrapper">
      <form className="task-form" onSubmit={handleSubmit}>

        {/* ── Task Input ── */}
        <div className="task-input-group">
          <input
            type="text"
            className={`task-input ${error ? 'input-error' : ''}`}
            placeholder="e.g. Check street lighting on route..."
            value={taskText}
            onChange={(e) => {
              setTaskText(e.target.value);
              if (error) setError(''); // clear error on typing
            }}
            maxLength={100}
          />
          <span className="char-count">{taskText.length}/100</span>
        </div>

        {/* ── Priority Selector ── */}
        <div className="priority-group">
          <label className="priority-label">Priority:</label>
          <div className="priority-buttons">
            {['low', 'medium', 'high'].map((level) => (
              <button
                key={level}
                type="button"
                className={`priority-btn priority-${level} ${priority === level ? 'active' : ''}`}
                onClick={() => setPriority(level)}
              >
                {level === 'low'    && '🟢 Low'}
                {level === 'medium' && '🟡 Medium'}
                {level === 'high'   && '🔴 High'}
              </button>
            ))}
          </div>
        </div>

        {/* ── Error Message ── */}
        {error && <p className="form-error">{error}</p>}

        {/* ── Submit Button ── */}
        <button type="submit" className="btn btn-primary task-submit-btn">
          <i className="fa-solid fa-plus"></i> Add Task
        </button>

      </form>
    </div>
  );
}

export default TaskForm;
