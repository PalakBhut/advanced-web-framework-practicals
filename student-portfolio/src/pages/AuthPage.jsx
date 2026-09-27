import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api';

function AuthPage() {
  const navigate = useNavigate();
  const isRegister = window.location.pathname === '/register';
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const result = await apiRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify(form),
      });

      if (result.token) {
        localStorage.setItem('portfolio_token', result.token);
      }

      navigate('/tasks');
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-content">
      <section className="section">
        <div className="section-heading">
          <span className="section-tag">{isRegister ? 'Register' : 'Login'}</span>
          <h2>{isRegister ? 'Create your account' : 'Welcome back'}</h2>
          <p>{isRegister ? 'Register to manage your tasks.' : 'Log in to access your task board.'}</p>
        </div>

        <form className="glass-card contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="At least 6 characters" minLength="6" required />
          </div>

          {error && <p className="help-text" style={{ color: 'crimson' }}>{error}</p>}

          <div className="form-actions">
            <button type="submit" className="button primary" disabled={loading}>
              {loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default AuthPage;
