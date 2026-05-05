import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, Check, X, ChevronDown, ArrowLeft, ExternalLink, Globe, DollarSign, Calendar } from 'lucide-react';
import { fetchTools, fetchToolDetail } from '../api/toolsApi';
import { ToolLogo } from '../components/ToolReviews/ToolReviews';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import './ToolDetail.css';

function Stars({ rating, size = 16 }) {
  return (
    <div className="td-stars">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} fill={i <= Math.round(rating) ? '#f59e0b' : 'none'} color={i <= Math.round(rating) ? '#f59e0b' : '#d1d5db'} />
      ))}
    </div>
  );
}

function RatingBar({ label, value }) {
  return (
    <div className="td-rbar">
      <span className="td-rbar__label">{label}</span>
      <div className="td-rbar__track"><div className="td-rbar__fill" style={{ width: `${(value / 5) * 100}%` }} /></div>
      <span className="td-rbar__val">{value.toFixed(1)}</span>
    </div>
  );
}

function FAQ({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="td-faq">
      {items.map((item, i) => (
        <div key={i} className={`td-faq__item${open === i ? ' td-faq__item--open' : ''}`}>
          <button className="td-faq__q" onClick={() => setOpen(open === i ? null : i)}>
            {item.q}
            <ChevronDown size={16} className="td-faq__icon" />
          </button>
          {open === i && <p className="td-faq__a">{item.a}</p>}
        </div>
      ))}
    </div>
  );
}

export default function ToolDetail() {
  const navigate = useNavigate();
  const { id: toolId } = useParams();
  const [tool,   setTool]   = useState(null);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedTools, setRelatedTools] = useState([]);

  useEffect(() => {
    Promise.all([fetchTools(), fetchToolDetail(toolId)])
      .then(([tools, det]) => {
        const found = tools.find(t => t.id === toolId);
        setTool(found || null);
        setDetail(det);
        if (found) setRelatedTools(tools.filter(t => t.category === found.category && t.id !== toolId).slice(0, 4));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [toolId]);

  if (loading) return (
    <>
      <Navbar />
      <div style={{ padding: '120px 24px', textAlign: 'center', color: '#6b7280' }}>Đang tải...</div>
      <Footer />
    </>
  );

  if (!tool) return (
    <>
      <Navbar />
      <div style={{ padding: '120px 24px', textAlign: 'center' }}>
        <p style={{ color: '#6b7280' }}>Không tìm thấy tool này.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: 16, cursor: 'pointer' }}>← Về trang chủ</button>
      </div>
      <Footer />
    </>
  );

  const ratingBreakdown = [
    { label: 'Tính năng',   value: Math.min(5, tool.rating + 0.1) },
    { label: 'Dễ sử dụng', value: Math.max(3.5, tool.rating - 0.2) },
    { label: 'Hỗ trợ KH',  value: Math.max(3.8, tool.rating - 0.1) },
    { label: 'Giá trị',    value: Math.max(3.6, tool.rating - 0.3) },
  ];

  return (
    <>
      <Navbar />
      <div className="td-page">
        <div className="td-breadcrumb container">
          <button className="td-back" onClick={() => navigate('/')}>
            <ArrowLeft size={14} /> Trang chủ
          </button>
          <span className="td-breadcrumb__sep">/</span>
          <span className="td-breadcrumb__cat">{tool.category}</span>
          <span className="td-breadcrumb__sep">/</span>
          <span className="td-breadcrumb__current">{tool.name}</span>
        </div>

        <div className="container td-layout">
          <div className="td-left">
            <div className="td-hero-card">
              <div className="td-hero-card__top">
                <ToolLogo tool={tool} size={72} />
                <div className="td-hero-card__info">
                  <h1 className="td-hero-card__name">{tool.name}</h1>
                  <p className="td-hero-card__tagline">{detail.tagline}</p>
                  <div className="td-hero-card__rating">
                    <Stars rating={tool.rating} />
                    <span className="td-hero-card__score">{tool.rating}</span>
                    <span className="td-hero-card__count">({tool.reviews.toLocaleString()} đánh giá)</span>
                  </div>
                </div>
              </div>
              <p className="td-hero-card__desc">{detail.description}</p>
              <div className="td-hero-card__actions">
                <a href={detail.website} target="_blank" rel="noopener noreferrer" className="btn-primary td-btn-visit">
                  Truy cập {tool.name} <ExternalLink size={14} />
                </a>
                <button className="td-btn-secondary" onClick={() => navigate('/')}>
                  Tư vấn miễn phí
                </button>
              </div>
            </div>

            <div className="td-section">
              <h2 className="td-section__title">Ưu & Nhược điểm</h2>
              <div className="td-proscons">
                <div className="td-pros">
                  <span className="td-pros__heading">Ưu điểm</span>
                  {detail.pros.map((p, i) => (
                    <div key={i} className="td-pros__item">
                      <Check size={15} className="td-pros__icon" /> {p}
                    </div>
                  ))}
                </div>
                <div className="td-cons">
                  <span className="td-cons__heading">Nhược điểm</span>
                  {detail.cons.map((c, i) => (
                    <div key={i} className="td-cons__item">
                      <X size={15} className="td-cons__icon" /> {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="td-section">
              <h2 className="td-section__title">Tính năng nổi bật</h2>
              <div className="td-features">
                {detail.features.map((f, i) => (
                  <div key={i} className="td-feature">
                    <div className="td-feature__num">{String(i + 1).padStart(2, '0')}</div>
                    <div>
                      <h3 className="td-feature__title">{f.title}</h3>
                      <p className="td-feature__desc">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="td-section">
              <h2 className="td-section__title">Đánh giá chi tiết</h2>
              <div className="td-rating-block">
                <div className="td-rating-block__big">
                  <span className="td-rating-block__score">{tool.rating}</span>
                  <Stars rating={tool.rating} size={20} />
                  <span className="td-rating-block__count">{tool.reviews.toLocaleString()} đánh giá</span>
                </div>
                <div className="td-rating-block__bars">
                  {ratingBreakdown.map(r => <RatingBar key={r.label} {...r} />)}
                </div>
              </div>
            </div>

            <div className="td-section">
              <h2 className="td-section__title">Nhận xét từ người dùng</h2>
              <div className="td-reviews">
                {detail.userReviews.map((r, i) => (
                  <div key={i} className="td-review">
                    <div className="td-review__top">
                      <div className="td-review__avatar">{r.name.charAt(0)}</div>
                      <div>
                        <p className="td-review__name">{r.name}</p>
                        <p className="td-review__role">{r.role}</p>
                      </div>
                      <div className="td-review__meta">
                        <Stars rating={r.rating} size={13} />
                        <span className="td-review__date">{r.date}</span>
                      </div>
                    </div>
                    <p className="td-review__comment">"{r.comment}"</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="td-section">
              <h2 className="td-section__title">Câu hỏi thường gặp</h2>
              <FAQ items={detail.faqs} />
            </div>
          </div>

          <aside className="td-sidebar">
            <div className="td-info-card">
              <h3 className="td-info-card__title">Thông tin nhanh</h3>
              <div className="td-info-card__rows">
                <div className="td-info-row">
                  <Globe size={15} className="td-info-row__icon" />
                  <span className="td-info-row__label">Website</span>
                  <a href={detail.website} target="_blank" rel="noopener noreferrer" className="td-info-row__val td-info-row__link">
                    {tool.name.toLowerCase().replace(/\s+/g, '')}.com
                  </a>
                </div>
                <div className="td-info-row">
                  <DollarSign size={15} className="td-info-row__icon" />
                  <span className="td-info-row__label">Giá</span>
                  <span className="td-info-row__val">{detail.pricing}</span>
                </div>
                <div className="td-info-row">
                  <Calendar size={15} className="td-info-row__icon" />
                  <span className="td-info-row__label">Ra mắt</span>
                  <span className="td-info-row__val">{detail.founded}</span>
                </div>
                <div className="td-info-row">
                  <Star size={15} className="td-info-row__icon" />
                  <span className="td-info-row__label">Rating</span>
                  <span className="td-info-row__val">{tool.rating} / 5.0</span>
                </div>
              </div>
            </div>

            <div className="td-cta-card">
              <p className="td-cta-card__label">Cần tư vấn?</p>
              <h3 className="td-cta-card__title">MHC sẵn sàng giúp bạn chọn đúng công cụ</h3>
              <p className="td-cta-card__sub">Liên hệ ngay để được tư vấn miễn phí từ chuyên gia.</p>
              <button className="btn-primary td-cta-card__btn" onClick={() => navigate('/')}>
                Liên hệ tư vấn
              </button>
            </div>

            <div className="td-category-card">
              <h3 className="td-category-card__title">Danh mục: {tool.category}</h3>
              <div className="td-category-card__list">
                {relatedTools.map(t => (
                  <button key={t.id} className="td-category-card__item" onClick={() => navigate(`/tool/${t.id}`)}>
                    <ToolLogo tool={t} size={32} />
                    <span>{t.name}</span>
                    <Stars rating={t.rating} size={11} />
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
}
