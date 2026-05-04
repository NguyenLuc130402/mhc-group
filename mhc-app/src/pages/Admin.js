import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, ArrowLeft, Star, X, Check } from 'lucide-react';
import { CATEGORIES, getTools, saveTools, generateId } from '../data/toolsData';
import { ToolLogo } from '../components/ToolReviews/ToolReviews';
import './Admin.css';

const EMPTY_FORM = {
  name: '',
  category: CATEGORIES[0],
  rating: 4.5,
  reviews: 1000,
  logoBg: '#f0f4ff',
  logoFill: '#4285F4',
  logoText: '',
  logoShape: 'rounded',
  logoBgFill: '',
};

function StarPicker({ value, onChange }) {
  return (
    <div className="star-picker">
      {[1, 2, 3, 4, 5].map(i => (
        <button key={i} type="button" onClick={() => onChange(i)} className={`star-picker__btn${i <= value ? ' star-picker__btn--on' : ''}`}>
          <Star size={20} fill={i <= value ? '#f59e0b' : 'none'} color={i <= value ? '#f59e0b' : '#d1d5db'} />
        </button>
      ))}
      <span className="star-picker__val">{Number(value).toFixed(1)}</span>
    </div>
  );
}

function Modal({ tool, onClose, onSave }) {
  const [form, setForm] = useState(tool || EMPTY_FORM);
  const isEdit = !!tool?.id;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.logoText.trim()) return;
    onSave({
      ...form,
      id: isEdit ? form.id : generateId(),
      rating: parseFloat(form.rating),
      reviews: parseInt(form.reviews, 10) || 0,
    });
  };

  const preview = { ...form, rating: parseFloat(form.rating) || 0 };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">{isEdit ? 'Sửa tool' : 'Thêm tool mới'}</h2>
          <button className="modal__close" onClick={onClose}><X size={18} /></button>
        </div>

        <form className="modal__body" onSubmit={handleSubmit}>
          <div className="modal__preview">
            <ToolLogo tool={preview} size={72} />
            <div>
              <p className="modal__preview-name">{form.name || 'Tên tool'}</p>
              <p className="modal__preview-cat">{form.category}</p>
            </div>
          </div>

          <div className="modal__grid">
            <div className="field">
              <label className="field__label">Tên tool *</label>
              <input className="field__input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="VD: ChatGPT" required />
            </div>

            <div className="field">
              <label className="field__label">Danh mục *</label>
              <select className="field__input" value={form.category} onChange={e => set('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div className="field">
              <label className="field__label">Chữ logo * (2-4 ký tự)</label>
              <input className="field__input" value={form.logoText} onChange={e => set('logoText', e.target.value.toUpperCase().slice(0, 4))} placeholder="VD: GPT" required maxLength={4} />
            </div>

            <div className="field">
              <label className="field__label">Số lượt đánh giá</label>
              <input className="field__input" type="number" min={0} value={form.reviews} onChange={e => set('reviews', e.target.value)} />
            </div>

            <div className="field">
              <label className="field__label">Màu nền logo</label>
              <div className="field__color-row">
                <input type="color" className="field__color" value={form.logoBg} onChange={e => set('logoBg', e.target.value)} />
                <span className="field__color-val">{form.logoBg}</span>
              </div>
            </div>

            <div className="field">
              <label className="field__label">Màu chữ logo</label>
              <div className="field__color-row">
                <input type="color" className="field__color" value={form.logoFill} onChange={e => set('logoFill', e.target.value)} />
                <span className="field__color-val">{form.logoFill}</span>
              </div>
            </div>

            <div className="field">
              <label className="field__label">Màu fill logo (tùy chọn)</label>
              <div className="field__color-row">
                <input type="color" className="field__color" value={form.logoBgFill || '#ffffff'} onChange={e => set('logoBgFill', e.target.value)} />
                <span className="field__color-val">{form.logoBgFill || 'Không dùng'}</span>
                {form.logoBgFill && <button type="button" className="field__color-clear" onClick={() => set('logoBgFill', '')}>Xóa</button>}
              </div>
            </div>

            <div className="field">
              <label className="field__label">Hình dạng logo</label>
              <div className="field__radio-row">
                {['rounded', 'circle'].map(s => (
                  <label key={s} className="field__radio">
                    <input type="radio" name="logoShape" value={s} checked={form.logoShape === s} onChange={() => set('logoShape', s)} />
                    {s === 'rounded' ? 'Bo góc' : 'Tròn'}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="field">
            <label className="field__label">Đánh giá</label>
            <StarPicker value={parseFloat(form.rating)} onChange={v => set('rating', v)} />
          </div>

          <div className="modal__actions">
            <button type="button" className="btn-admin btn-admin--ghost" onClick={onClose}>Hủy</button>
            <button type="submit" className="btn-admin btn-admin--primary">
              <Check size={15} /> {isEdit ? 'Lưu thay đổi' : 'Thêm tool'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ConfirmDialog({ name, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onCancel()}>
      <div className="modal modal--sm">
        <div className="modal__header">
          <h2 className="modal__title">Xác nhận xóa</h2>
          <button className="modal__close" onClick={onCancel}><X size={18} /></button>
        </div>
        <div className="modal__body">
          <p className="confirm__text">Bạn có chắc muốn xóa <strong>{name}</strong>?</p>
          <div className="modal__actions">
            <button className="btn-admin btn-admin--ghost" onClick={onCancel}>Hủy</button>
            <button className="btn-admin btn-admin--danger" onClick={onConfirm}>
              <Trash2 size={15} /> Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [tools, setTools]         = useState([]);
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);
  const [modal, setModal]         = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [toast, setToast]         = useState(null);

  useEffect(() => {
    setTools(getTools());
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const persist = (updated) => {
    saveTools(updated);
    setTools(updated);
    window.dispatchEvent(new Event('mhc_tools_updated'));
  };

  const handleSave = (data) => {
    const exists = tools.find(t => t.id === data.id);
    const updated = exists
      ? tools.map(t => t.id === data.id ? data : t)
      : [...tools, data];
    persist(updated);
    setModal(null);
    showToast(exists ? `Đã cập nhật "${data.name}"` : `Đã thêm "${data.name}"`);
  };

  const handleDelete = (id) => {
    const tool = tools.find(t => t.id === id);
    persist(tools.filter(t => t.id !== id));
    setConfirmId(null);
    showToast(`Đã xóa "${tool?.name}"`, 'error');
  };

  const filtered = tools.filter(t => t.category === activeTab);
  const confirmTool = tools.find(t => t.id === confirmId);

  return (
    <div className="admin">
      {/* Top bar */}
      <header className="admin__topbar">
        <a href="#" className="admin__back" onClick={() => { window.location.hash = ''; }}>
          <ArrowLeft size={16} /> Về trang chủ
        </a>
        <span className="admin__brand">MHC Admin</span>
        <span className="admin__subtitle">Quản lý Tool Reviews</span>
      </header>

      <main className="admin__main container">
        {/* Category tabs */}
        <div className="admin__tabs">
          {CATEGORIES.map(cat => {
            const count = tools.filter(t => t.category === cat).length;
            return (
              <button
                key={cat}
                className={`admin__tab${activeTab === cat ? ' admin__tab--active' : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
                <span className="admin__tab-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Table header */}
        <div className="admin__table-header">
          <h3 className="admin__table-title">{activeTab} <span>({filtered.length} tool)</span></h3>
          <button className="btn-admin btn-admin--primary" onClick={() => setModal({ category: activeTab })}>
            <Plus size={15} /> Thêm tool
          </button>
        </div>

        {/* Table */}
        <div className="admin__table-wrap">
          <table className="admin__table">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Tên</th>
                <th>Danh mục</th>
                <th>Đánh giá</th>
                <th>Lượt review</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="admin__empty">Chưa có tool nào. Thêm mới ngay!</td></tr>
              )}
              {filtered.map(tool => (
                <tr key={tool.id}>
                  <td><ToolLogo tool={tool} size={44} /></td>
                  <td className="admin__cell-name">{tool.name}</td>
                  <td><span className="admin__badge">{tool.category}</span></td>
                  <td>
                    <div className="admin__stars">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} size={13} fill={i <= Math.round(tool.rating) ? '#f59e0b' : 'none'} color={i <= Math.round(tool.rating) ? '#f59e0b' : '#d1d5db'} />
                      ))}
                      <span className="admin__rating-num">{tool.rating}</span>
                    </div>
                  </td>
                  <td className="admin__cell-reviews">{tool.reviews.toLocaleString()}</td>
                  <td>
                    <div className="admin__actions">
                      <button className="admin__btn-icon admin__btn-icon--edit" onClick={() => setModal(tool)} title="Sửa">
                        <Pencil size={15} />
                      </button>
                      <button className="admin__btn-icon admin__btn-icon--delete" onClick={() => setConfirmId(tool.id)} title="Xóa">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {modal && <Modal tool={modal?.id ? modal : { ...EMPTY_FORM, ...modal }} onClose={() => setModal(null)} onSave={handleSave} />}
      {confirmId && <ConfirmDialog name={confirmTool?.name} onConfirm={() => handleDelete(confirmId)} onCancel={() => setConfirmId(null)} />}

      {toast && (
        <div className={`admin__toast admin__toast--${toast.type}`}>{toast.msg}</div>
      )}
    </div>
  );
}
