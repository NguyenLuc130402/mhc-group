import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { register } from '../api/toolsApi';
import { saveAuth } from '../utils/auth';
import './Auth.css';

export default function Register() {
  const navigate = useNavigate();
  const [form,    setForm]    = useState({ username: '', email: '', password: '', confirm: '' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) return setError('Mật khẩu xác nhận không khớp');
    setLoading(true);
    try {
      const data = await register(form.username, form.email, form.password);
      saveAuth(data.token, data.username);
      //console.log(saveAuth)
      navigate('/admin');
    } catch (err) {
      setError(err.message);
      //console.log(error)
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
        <h1 className="auth-title">Tạo tài khoản</h1>
        <p className="auth-sub">Đăng ký để quản lý tool reviews của MHC Group.</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <User size={16} className="auth-field__icon" />
            <input
              className="auth-input"
              type="text"
              placeholder="Username"
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
              placeholder="Email"
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
              placeholder="Mật khẩu (ít nhất 6 ký tự)"
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
              placeholder="Xác nhận mật khẩu"
              value={form.confirm}
              onChange={e => set('confirm', e.target.value)}
              required
            />
          </div>
          <button className="auth-btn" type="submit" disabled={loading}>
            <UserPlus size={16} />
            {loading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
          </button>
        </form>

        <p className="auth-switch">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}
