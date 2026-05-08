import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Star,
  Plus, Pencil, Trash2, X, Package, FolderOpen, Settings, ArrowRight, CheckCircle2, BarChart3,
  Globe, Database, AlertTriangle, Save, RotateCcw
} from 'lucide-react';
import { CATEGORIES } from '../data/toolsData';
import { fetchTools, deleteTool } from '../api/toolsApi';
import { ToolLogo } from '../components/ToolReviews/ToolReviews';
import { useLang } from '../contexts/LangContext';
import AdminSidebar, { NAV } from './AdminSidebar';
import './Admin.css';

function SettingsPanel({ showToast, t }) {
  const { lang, toggle } = useLang();
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const [siteName, setSiteName] = useState('MHC Group');
  const [pendingLang, setPendingLang] = useState(lang);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleSave = () => {
    if (pendingLang !== lang) toggle();
    showToast(t('settings.saved'), 'success');
  };

  return (
    <div className="adm__settings">
      {/* GENERAL */}
      <div className="adm__settings-section">
        <div className="adm__settings-section-header">
          <Globe size={14} />
          <span>{t('settings.general')}</span>
        </div>
        <div className="adm__settings-body">
          <div className="adm__settings-field">
            <label className="adm__settings-label">{t('settings.siteName')}</label>
            <input className="adm__settings-input" value={siteName} onChange={e => setSiteName(e.target.value)} />
          </div>
          <div className="adm__settings-field">
            <label className="adm__settings-label">{t('settings.apiUrl')}</label>
            <input className="adm__settings-input adm__settings-input--readonly" value={apiUrl} readOnly />
          </div>
          <div className="adm__settings-field">
            <label className="adm__settings-label">{t('settings.defaultLang')}</label>
            <select className="adm__settings-input" value={pendingLang} onChange={e => setPendingLang(e.target.value)}>
              <option value="vi">{t('settings.langVi')}</option>
              <option value="en">{t('settings.langEn')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* DATABASE */}
      <div className="adm__settings-section">
        <div className="adm__settings-section-header">
          <Database size={14} />
          <span>{t('settings.database')}</span>
        </div>
        <div className="adm__settings-body">
          <div className="adm__settings-db-grid">
            <div className="adm__settings-db-item">
              <span className="adm__settings-db-label">{t('settings.dbName')}</span>
              <span className="adm__settings-db-val">MHC-Web</span>
            </div>
            <div className="adm__settings-db-item">
              <span className="adm__settings-db-label">{t('settings.provider')}</span>
              <span className="adm__settings-db-val">MongoDB Atlas</span>
            </div>
            <div className="adm__settings-db-item">
              <span className="adm__settings-db-label">{t('settings.status')}</span>
              <span className="adm__settings-db-status">{t('settings.connected')}</span>
            </div>
            <div className="adm__settings-db-item">
              <span className="adm__settings-db-label">{t('settings.region')}</span>
              <span className="adm__settings-db-val">Asia Pacific</span>
            </div>
          </div>
        </div>
      </div>

      {/* DANGER ZONE */}
      <div className="adm__settings-section adm__settings-section--danger">
        <div className="adm__settings-section-header adm__settings-section-header--danger">
          <AlertTriangle size={14} />
          <span>{t('settings.dangerZone')}</span>
        </div>
        <div className="adm__settings-body adm__settings-danger-row">
          <div>
            <p className="adm__settings-danger-title">{t('settings.resetTitle')}</p>
            <p className="adm__settings-danger-sub">{t('settings.resetSub')}</p>
          </div>
          {confirmReset ? (
            <div className="adm__settings-danger-btns">
              <button className="adm__settings-btn adm__settings-btn--ghost" onClick={() => setConfirmReset(false)}>{t('settings.cancel')}</button>
              <button className="adm__settings-btn adm__settings-btn--danger" onClick={() => { setConfirmReset(false); showToast(t('settings.resetDone'), 'error'); }}>
                <RotateCcw size={13} /> {t('settings.confirm')}
              </button>
            </div>
          ) : (
            <button className="adm__settings-btn adm__settings-btn--danger-outline" onClick={() => setConfirmReset(true)}>
              {t('settings.resetBtn')}
            </button>
          )}
        </div>
      </div>

      <button className="adm__settings-save" onClick={handleSave}>
        <Save size={15} /> {t('settings.save')}
      </button>
    </div>
  );
}

function Confirm({ name, onConfirm, onCancel, t }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onCancel()}>
      <div className="modal modal--sm">
        <div className="modal__header">
          <h2 className="modal__title">{t('admin.confirmTitle')}</h2>
          <button className="modal__close" onClick={onCancel}><X size={16} /></button>
        </div>
        <div className="modal__body">
          <p className="confirm__text">{t('admin.confirmText').replace('{name}', name)}</p>
          <div className="modal__actions">
            <button className="btn-a btn-a--ghost" onClick={onCancel}>{t('admin.cancel')}</button>
            <button className="btn-a btn-a--danger" onClick={onConfirm}><Trash2 size={14} /> {t('admin.delete')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const { t } = useLang();
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
    const tool = tools.find(tl => tl.id === id);
    await deleteTool(id);
    setConfirmId(null);
    loadTools();
    window.dispatchEvent(new Event('mhc_tools_updated'));
    showToast(`${t('admin.deleted')} "${tool?.name}"`, 'error');
  };

  const filtered    = navKey === 'all' ? tools : tools.filter(tl => tl.category === navKey);
  const activeNav   = NAV.find(n => n.key === navKey);
  const confirmTool = tools.find(tl => tl.id === confirmId);

  const totalReviews = tools.reduce((s, tl) => s + tl.reviews, 0);
  const avgRating    = tools.length ? (tools.reduce((s, tl) => s + tl.rating, 0) / tools.length).toFixed(1) : '–';

  return (
    <div className="adm">
      <AdminSidebar activeKey={navKey} onNavChange={setNavKey} />

      <div className="adm__main">
        <header className="adm__topbar">
          <div>
            <h1 className="adm__page-title">{navKey === 'settings' ? 'Settings' : (activeNav?.label ?? 'Dashboard')}</h1>
            <p className="adm__page-sub">{navKey === 'settings' ? 'Cấu hình hệ thống' : t('admin.manage')}</p>
          </div>
          {navKey !== 'settings' && (
            <button className="btn-a btn-a--primary" onClick={() => navigate('/admin/add')}>
              <Plus size={15} /> {t('admin.addTool')}
            </button>
          )}
        </header>

        <div className="adm__stats">
          <div className="adm__stat-card">
            <div className="adm__stat-body">
              <span className="adm__stat-label">{t('admin.totalTools')}</span>
              <span className="adm__stat-value">{tools.length}</span>
            </div>
            <div className="adm__stat-icon adm__stat-icon--blue"><Package size={20} /></div>
          </div>
          <div className="adm__stat-card">
            <div className="adm__stat-body">
              <span className="adm__stat-label">{t('admin.categories')}</span>
              <span className="adm__stat-value">{CATEGORIES.length}</span>
            </div>
            <div className="adm__stat-icon adm__stat-icon--green"><FolderOpen size={20} /></div>
          </div>
          <div className="adm__stat-card">
            <div className="adm__stat-body">
              <span className="adm__stat-label">{t('admin.totalReviews')}</span>
              <span className="adm__stat-value">{(totalReviews / 1000).toFixed(0)}k+</span>
            </div>
            <div className="adm__stat-icon adm__stat-icon--orange"><BarChart3 size={20} /></div>
          </div>
          <div className="adm__stat-card">
            <div className="adm__stat-body">
              <span className="adm__stat-label">{t('admin.avgRating')}</span>
              <span className="adm__stat-value">{avgRating}</span>
            </div>
            <div className="adm__stat-icon adm__stat-icon--yellow"><Star size={20} /></div>
          </div>
        </div>

        {navKey === 'settings' && <SettingsPanel showToast={showToast} t={t} />}

        {navKey !== 'settings' && navKey === 'all' && (
          <div className="adm__mid">
            <div className="adm__quick">
              <span className="adm__section-label">{t('admin.quickActions')}</span>
              {[
                { icon: <Plus size={17} />, label: t('admin.actionAddNew'), action: () => navigate('/admin/add') },
                { icon: <Package size={17} />, label: t('admin.actionManage'), action: () => document.querySelector('.adm__card')?.scrollIntoView({ behavior: 'smooth' }) },
                { icon: <FolderOpen size={17} />, label: t('admin.actionByCategory'), action: () => setNavKey('AI Tool') },
                { icon: <Settings size={17} />, label: t('admin.actionReviewPage'), action: () => navigate('/reviews') },
              ].map((item, i) => (
                <button key={i} className="adm__quick-item" onClick={item.action}>
                  <span className="adm__quick-icon">{item.icon}</span>
                  <span className="adm__quick-label">{item.label}</span>
                  <ArrowRight size={14} className="adm__quick-arrow" />
                </button>
              ))}
            </div>

            <div className="adm__recent">
              <div className="adm__recent-header">
                <span className="adm__section-label">{t('admin.recentProducts')}</span>
                <button className="adm__recent-viewall" onClick={() => document.querySelector('.adm__card')?.scrollIntoView({ behavior: 'smooth' })}>
                  {t('admin.viewAll')}
                </button>
              </div>
              <div className="adm__recent-list">
                {[...tools].reverse().slice(0, 5).map(tool => (
                  <div key={tool.id} className="adm__recent-item" onClick={() => navigate(`/admin/edit/${tool.id}`)}>
                    <ToolLogo tool={tool} size={40} />
                    <div className="adm__recent-info">
                      <span className="adm__recent-name">{tool.name}</span>
                      <span className="adm__recent-meta">{tool.rating} stars · {tool.reviews.toLocaleString()} reviews</span>
                    </div>
                    <span className="adm__recent-badge"><CheckCircle2 size={11} /> {t('admin.published')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {navKey !== 'settings' && <div className="adm__card">
          <div className="adm__card-header">
            <span className="adm__card-title">
              {navKey === 'all' ? t('admin.allTools') : navKey}
              <span className="adm__card-count">{filtered.length}</span>
            </span>
          </div>
          <table className="adm__table">
            <thead>
              <tr>
                <th>{t('admin.colLogo')}</th>
                <th>{t('admin.colName')}</th>
                <th>{t('admin.colCat')}</th>
                <th>{t('admin.colRating')}</th>
                <th>{t('admin.colReviews')}</th>
                <th>{t('admin.colActions')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="adm__empty">{t('admin.empty')}</td></tr>
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
                      <button className="adm__icon-btn adm__icon-btn--edit" onClick={() => navigate(`/admin/edit/${tool.id}`)} title="Edit"><Pencil size={14} /></button>
                      <button className="adm__icon-btn adm__icon-btn--del" onClick={() => setConfirmId(tool.id)} title="Delete"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}
      </div>

      {confirmId && <Confirm name={confirmTool?.name} onConfirm={() => handleDelete(confirmId)} onCancel={() => setConfirmId(null)} t={t} />}
      {toast && <div className={`adm__toast adm__toast--${toast.type}`}>{toast.msg}</div>}
    </div>
  );
}
