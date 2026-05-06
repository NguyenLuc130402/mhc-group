import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { register } from '../api/toolsApi';
import { saveAuth } from '../utils/auth';
import { useLang } from '../contexts/LangContext';
import './Auth.css';

export default function Register() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [form,    setForm]    = useState({ username: '', email: '', password: '', confirm: '' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) return setError(t('register.passwordMismatch'));
    setLoading(true);
    try {
      const data = await register(form.username, form.email, form.password);
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
        <h1 className="auth-title">{t('register.title')}</h1>
        <p className="auth-sub">{t('register.sub')}</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <User size={16} className="auth-field__icon" />
            <input
              className="auth-input"
              type="text"
              placeholder={t('register.username')}
              value={form.username}
              onChange={e => set('username', e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <Mail size={16} className="auth-field__icon" />
            <input
              className="auth-input"
              type="email"
              placeholder={t('register.email')}
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
              placeholder={t('register.password')}
              value={form.password}
              onChange={e => set('password', e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <Lock size={16} className="auth-field__icon" />
            <input
              className="auth-input"
              type="password"
              placeholder={t('register.confirm')}
              value={form.confirm}
              onChange={e => set('confirm', e.target.value)}
              required
            />
          </div>
          <button className="auth-btn" type="submit" disabled={loading}>
            <UserPlus size={16} />
            {loading ? t('register.loading') : t('register.btn')}
          </button>
        </form>

        <p className="auth-switch">
          {t('register.hasAccount')} <Link to="/login">{t('register.loginLink')}</Link>
        </p>
      </div>
    </div>
  );
}
