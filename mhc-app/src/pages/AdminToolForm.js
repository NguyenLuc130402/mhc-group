import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Star, Check, GripVertical, Upload, X, Sparkles, ChevronDown, Copy, Download } from 'lucide-react';
import { CATEGORIES, generateId } from '../data/toolsData';
import { getEmptyDetail } from '../data/toolsDetail';
import { fetchTools, createTool, updateTool, fetchToolDetail, saveToolDetail, uploadLogo } from '../api/toolsApi';
import { ToolLogo } from '../components/ToolReviews/ToolReviews';
import { useLang } from '../contexts/LangContext';
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

function StringList({ items, onChange, placeholder, addLabel }) {
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
      <button type="button" className="af-list__add" onClick={add}><Plus size={13} /> {addLabel}</button>
    </div>
  );
}

function FeatureList({ items, onChange, namePlaceholder, descPlaceholder, addLabel }) {
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
          <input className="af-input" value={item.title} onChange={e => set(i, 'title', e.target.value)} placeholder={namePlaceholder} />
          <textarea className="af-textarea" rows={2} value={item.desc} onChange={e => set(i, 'desc', e.target.value)} placeholder={descPlaceholder} />
        </div>
      ))}
      <button type="button" className="af-list__add" onClick={add}><Plus size={13} /> {addLabel}</button>
    </div>
  );
}

function FAQList({ items, onChange, qPlaceholder, aPlaceholder, addLabel }) {
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
          <input className="af-input" value={item.q} onChange={e => set(i, 'q', e.target.value)} placeholder={qPlaceholder} />
          <textarea className="af-textarea" rows={2} value={item.a} onChange={e => set(i, 'a', e.target.value)} placeholder={aPlaceholder} />
        </div>
      ))}
      <button type="button" className="af-list__add" onClick={add}><Plus size={13} /> {addLabel}</button>
    </div>
  );
}

function ReviewList({ items, onChange, userPlaceholder, rolePlaceholder, datePlaceholder, commentPlaceholder, addLabel }) {
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
            <input className="af-input" value={item.name} onChange={e => set(i, 'name', e.target.value)} placeholder={userPlaceholder} />
            <input className="af-input" value={item.role} onChange={e => set(i, 'role', e.target.value)} placeholder={rolePlaceholder} />
            <input className="af-input" value={item.date} onChange={e => set(i, 'date', e.target.value)} placeholder={datePlaceholder} />
            <StarPicker value={item.rating} onChange={v => set(i, 'rating', v)} />
          </div>
          <textarea className="af-textarea" rows={2} value={item.comment} onChange={e => set(i, 'comment', e.target.value)} placeholder={commentPlaceholder} />
        </div>
      ))}
      <button type="button" className="af-list__add" onClick={add}><Plus size={13} /> {addLabel}</button>
    </div>
  );
}

const AI_PROMPT = `Bạn là chuyên gia đánh giá phần mềm. Hãy tạo JSON đầy đủ cho công cụ [TÊN TOOL] theo format dưới đây. Trả về CHỈ JSON, không có text nào khác.

{
  "name": "Tên công cụ",
  "category": "AI Tool",
  "rating": 4.5,
  "reviews": 10000,
  "logoText": "AB",
  "logoBg": "#f0f4ff",
  "logoFill": "#4285F4",
  "logoShape": "rounded",
  "tagline": "Tagline ngắn gọn, hấp dẫn",
  "website": "https://example.com",
  "pricing": "Freemium / $20/tháng",
  "founded": "2022",
  "description": "Mô tả tổng quan 2–3 câu về công cụ.",
  "pros": ["Ưu điểm 1", "Ưu điểm 2", "Ưu điểm 3"],
  "cons": ["Nhược điểm 1", "Nhược điểm 2"],
  "features": [
    { "title": "Tên tính năng", "desc": "Mô tả tính năng ngắn gọn." }
  ],
  "faqs": [
    { "q": "Câu hỏi thường gặp?", "a": "Câu trả lời." }
  ],
  "userReviews": [
    { "name": "Nguyễn Văn A", "role": "Marketing Manager", "rating": 5, "comment": "Nhận xét của người dùng.", "date": "Tháng 5, 2025" }
  ]
}

Lưu ý:
- category phải là một trong: "AI Tool", "CRM Tool", "SaaS Platforms", "Marketing Tool", "SEO Tool" hãy lựa chọn ngẫu nhiên 1 trong 4 tool này
- rating từ 1.0 đến 5.0
- logoText tối đa 4 ký tự viết hoa
- logoBg và logoFill là mã hex màu phù hợp với thương hiệu tool`;

const DEFAULT_BASIC = {
  name: '', category: '', rating: 4.5, reviews: 1000,
  logoUrl: '', logoBg: '#f0f4ff', logoFill: '#4285F4', logoText: '', logoShape: 'rounded', logoBgFill: '',
};

export default function AdminToolForm() {
  const { t } = useLang();
  const navigate = useNavigate();
  const { id: toolId } = useParams();
  const isEdit = !!toolId;
  const fileInputRef = useRef(null);

  const [basic,     setBasic]     = useState(DEFAULT_BASIC);
  const [detail,    setDetail]    = useState(getEmptyDetail());
  const [loading,   setLoading]   = useState(isEdit);
  const [saving,    setSaving]    = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [aiOpen,       setAiOpen]       = useState(false);
  const [aiJson,       setAiJson]       = useState('');
  const [aiError,      setAiError]      = useState('');
  const [aiCopied,     setAiCopied]     = useState(false);
  const [aiValidState, setAiValidState] = useState(null); // null | 'ok' | 'error'
  const [aiValidMsg,   setAiValidMsg]   = useState('');
  const [nameError,    setNameError]    = useState('');

  useEffect(() => {
    if (!isEdit) return;
    Promise.all([fetchTools(), fetchToolDetail(toolId)])
      .then(([tools, det]) => {
        const tool = tools.find(tl => tl.id === toolId);
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

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(AI_PROMPT).then(() => {
      setAiCopied(true);
      setTimeout(() => setAiCopied(false), 2000);
    });
  };

  const handleValidateJson = () => {
    setAiError('');
    let data;
    try {
      data = JSON.parse(aiJson);
    } catch {
      setAiValidState('error');
      setAiValidMsg(t('adminForm.aiValidErrParse'));
      return;
    }
    if (!data.name || !String(data.name).trim()) {
      setAiValidState('error');
      setAiValidMsg(t('adminForm.aiValidErrName'));
      return;
    }
    if (!CATEGORIES.includes(data.category)) {
      setAiValidState('error');
      setAiValidMsg(t('adminForm.aiValidErrCategory'));
      return;
    }
    const rating = parseFloat(data.rating);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      setAiValidState('error');
      setAiValidMsg(t('adminForm.aiValidErrRating'));
      return;
    }
    setAiValidState('ok');
    setAiValidMsg(t('adminForm.aiValidOk'));
  };

  const handleAiImport = () => {
    setAiError('');
    try {
      const data = JSON.parse(aiJson);
      setBasic(p => ({
        ...p,
        name:       data.name       || p.name,
        category:   data.category   || p.category,
        rating:     data.rating     ?? p.rating,
        reviews:    data.reviews    ?? p.reviews,
        logoText:   data.logoText   || p.logoText,
        logoBg:     data.logoBg     || p.logoBg,
        logoFill:   data.logoFill   || p.logoFill,
        logoShape:  data.logoShape  || p.logoShape,
      }));
      setDetail(p => ({
        ...p,
        tagline:     data.tagline     || p.tagline,
        website:     data.website     || p.website,
        pricing:     data.pricing     || p.pricing,
        founded:     data.founded     || p.founded,
        description: data.description || p.description,
        pros:        data.pros?.length        ? data.pros        : p.pros,
        cons:        data.cons?.length        ? data.cons        : p.cons,
        features:    data.features?.length    ? data.features    : p.features,
        faqs:        data.faqs?.length        ? data.faqs        : p.faqs,
        userReviews: data.userReviews?.length ? data.userReviews : p.userReviews,
      }));
      setAiJson('');
      setAiOpen(false);
    } catch {
      setAiError(t('adminForm.aiError'));
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    setUploading(true);
    try {
      const url = await uploadLogo(file);
      setB('logoUrl', url);
    } catch {
      setPreviewUrl('');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!basic.name.trim()) return;
    if (!basic.category) return alert(t('adminForm.requireCategory'));
    if (!basic.logoUrl && !basic.logoText.trim()) return alert(t('adminForm.requireLogo'));

    if (!isEdit) {
      try {
        const existing = await fetchTools();
        const isDuplicate = existing.some(
          tl => tl.name.trim().toLowerCase() === basic.name.trim().toLowerCase()
        );
        if (isDuplicate) {
          setNameError(t('adminForm.duplicateName'));
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    setNameError('');
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

  if (loading) return <div style={{ padding: '120px 24px', textAlign: 'center', color: '#6b7280' }}>{t('adminForm.loading')}</div>;

  const saveLabel = saving ? t('adminForm.saving') : isEdit ? t('adminForm.save') : t('adminForm.publish');

  return (
    <div className="af-page">
      <header className="af-topbar">
        <button className="af-back" onClick={() => navigate('/admin')}>
          <ArrowLeft size={15} /> {t('adminForm.back')}
        </button>
        <div className="af-topbar__center">
          <span className="af-topbar__brand">MHC Admin</span>
          <span className="af-topbar__sep">/</span>
          <span className="af-topbar__title">{isEdit ? `${t('adminForm.editPrefix')} ${basic.name}` : t('adminForm.addTitle')}</span>
        </div>
        <button type="submit" form="tool-form" className="af-btn af-btn--primary" disabled={saving}>
          <Check size={14} /> {saveLabel}
        </button>
      </header>

      <form id="tool-form" className="af-layout container" onSubmit={handleSave}>
        <div className="af-left">
          {/* AI Import */}
          <div className="af-ai-box">
            <button type="button" className="af-ai-box__toggle" onClick={() => setAiOpen(v => !v)}>
              <span className="af-ai-box__toggle-left">
                <Sparkles size={15} />
                {t('adminForm.aiTitle')}
                <span className="af-ai-box__badge">{t('adminForm.aiBadge')}</span>
              </span>
              <ChevronDown size={15} className={`af-ai-box__chevron${aiOpen ? ' af-ai-box__chevron--open' : ''}`} />
            </button>

            {aiOpen && (
              <div className="af-ai-box__body">
                <div className="af-ai-step">
                  <span className="af-ai-step__num">1</span>
                  <div>
                    <p className="af-ai-step__title">{t('adminForm.aiStep1Title')}</p>
                    <p className="af-ai-step__sub">{t('adminForm.aiStep1Sub')}</p>
                    <button type="button" className="af-ai-copy-btn" onClick={handleCopyPrompt}>
                      <Copy size={13} /> {aiCopied ? t('adminForm.aiCopied') : t('adminForm.aiCopyBtn')}
                    </button>
                  </div>
                </div>

                <div className="af-ai-step">
                  <span className="af-ai-step__num">2</span>
                  <div style={{ width: '100%' }}>
                    <p className="af-ai-step__title">{t('adminForm.aiStep2Title')}</p>
                    <div style={{ position: 'relative' }}>
                      <textarea
                        className="af-ai-textarea"
                        rows={8}
                        value={aiJson}
                        onChange={e => { setAiJson(e.target.value); setAiError(''); setAiValidState(null); setAiValidMsg(''); }}
                        placeholder={'Paste JSON...\n\n{\n  "name": "ChatGPT",\n  "category": "AI Tool",\n  ...\n}'}
                      />
                      {aiJson && (
                        <button
                          type="button"
                          className="af-ai-clear-json"
                          onClick={() => { setAiJson(''); setAiError(''); setAiValidState(null); setAiValidMsg(''); }}
                          title="Xóa JSON"
                        >
                          <X size={13} />
                        </button>
                      )}
                    </div>
                    {aiError && <p className="af-ai-error">{aiError}</p>}
                    {aiValidMsg && (
                      <p className={aiValidState === 'ok' ? 'af-ai-valid-ok' : 'af-ai-error'}>{aiValidMsg}</p>
                    )}
                  </div>
                </div>

                <div className="af-ai-step">
                  <span className="af-ai-step__num">3</span>
                  <div>
                    <p className="af-ai-step__title">{t('adminForm.aiStep3Title')}</p>
                    <div className="af-ai-actions">
                      <button type="button" className="af-ai-validate-btn" onClick={handleValidateJson} disabled={!aiJson.trim()}>
                        <Check size={13} /> {t('adminForm.aiValidateBtn')}
                      </button>
                      <button type="button" className="af-ai-import-btn" onClick={handleAiImport} disabled={aiValidState !== 'ok'}>
                        <Download size={13} /> {t('adminForm.aiImportBtn')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="af-card">
            <h2 className="af-card__title">{t('adminForm.basicInfo')}</h2>
            <Field label={t('adminForm.toolName')} required>
              <Input value={basic.name} onChange={v => { setB('name', v); setNameError(''); }} placeholder={t('adminForm.toolNamePlaceholder')} />
              {nameError && <p className="af-field__error">{nameError}</p>}
            </Field>
            <Field label={t('adminForm.tagline')}>
              <Input value={detail.tagline} onChange={v => setD('tagline', v)} placeholder={t('adminForm.taglinePlaceholder')} />
            </Field>
            <Field label={t('adminForm.description')}>
              <Textarea rows={5} value={detail.description} onChange={v => setD('description', v)} placeholder={t('adminForm.descPlaceholder')} />
            </Field>
          </div>

          <div className="af-card">
            <h2 className="af-card__title">{t('adminForm.proscons')}</h2>
            <div className="af-two-col">
              <Field label={t('adminForm.pros')}>
                <StringList items={detail.pros} onChange={v => setD('pros', v)} placeholder={t('adminForm.prosPlaceholder')} addLabel={t('adminForm.addItem')} />
              </Field>
              <Field label={t('adminForm.cons')}>
                <StringList items={detail.cons} onChange={v => setD('cons', v)} placeholder={t('adminForm.consPlaceholder')} addLabel={t('adminForm.addItem')} />
              </Field>
            </div>
          </div>

          <div className="af-card">
            <h2 className="af-card__title">{t('adminForm.features')}</h2>
            <FeatureList
              items={detail.features}
              onChange={v => setD('features', v)}
              namePlaceholder={t('adminForm.featureName')}
              descPlaceholder={t('adminForm.featureDesc')}
              addLabel={t('adminForm.addFeature')}
            />
          </div>

          <div className="af-card">
            <h2 className="af-card__title">{t('adminForm.faq')}</h2>
            <FAQList
              items={detail.faqs}
              onChange={v => setD('faqs', v)}
              qPlaceholder={t('adminForm.faqQ')}
              aPlaceholder={t('adminForm.faqA')}
              addLabel={t('adminForm.addFaq')}
            />
          </div>

          <div className="af-card">
            <h2 className="af-card__title">{t('adminForm.userReviews')}</h2>
            <ReviewList
              items={detail.userReviews}
              onChange={v => setD('userReviews', v)}
              userPlaceholder={t('adminForm.reviewUser')}
              rolePlaceholder={t('adminForm.reviewRole')}
              datePlaceholder={t('adminForm.reviewDate')}
              commentPlaceholder={t('adminForm.reviewComment')}
              addLabel={t('adminForm.addReview')}
            />
          </div>
        </div>

        <aside className="af-sidebar">
          <div className="af-card af-card--sidebar">
            <h3 className="af-card__title">{t('adminForm.publishCard')}</h3>
            <button type="submit" className="af-btn af-btn--primary af-btn--full" disabled={saving}>
              <Check size={14} /> {saveLabel}
            </button>
            <button type="button" className="af-btn af-btn--ghost af-btn--full" onClick={() => navigate('/admin')}>
              {t('adminForm.cancel')}
            </button>
          </div>

          <div className="af-card af-card--sidebar">
            <h3 className="af-card__title">{t('adminForm.logoSection')}</h3>
            <div className="af-logo-preview">
              <ToolLogo tool={basic} size={72} />
              <div className="af-logo-preview__info">
                <p className="af-logo-preview__name">{basic.name || t('adminForm.toolNamePreview')}</p>
                <p className="af-logo-preview__cat">{basic.category}</p>
              </div>
            </div>

            <Field label={t('adminForm.uploadLogo')}>
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
              {previewUrl || basic.logoUrl ? (
                <div className="af-logo-upload__preview">
                  <img src={previewUrl || basic.logoUrl} alt="logo preview" className="af-logo-upload__img" />
                  <button type="button" className="af-logo-upload__remove" onClick={() => { setB('logoUrl', ''); setPreviewUrl(''); }}>
                    <X size={14} /> {t('adminForm.removeImg')}
                  </button>
                </div>
              ) : (
                <button type="button" className="af-logo-upload__btn" onClick={() => fileInputRef.current.click()} disabled={uploading}>
                  <Upload size={15} /> {uploading ? t('adminForm.uploading') : t('adminForm.chooseImg')}
                </button>
              )}
            </Field>

            <div className="af-divider"><span>{t('adminForm.orText')}</span></div>

            <Field label={t('adminForm.logoText')}>
              <Input value={basic.logoText} onChange={v => setB('logoText', v.toUpperCase().slice(0, 4))} placeholder={t('adminForm.logoTextPlaceholder')} maxLength={4} disabled={!!basic.logoUrl} />
            </Field>
            <div className="af-color-row">
              <Field label={t('adminForm.bgColor')}>
                <div className="af-color-pick">
                  <input type="color" value={basic.logoBg} onChange={e => setB('logoBg', e.target.value)} />
                  <span>{basic.logoBg}</span>
                </div>
              </Field>
              <Field label={t('adminForm.textColor')}>
                <div className="af-color-pick">
                  <input type="color" value={basic.logoFill} onChange={e => setB('logoFill', e.target.value)} />
                  <span>{basic.logoFill}</span>
                </div>
              </Field>
            </div>
            <Field label={t('adminForm.fillColor')}>
              <div className="af-color-pick">
                <input type="color" value={basic.logoBgFill || '#ffffff'} onChange={e => setB('logoBgFill', e.target.value)} />
                <span>{basic.logoBgFill || '–'}</span>
                {basic.logoBgFill && <button type="button" className="af-clear-btn" onClick={() => setB('logoBgFill', '')}>{t('adminForm.clearFill')}</button>}
              </div>
            </Field>
            <Field label={t('adminForm.shape')}>
              <div className="af-radio-row">
                {['rounded','circle'].map(s => (
                  <label key={s} className="af-radio">
                    <input type="radio" name="shape" value={s} checked={basic.logoShape === s} onChange={() => setB('logoShape', s)} />
                    {s === 'rounded' ? t('adminForm.rounded') : t('adminForm.circle')}
                  </label>
                ))}
              </div>
            </Field>
          </div>

          <div className="af-card af-card--sidebar">
            <h3 className="af-card__title">{t('adminForm.classifySection')}</h3>
            <Field label={t('adminForm.category')}>
              <select className="af-input" value={basic.category} onChange={e => setB('category', e.target.value)} required>
                <option value="" disabled>{t('adminForm.categoryPlaceholder')}</option>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label={t('adminForm.rating')}>
              <StarPicker value={parseFloat(basic.rating)} onChange={v => setB('rating', v)} />
            </Field>
            <Field label={t('adminForm.reviewCount')}>
              <Input type="number" value={basic.reviews} onChange={v => setB('reviews', v)} placeholder={t('adminForm.reviewCountPlaceholder')} />
            </Field>
          </div>

          <div className="af-card af-card--sidebar">
            <h3 className="af-card__title">{t('adminForm.quickInfo')}</h3>
            <Field label={t('adminForm.website')}>
              <Input value={detail.website} onChange={v => setD('website', v)} placeholder={t('adminForm.websitePlaceholder')} />
            </Field>
            <Field label={t('adminForm.price')}>
              <Input value={detail.pricing} onChange={v => setD('pricing', v)} placeholder={t('adminForm.pricePlaceholder')} />
            </Field>
            <Field label={t('adminForm.founded')}>
              <Input value={detail.founded} onChange={v => setD('founded', v)} placeholder={t('adminForm.foundedPlaceholder')} />
            </Field>
          </div>
        </aside>
      </form>
    </div>
  );
}
