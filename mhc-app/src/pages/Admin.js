import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Star, Cpu, Users, Grid, Megaphone, Search,
  Plus, Pencil, Trash2, X, LogOut, ChevronRight
} from 'lucide-react';
import { CATEGORIES } from '../data/toolsData';
import { fetchTools, deleteTool } from '../api/toolsApi';
import { ToolLogo } from '../components/ToolReviews/ToolReviews';
import { clearAuth, getUser } from '../utils/auth';
import './Admin.css';

const NAV = [
  { label: 'Dashboard',      icon: <LayoutDashboard size={16} />, key: 'all' },
  { label: 'AI Tool',        icon: <Cpu size={16} />,             key: 'AI Tool' },
  { label: 'CRM Tool',       icon: <Users size={16} />,           key: 'CRM Tool' },
  { label: 'SaaS Platforms', icon: <Grid size={16} />,            key: 'SaaS Platforms' },
  { label: 'Marketing Tool', icon: <Megaphone size={16} />,       key: 'Marketing Tool' },
  { label: 'SEO Tool',       icon: <Search size={16} />,          key: 'SEO Tool' },
];

function Confirm({ name, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onCancel()}>
      <div className="modal modal--sm">
        <div className="modal__header">
          <h2 className="modal__title">Xác nhận xóa</h2>
          <button className="modal__close" onClick={onCancel}><X size={16} /></button>
        </div>
        <div className="modal__body">
          <p className="confirm__text">Bạn có chắc muốn xóa <strong>{name}</strong>? Hành động này không thể hoàn tác.</p>
          <div className="modal__actions">
            <button className="btn-a btn-a--ghost" onClick={onCancel}>Hủy</button>
            <button className="btn-a btn-a--danger" onClick={onConfirm}><Trash2 size={14} /> Xóa</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const navigate = useNavigate();
  const [tools, setTools]         = useState([]);
  const [navKey, setNavKey]       = useState('all');
  const [confirmId, setConfirmId] = useState(null);
  const [toast, setToast]         = useState(null);

  const loadTools = () => fetchTools().then(setTools).catch(console.error);

  useEffect(() => {
    loadTools();
    window.addEventListener('mhc_tools_updated', loadTools);
    return () => window.removeEventListener('mhc_tools_updated', loadTools);
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const handleDelete = async (id) => {
    const t = tools.find(t => t.id === id);
    await deleteTool(id);
    setConfirmId(null);
    loadTools();
    window.dispatchEvent(new Event('mhc_tools_updated'));
    showToast(`Đã xóa "${t?.name}"`, 'error');
  };

  const filtered    = navKey === 'all' ? tools : tools.filter(t => t.category === navKey);
  const activeNav   = NAV.find(n => n.key === navKey);
  const confirmTool = tools.find(t => t.id === confirmId);

  const totalReviews = tools.reduce((s, t) => s + t.reviews, 0);
  const avgRating    = tools.length ? (tools.reduce((s, t) => s + t.rating, 0) / tools.length).toFixed(1) : '–';

  return (
    <div className="adm">
      <aside className="adm__sidebar">
        <div className="adm__logo">
          <span className="adm__logo-mark">MHC</span>
          <span className="adm__logo-sub">Admin</span>
        </div>

        <nav className="adm__nav">
          <span className="adm__nav-label">MENU</span>
          {NAV.map(n => (
            <button
              key={n.key}
              className={`adm__nav-item${navKey === n.key ? ' adm__nav-item--active' : ''}`}
              onClick={() => setNavKey(n.key)}
            >
              <span className="adm__nav-icon">{n.icon}</span>
              <span>{n.label}</span>
              {navKey === n.key && <ChevronRight size={13} className="adm__nav-arrow" />}
            </button>
          ))}
        </nav>

        <div className="adm__user">
          <span className="adm__username">{getUser()}</span>
        </div>
        <div className="adm__sidebar-footer">
          <button className="adm__logout" onClick={() => navigate('/')}>
            <LogOut size={15} /> Trang chủ
          </button>
          <button className="adm__logout adm__logout--danger" onClick={() => { clearAuth(); navigate('/login'); }}>
            <LogOut size={15} /> Đăng xuất
          </button>
        </div>
      </aside>

      <div className="adm__main">
        <header className="adm__topbar">
          <div>
            <h1 className="adm__page-title">{activeNav?.label ?? 'Dashboard'}</h1>
            <p className="adm__page-sub">Quản lý danh sách tool reviews</p>
          </div>
          <button className="btn-a btn-a--primary" onClick={() => navigate('/admin/add')}>
            <Plus size={15} /> Thêm tool
          </button>
        </header>

        <div className="adm__stats">
          <div className="adm__stat-card">
            <span className="adm__stat-label">Tổng tool</span>
            <span className="adm__stat-value">{tools.length}</span>
          </div>
          <div className="adm__stat-card">
            <span className="adm__stat-label">Danh mục</span>
            <span className="adm__stat-value">{CATEGORIES.length}</span>
          </div>
          <div className="adm__stat-card">
            <span className="adm__stat-label">Tổng đánh giá</span>
            <span className="adm__stat-value">{(totalReviews / 1000).toFixed(0)}k+</span>
          </div>
          <div className="adm__stat-card">
            <span className="adm__stat-label">Rating TB</span>
            <span className="adm__stat-value adm__stat-value--accent">{avgRating} <Star size={16} fill="#f59e0b" color="#f59e0b" /></span>
          </div>
        </div>

        <div className="adm__card">
          <div className="adm__card-header">
            <span className="adm__card-title">
              {navKey === 'all' ? 'Tất cả tool' : navKey}
              <span className="adm__card-count">{filtered.length}</span>
            </span>
          </div>
          <table className="adm__table">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Tên tool</th>
                <th>Danh mục</th>
                <th>Rating</th>
                <th>Lượt đánh giá</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="adm__empty">Chưa có tool nào trong danh mục này.</td></tr>
              )}
              {filtered.map(tool => (
                <tr key={tool.id}>
                  <td><ToolLogo tool={tool} size={40} /></td>
                  <td className="adm__cell-name">{tool.name}</td>
                  <td><span className="adm__badge">{tool.category}</span></td>
                  <td>
                    <div className="adm__rating">
                      <div className="adm__stars">
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} size={12} fill={i <= Math.round(tool.rating) ? '#f59e0b' : 'none'} color={i <= Math.round(tool.rating) ? '#f59e0b' : '#d1d5db'} />
                        ))}
                      </div>
                      <span className="adm__rating-num">{tool.rating}</span>
                    </div>
                  </td>
                  <td className="adm__cell-muted">{tool.reviews.toLocaleString()}</td>
                  <td>
                    <div className="adm__row-actions">
                      <button className="adm__icon-btn adm__icon-btn--edit" onClick={() => navigate(`/admin/edit/${tool.id}`)} title="Sửa"><Pencil size={14} /></button>
                      <button className="adm__icon-btn adm__icon-btn--del" onClick={() => setConfirmId(tool.id)} title="Xóa"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {confirmId && <Confirm name={confirmTool?.name} onConfirm={() => handleDelete(confirmId)} onCancel={() => setConfirmId(null)} />}
      {toast && <div className={`adm__toast adm__toast--${toast.type}`}>{toast.msg}</div>}
    </div>
  );
}
