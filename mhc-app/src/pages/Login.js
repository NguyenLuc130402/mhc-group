import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { login } from '../api/toolsApi';
import { saveAuth } from '../utils/auth';
import { useLang } from '../contexts/LangContext';
import './Auth.css';

export default function Login() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [form,    setForm]    = useState({ email: '', password: '' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(form.email, form.password);
      saveAuth(data.token, data.username);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="auth-logo__mark">MHC</span>
          <span className="auth-logo__sub">Admin</span>
        </div>
        <h1 className="auth-title">{t('login.title')}</h1>
        <p className="auth-sub">{t('login.sub')}</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <Mail size={16} className="auth-field__icon" />
            <input
              className="auth-input"
              type="email"
              placeholder={t('login.email')}
              value={form.email}
              onChange={e => set('email', e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <Lock size={16} className="auth-field__icon" />
            <input
              className="auth-input"
              type="password"
              placeholder={t('login.password')}
              value={form.password}
              onChange={e => set('password', e.target.value)}
              required
            />
          </div>
          <button className="auth-btn" type="submit" disabled={loading}>
            <LogIn size={16} />
            {loading ? t('login.loading') : t('login.btn')}
          </button>
        </form>

        <p className="auth-switch">
          {t('login.noAccount')} <Link to="/register">{t('login.registerLink')}</Link>
        </p>
      </div>
    </div>
  );
}
