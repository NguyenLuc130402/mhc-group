import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Star, Check, GripVertical } from 'lucide-react';
import { CATEGORIES, generateId } from '../data/toolsData';
import { getEmptyDetail } from '../data/toolsDetail';
import { fetchTools, createTool, updateTool, fetchToolDetail, saveToolDetail } from '../api/toolsApi';
import { ToolLogo } from '../components/ToolReviews/ToolReviews';
import './AdminToolForm.css';

function Field({ label, required, hint, children }) {
  return (
    <div className="af-field">
      <label className="af-field__label">
        {label}{required && <span className="af-field__req">*</span>}
        {hint && <span className="af-field__hint">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = 'text', ...rest }) {
  return <input className="af-input" type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} {...rest} />;
}

function Textarea({ value, onChange, placeholder, rows = 4 }) {
  return <textarea className="af-textarea" rows={rows} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />;
}

function StarPicker({ value, onChange }) {
  return (
    <div className="af-stars">
      {[1,2,3,4,5].map(i => (
        <button key={i} type="button" onClick={() => onChange(i)}>
          <Star size={20} fill={i <= value ? '#f59e0b' : 'none'} color={i <= value ? '#f59e0b' : '#d1d5db'} />
        </button>
      ))}
      <span className="af-stars__val">{Number(value).toFixed(1)}</span>
    </div>
  );
}

function StringList({ items, onChange, placeholder }) {
  const set = (i, v) => { const n = [...items]; n[i] = v; onChange(n); };
  const add  = ()    => onChange([...items, '']);
  const del  = (i)   => onChange(items.filter((_, idx) => idx !== i));
  return (
    <div className="af-list">
      {items.map((item, i) => (
        <div key={i} className="af-list__row">
          <GripVertical size={14} className="af-list__grip" />
          <input className="af-input af-input--flex" value={item} onChange={e => set(i, e.target.value)} placeholder={placeholder} />
          {items.length > 1 && (
            <button type="button" className="af-list__del" onClick={() => del(i)}><Trash2 size={14} /></button>
          )}
        </div>
      ))}
      <button type="button" className="af-list__add" onClick={add}><Plus size={13} /> Thêm</button>
    </div>
  );
}

function FeatureList({ items, onChange }) {
  const set = (i, k, v) => { const n = [...items]; n[i] = { ...n[i], [k]: v }; onChange(n); };
  const add  = () => onChange([...items, { title: '', desc: '' }]);
  const del  = (i) => onChange(items.filter((_, idx) => idx !== i));
  return (
    <div className="af-list">
      {items.map((item, i) => (
        <div key={i} className="af-feature-block">
          <div className="af-feature-block__header">
            <span className="af-feature-block__num">#{i + 1}</span>
            {items.length > 1 && (
              <button type="button" className="af-list__del" onClick={() => del(i)}><Trash2 size={14} /></button>
            )}
          </div>
          <input className="af-input" value={item.title} onChange={e => set(i, 'title', e.target.value)} placeholder="Tên tính năng..." />
          <textarea className="af-textarea" rows={2} value={item.desc} onChange={e => set(i, 'desc', e.target.value)} placeholder="Mô tả tính năng..." />
        </div>
      ))}
      <button type="button" className="af-list__add" onClick={add}><Plus size={13} /> Thêm tính năng</button>
    </div>
  );
}

function FAQList({ items, onChange }) {
  const set = (i, k, v) => { const n = [...items]; n[i] = { ...n[i], [k]: v }; onChange(n); };
  const add  = () => onChange([...items, { q: '', a: '' }]);
  const del  = (i) => onChange(items.filter((_, idx) => idx !== i));
  return (
    <div className="af-list">
      {items.map((item, i) => (
        <div key={i} className="af-feature-block">
          <div className="af-feature-block__header">
            <span className="af-feature-block__num">FAQ #{i + 1}</span>
            {items.length > 1 && (
              <button type="button" className="af-list__del" onClick={() => del(i)}><Trash2 size={14} /></button>
            )}
          </div>
          <input className="af-input" value={item.q} onChange={e => set(i, 'q', e.target.value)} placeholder="Câu hỏi..." />
          <textarea className="af-textarea" rows={2} value={item.a} onChange={e => set(i, 'a', e.target.value)} placeholder="Câu trả lời..." />
        </div>
      ))}
      <button type="button" className="af-list__add" onClick={add}><Plus size={13} /> Thêm FAQ</button>
    </div>
  );
}

function ReviewList({ items, onChange }) {
  const set = (i, k, v) => { const n = [...items]; n[i] = { ...n[i], [k]: v }; onChange(n); };
  const add  = () => onChange([...items, { name: '', role: '', rating: 5, comment: '', date: '' }]);
  const del  = (i) => onChange(items.filter((_, idx) => idx !== i));
  return (
    <div className="af-list">
      {items.map((item, i) => (
        <div key={i} className="af-feature-block">
          <div className="af-feature-block__header">
            <span className="af-feature-block__num">Review #{i + 1}</span>
            {items.length > 1 && (
              <button type="button" className="af-list__del" onClick={() => del(i)}><Trash2 size={14} /></button>
            )}
          </div>
          <div className="af-review-grid">
            <input className="af-input" value={item.name} onChange={e => set(i, 'name', e.target.value)} placeholder="Tên người dùng" />
            <input className="af-input" value={item.role} onChange={e => set(i, 'role', e.target.value)} placeholder="Chức danh / Công ty" />
            <input className="af-input" value={item.date} onChange={e => set(i, 'date', e.target.value)} placeholder="VD: Tháng 4, 2025" />
            <StarPicker value={item.rating} onChange={v => set(i, 'rating', v)} />
          </div>
          <textarea className="af-textarea" rows={2} value={item.comment} onChange={e => set(i, 'comment', e.target.value)} placeholder="Nhận xét của người dùng..." />
        </div>
      ))}
      <button type="button" className="af-list__add" onClick={add}><Plus size={13} /> Thêm review</button>
    </div>
  );
}

const DEFAULT_BASIC = {
  name: '', category: CATEGORIES[0], rating: 4.5, reviews: 1000,
  logoBg: '#f0f4ff', logoFill: '#4285F4', logoText: '', logoShape: 'rounded', logoBgFill: '',
};

export default function AdminToolForm() {
  const navigate = useNavigate();
  const { id: toolId } = useParams();
  const isEdit = !!toolId;

  const [basic,   setBasic]   = useState(DEFAULT_BASIC);
  const [detail,  setDetail]  = useState(getEmptyDetail());
  const [loading, setLoading] = useState(isEdit);
  const [saving,  setSaving]  = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    Promise.all([fetchTools(), fetchToolDetail(toolId)])
      .then(([tools, det]) => {
        const tool = tools.find(t => t.id === toolId);
        if (tool) setBasic(tool);
        setDetail({
          tagline:     det.tagline     || '',
          website:     det.website     || '',
          pricing:     det.pricing     || '',
          founded:     det.founded     || '',
          description: det.description || '',
          pros:        det.pros?.length        ? det.pros        : [''],
          cons:        det.cons?.length        ? det.cons        : [''],
          features:    det.features?.length    ? det.features    : [{ title: '', desc: '' }],
          faqs:        det.faqs?.length        ? det.faqs        : [{ q: '', a: '' }],
          userReviews: det.userReviews?.length ? det.userReviews : [{ name: '', role: '', rating: 5, comment: '', date: '' }],
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [toolId, isEdit]);

  const setB = (k, v) => setBasic(p => ({ ...p, [k]: v }));
  const setD = (k, v) => setDetail(p => ({ ...p, [k]: v }));

  const handleSave = async (e) => {
    e.preventDefault();
    if (!basic.name.trim() || !basic.logoText.trim()) return;
    setSaving(true);
    try {
      const toolData = { ...basic, rating: parseFloat(basic.rating), reviews: parseInt(basic.reviews, 10) || 0 };
      let id = toolId;
      if (isEdit) {
        await updateTool(id, toolData);
      } else {
        id = generateId();
        await createTool({ ...toolData, id });
      }
      await saveToolDetail(id, detail);
      window.dispatchEvent(new Event('mhc_tools_updated'));
      navigate('/admin');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: '120px 24px', textAlign: 'center', color: '#6b7280' }}>Đang tải...</div>;

  return (
    <div className="af-page">
      <header className="af-topbar">
        <button className="af-back" onClick={() => navigate('/admin')}>
          <ArrowLeft size={15} /> Quay lại
        </button>
        <div className="af-topbar__center">
          <span className="af-topbar__brand">MHC Admin</span>
          <span className="af-topbar__sep">/</span>
          <span className="af-topbar__title">{isEdit ? `Sửa: ${basic.name}` : 'Thêm tool mới'}</span>
        </div>
        <button type="submit" form="tool-form" className="af-btn af-btn--primary" disabled={saving}>
          <Check size={14} /> {saving ? 'Đang lưu...' : isEdit ? 'Lưu thay đổi' : 'Đăng tool'}
        </button>
      </header>

      <form id="tool-form" className="af-layout container" onSubmit={handleSave}>
        <div className="af-left">
          <div className="af-card">
            <h2 className="af-card__title">Thông tin cơ bản</h2>
            <Field label="Tên tool" required>
              <Input value={basic.name} onChange={v => setB('name', v)} placeholder="VD: ChatGPT" />
            </Field>
            <Field label="Tagline ngắn">
              <Input value={detail.tagline} onChange={v => setD('tagline', v)} placeholder="VD: Trợ lý AI mạnh mẽ nhất thế giới" />
            </Field>
            <Field label="Mô tả chi tiết">
              <Textarea rows={5} value={detail.description} onChange={v => setD('description', v)} placeholder="Mô tả tổng quan về tool này..." />
            </Field>
          </div>

          <div className="af-card">
            <h2 className="af-card__title">Ưu & Nhược điểm</h2>
            <div className="af-two-col">
              <Field label="Ưu điểm">
                <StringList items={detail.pros} onChange={v => setD('pros', v)} placeholder="Nhập ưu điểm..." />
              </Field>
              <Field label="Nhược điểm">
                <StringList items={detail.cons} onChange={v => setD('cons', v)} placeholder="Nhập nhược điểm..." />
              </Field>
            </div>
          </div>

          <div className="af-card">
            <h2 className="af-card__title">Tính năng nổi bật</h2>
            <FeatureList items={detail.features} onChange={v => setD('features', v)} />
          </div>

          <div className="af-card">
            <h2 className="af-card__title">Câu hỏi thường gặp (FAQ)</h2>
            <FAQList items={detail.faqs} onChange={v => setD('faqs', v)} />
          </div>

          <div className="af-card">
            <h2 className="af-card__title">Đánh giá từ người dùng</h2>
            <ReviewList items={detail.userReviews} onChange={v => setD('userReviews', v)} />
          </div>
        </div>

        <aside className="af-sidebar">
          <div className="af-card af-card--sidebar">
            <h3 className="af-card__title">Đăng bài</h3>
            <button type="submit" className="af-btn af-btn--primary af-btn--full" disabled={saving}>
              <Check size={14} /> {saving ? 'Đang lưu...' : isEdit ? 'Lưu thay đổi' : 'Đăng tool'}
            </button>
            <button type="button" className="af-btn af-btn--ghost af-btn--full" onClick={() => navigate('/admin')}>
              Hủy
            </button>
          </div>

          <div className="af-card af-card--sidebar">
            <h3 className="af-card__title">Logo & Giao diện</h3>
            <div className="af-logo-preview">
              <ToolLogo tool={basic} size={72} />
              <div className="af-logo-preview__info">
                <p className="af-logo-preview__name">{basic.name || 'Tên tool'}</p>
                <p className="af-logo-preview__cat">{basic.category}</p>
              </div>
            </div>
            <Field label="Chữ logo (2–4 ký tự)" required>
              <Input value={basic.logoText} onChange={v => setB('logoText', v.toUpperCase().slice(0, 4))} placeholder="VD: GPT" maxLength={4} />
            </Field>
            <div className="af-color-row">
              <Field label="Màu nền">
                <div className="af-color-pick">
                  <input type="color" value={basic.logoBg} onChange={e => setB('logoBg', e.target.value)} />
                  <span>{basic.logoBg}</span>
                </div>
              </Field>
              <Field label="Màu chữ">
                <div className="af-color-pick">
                  <input type="color" value={basic.logoFill} onChange={e => setB('logoFill', e.target.value)} />
                  <span>{basic.logoFill}</span>
                </div>
              </Field>
            </div>
            <Field label="Màu fill (tùy chọn)">
              <div className="af-color-pick">
                <input type="color" value={basic.logoBgFill || '#ffffff'} onChange={e => setB('logoBgFill', e.target.value)} />
                <span>{basic.logoBgFill || '–'}</span>
                {basic.logoBgFill && <button type="button" className="af-clear-btn" onClick={() => setB('logoBgFill', '')}>Xóa</button>}
              </div>
            </Field>
            <Field label="Hình dạng">
              <div className="af-radio-row">
                {['rounded','circle'].map(s => (
                  <label key={s} className="af-radio">
                    <input type="radio" name="shape" value={s} checked={basic.logoShape === s} onChange={() => setB('logoShape', s)} />
                    {s === 'rounded' ? 'Bo góc' : 'Tròn'}
                  </label>
                ))}
              </div>
            </Field>
          </div>

          <div className="af-card af-card--sidebar">
            <h3 className="af-card__title">Phân loại</h3>
            <Field label="Danh mục">
              <select className="af-input" value={basic.category} onChange={e => setB('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Đánh giá tổng">
              <StarPicker value={parseFloat(basic.rating)} onChange={v => setB('rating', v)} />
            </Field>
            <Field label="Số lượt đánh giá">
              <Input type="number" value={basic.reviews} onChange={v => setB('reviews', v)} placeholder="1000" />
            </Field>
          </div>

          <div className="af-card af-card--sidebar">
            <h3 className="af-card__title">Thông tin nhanh</h3>
            <Field label="Website">
              <Input value={detail.website} onChange={v => setD('website', v)} placeholder="https://..." />
            </Field>
            <Field label="Giá">
              <Input value={detail.pricing} onChange={v => setD('pricing', v)} placeholder="VD: Freemium / $20/tháng" />
            </Field>
            <Field label="Năm ra mắt">
              <Input value={detail.founded} onChange={v => setD('founded', v)} placeholder="VD: 2022" />
            </Field>
          </div>
        </aside>
      </form>
    </div>
  );
}
