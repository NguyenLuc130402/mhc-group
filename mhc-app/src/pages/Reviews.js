import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Target, Layers, DollarSign, ArrowRight, Mail, Search, X, ArrowDown } from 'lucide-react';
import benefitsImg from '../assets/images/webinar-2.webp';
import Navbar from '../components/Navbar/Navbar';
import ToolReviews from '../components/ToolReviews/ToolReviews';
import Footer from '../components/Footer/Footer';
import ChatBubble from '../components/ChatBubble/ChatBubble';
import { ToolLogo } from '../components/ToolReviews/ToolReviews';
import { fetchTools } from '../api/toolsApi';
import { useLang } from '../contexts/LangContext';
import './Reviews.css';

const TIP_ICONS = [<Target size={22} />, <Layers size={22} />, <DollarSign size={22} />];

function FeaturedTool({ tool }) {
  const { t } = useLang();
  const navigate = useNavigate();
  return (
    <section className="rv-featured">
      <div className="container">
        <div className="rv-featured__inner">
          <div className="rv-featured__badge">
            <Star size={13} fill="#f59e0b" color="#f59e0b" /> {t('reviews.featuredBadge')}
          </div>
          <div className="rv-featured__card">
            <div className="rv-featured__left">
              <ToolLogo tool={tool} size={80} />
              <div className="rv-featured__meta">
                <h2 className="rv-featured__name">{tool.name}</h2>
                <span className="rv-featured__cat">{tool.category}</span>
                <div className="rv-featured__stars">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={15} fill={i <= Math.round(tool.rating) ? '#f59e0b' : 'none'} color={i <= Math.round(tool.rating) ? '#f59e0b' : '#d1d5db'} />
                  ))}
                  <span className="rv-featured__score">{tool.rating}</span>
                  <span className="rv-featured__count">({tool.reviews.toLocaleString()} {t('reviews.ratingCount')})</span>
                </div>
              </div>
            </div>
            <div className="rv-featured__right">
              <p className="rv-featured__desc">{t('reviews.featuredDesc')}</p>
              <button className="rv-featured__btn" onClick={() => navigate(`/tool/${tool.id}`)}>
                {t('reviews.featuredBtn')} <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GuideSection() {
  const { t } = useLang();
  const tips = t('reviews.tips').map((tip, i) => ({ ...tip, icon: TIP_ICONS[i] }));
  return (
    <section className="rv-guide">
      <div className="container">
        <div className="rv-guide__header">
          <span className="section-label">{t('reviews.guideLabel')}</span>
          <h2 className="rv-guide__title">{t('reviews.guideTitle')}</h2>
          <p className="rv-guide__sub">{t('reviews.guideSub')}</p>
        </div>
        <div className="rv-guide__grid">
          {tips.map((tip, i) => (
            <div key={i} className="rv-guide__card">
              <div className="rv-guide__icon">{tip.icon}</div>
              <h3 className="rv-guide__card-title">{tip.title}</h3>
              <p className="rv-guide__card-desc">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEP_COLORS = ['#86efac', '#fed7aa', '#ddd6fe'];
const BAR_HEIGHTS = [40, 65, 50, 80, 60, 90, 70];

function RecommendSection() {
  const { t } = useLang();
  const steps = t('reviews.recommendSteps');
  return (
    <section className="rv-recommend">
      <div className="container">
        <div className="rv-recommend__header">
          <h2 className="rv-recommend__title">{t('reviews.recommendTitle')}</h2>
          <p className="rv-recommend__sub">{t('reviews.recommendSub')}</p>
        </div>

        <div className="rv-recommend__body">
          {/* Cột trái — ảnh + widgets */}
          <div className="rv-recommend__left">
            <img src={benefitsImg} alt="consultant" className="rv-recommend__img" />

            <div className="rv-recommend__widget rv-recommend__widget--top">
              <div className="rv-recommend__widget-label">Doanh nghiệp tư vấn</div>
              <div className="rv-recommend__widget-value">1,000+ <span className="rv-recommend__badge-up">+18%</span></div>
              <div className="rv-recommend__bars">
                {BAR_HEIGHTS.map((h, i) => (
                  <div key={i} className="rv-recommend__bar" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>

            <div className="rv-recommend__widget rv-recommend__widget--mid">
              <div className="rv-recommend__widget-label">Công cụ được đánh giá</div>
              <div className="rv-recommend__widget-value">50+</div>
              <div className="rv-recommend__sparkline">
                {[30,50,40,70,55,80].map((h, i) => (
                  <div key={i} className="rv-recommend__spark-dot" style={{ bottom: `${h}%` }} />
                ))}
              </div>
            </div>

            <div className="rv-recommend__widget rv-recommend__widget--bot">
              <div className="rv-recommend__ring">
                <svg viewBox="0 0 36 36" className="rv-recommend__ring-svg">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#8b5cf6" strokeWidth="3"
                    strokeDasharray="61 100" strokeLinecap="round" strokeDashoffset="25" />
                </svg>
                <span className="rv-recommend__ring-label">98%</span>
              </div>
              <div>
                <div className="rv-recommend__widget-label">Khách hàng hài lòng</div>
                <div className="rv-recommend__widget-value rv-recommend__widget-value--sm">+2.4%</div>
              </div>
            </div>
          </div>

          {/* Cột phải — 3 bước */}
          <div className="rv-recommend__right">
            {steps.map((step, i) => (
              <div key={i} className="rv-recommend__step-wrap">
                <div className="rv-recommend__step">
                  <p className="rv-recommend__step-text">{step}</p>
                  <span className="rv-recommend__step-num" style={{ color: STEP_COLORS[i] }}>{i + 1}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="rv-recommend__arrow"><ArrowDown size={16} /></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rv-recommend__cta">
          <button className="rv-recommend__btn">{t('reviews.recommendBtn')}</button>
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const { t } = useLang();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  }

  return (
    <section className="rv-newsletter">
      <div className="container">
        <div className="rv-newsletter__inner">
          <div className="rv-newsletter__left">
            <Mail size={32} className="rv-newsletter__icon" />
            <h2 className="rv-newsletter__title">{t('reviews.newsletterTitleL1')}<br />{t('reviews.newsletterTitleL2')}</h2>
            <p className="rv-newsletter__sub">{t('reviews.newsletterSub')}</p>
          </div>
          <div className="rv-newsletter__right">
            {sent ? (
              <p className="rv-newsletter__thanks">{t('reviews.newsletterThanks')}</p>
            ) : (
              <form className="rv-newsletter__form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="rv-newsletter__input"
                  placeholder={t('reviews.newsletterPlaceholder')}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="rv-newsletter__btn">
                  {t('reviews.newsletterBtn')} <ArrowRight size={15} />
                </button>
              </form>
            )}
            <p className="rv-newsletter__note">{t('reviews.newsletterNote')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Reviews() {
  const { t } = useLang();
  const [featuredTool, setFeaturedTool] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTools()
      .then(tools => {
        const top = [...tools].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)[0];
        setFeaturedTool(top || null);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--nav-height)' }}>
        <section className="rv-hero">
          <div className="container rv-hero__inner">
            <h1 className="rv-hero__heading">
              <span className="rv-hero__line">
                {t('reviews.heroL1pre')}
                <span className="rv-hero__accent">{t('reviews.heroL1accent')}</span>
                {t('reviews.heroL1post')}
              </span>
              <span className="rv-hero__line">
                {t('reviews.heroL2pre')}
                <span className="rv-hero__accent">{t('reviews.heroL2accent')}</span>
                {t('reviews.heroL2post')}
              </span>
              {t('reviews.heroL3') && <span className="rv-hero__line">{t('reviews.heroL3')}</span>}
            </h1>
            <p className="rv-hero__sub">{t('reviews.heroSub')}</p>
          </div>
        </section>

        {featuredTool && <FeaturedTool tool={featuredTool} />}

        <div className="rv-search-bar">
          <div className="container">
            <div className="rv-search-bar__wrap">
              <Search size={20} className="rv-search-bar__icon" />
              <input
                type="text"
                className="rv-search-bar__input"
                placeholder={t('reviews.searchPlaceholder')}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="rv-search-bar__clear" onClick={() => setSearchQuery('')}>
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        <ToolReviews searchQuery={searchQuery} />
        <GuideSection />
        <RecommendSection />
        <NewsletterSection />
      </main>
      <Footer />
      <ChatBubble />
    </>
  );
}
