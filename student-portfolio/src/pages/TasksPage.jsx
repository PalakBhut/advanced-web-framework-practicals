import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api';

function TasksPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await apiRequest('/tasks');
      setTasks(result.tasks || []);
    } catch (err) {
      if (err.status === 401) {
        localStorage.removeItem('portfolio_token');
        navigate('/login');
        return;
      }
      setError(err.message || 'Unable to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('portfolio_token');
    if (!token) {
      navigate('/login');
      return;
    }

    loadTasks();
  }, [navigate]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCompleted(false);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const payload = { title, description, completed };

    try {
      if (editingId) {
        await apiRequest(`/tasks/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest('/tasks', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }
      resetForm();
      await loadTasks();
    } catch (err) {
      if (err.status === 401) {
        localStorage.removeItem('portfolio_token');
        navigate('/login');
        return;
      }
      setError(err.message || 'Task action failed');
    }
  };

  const handleDelete = async (id) => {
    setError('');
    try {
      await apiRequest(`/tasks/${id}`, { method: 'DELETE' });
      await loadTasks();
    } catch (err) {
      if (err.status === 401) {
        localStorage.removeItem('portfolio_token');
        navigate('/login');
        return;
      }
      setError(err.message || 'Delete failed');
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setTitle(task.title);
    setDescription(task.description || '');
    setCompleted(Boolean(task.completed));
  };

  return (
    <main className="page-content">
      <section className="section">
        <div className="section-heading">
          <span className="section-tag">Tasks</span>
          <h2>Personal task tracker</h2>
          <p>Create, update, complete, and delete tasks stored in your own Express + MongoDB backend.</p>
        </div>

        <form className="glass-card contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="task-title">Task title</label>
            <input id="task-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Enter task title" required />
          </div>

          <div className="form-group">
            <label htmlFor="task-description">Description</label>
            <textarea id="task-description" rows="4" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Add details" />
          </div>

          <div className="form-group">
            <label>
              <input type="checkbox" checked={completed} onChange={(event) => setCompleted(event.target.checked)} />
              Mark as completed
            </label>
          </div>

          {error && <p className="help-text" style={{ color: 'crimson' }}>{error}</p>}

          <div className="form-actions">
            <button type="submit" className="button primary">
              {editingId ? 'Update Task' : 'Add Task'}
            </button>
            {editingId && (
              <button type="button" className="button secondary" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="section" style={{ marginTop: '2rem' }}>
          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p>No tasks yet. Add your first task above.</p>
          ) : (
            <div className="repo-grid">
              {tasks.map((task) => (
                <article className="glass-card repo-card" key={task._id}>
                  <div className="repo-card-head">
                    <div>
                      <p className="repo-name">{task.title}</p>
                      <p className="repo-description">{task.description || 'No description provided.'}</p>
                    </div>
                    <span className="repo-language">{task.completed ? 'Completed' : 'Open'}</span>
                  </div>
                  <div className="repo-metrics">
                    <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="button secondary compact" onClick={() => handleEdit(task)}>
                      Edit
                    </button>
                    <button type="button" className="button primary compact" onClick={() => handleDelete(task._id)}>
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default TasksPage;
