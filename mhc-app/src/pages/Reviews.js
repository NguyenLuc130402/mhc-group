import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Target, Layers, DollarSign, ArrowRight, Mail, Search, X } from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import ToolReviews from '../components/ToolReviews/ToolReviews';
import Footer from '../components/Footer/Footer';
import { ToolLogo } from '../components/ToolReviews/ToolReviews';
import { fetchTools } from '../api/toolsApi';
import './Reviews.css';

const TIPS = [
  {
    icon: <Target size={22} />,
    title: 'Xác định nhu cầu trước',
    desc: 'Liệt kê rõ bài toán bạn cần giải — tính năng, quy mô team, ngân sách — trước khi so sánh bất kỳ công cụ nào.',
  },
  {
    icon: <Layers size={22} />,
    title: 'So sánh tính năng cốt lõi',
    desc: 'Đừng bị cuốn bởi tính năng phụ. Tập trung vào 3–5 tính năng quan trọng nhất với workflow của bạn.',
  },
  {
    icon: <DollarSign size={22} />,
    title: 'Tính tổng chi phí thực',
    desc: 'Xem xét phí theo user, phí tích hợp, và chi phí đào tạo — không chỉ giá gói cơ bản trên trang pricing.',
  },
];

function FeaturedTool({ tool }) {
  const navigate = useNavigate();
  return (
    <section className="rv-featured">
      <div className="container">
        <div className="rv-featured__inner">
          <div className="rv-featured__badge">
            <Star size={13} fill="#f59e0b" color="#f59e0b" /> Công cụ nổi bật trong tuần
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
                  <span className="rv-featured__count">({tool.reviews.toLocaleString()} đánh giá)</span>
                </div>
              </div>
            </div>
            <div className="rv-featured__right">
              <p className="rv-featured__desc">
                Được cộng đồng MHC bình chọn là công cụ đáng dùng nhất tuần này dựa trên rating, lượt đánh giá và mức độ phù hợp với thị trường Việt Nam.
              </p>
              <button className="rv-featured__btn" onClick={() => navigate(`/tool/${tool.id}`)}>
                Xem đánh giá chi tiết <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GuideSection() {
  return (
    <section className="rv-guide">
      <div className="container">
        <div className="rv-guide__header">
          <span className="section-label">Mẹo hữu ích</span>
          <h2 className="rv-guide__title">Hướng dẫn chọn công cụ phù hợp</h2>
          <p className="rv-guide__sub">Ba bước đơn giản giúp bạn không lãng phí tiền vào sai công cụ.</p>
        </div>
        <div className="rv-guide__grid">
          {TIPS.map((tip, i) => (
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

function NewsletterSection() {
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
            <h2 className="rv-newsletter__title">Nhận thông báo công cụ mới</h2>
            <p className="rv-newsletter__sub">Mỗi tuần một email — tổng hợp công cụ mới, deal tốt và đánh giá từ cộng đồng MHC.</p>
          </div>
          <div className="rv-newsletter__right">
            {sent ? (
              <p className="rv-newsletter__thanks">Cảm ơn! Chúng tôi sẽ liên hệ sớm.</p>
            ) : (
              <form className="rv-newsletter__form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="rv-newsletter__input"
                  placeholder="email@cua-ban.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="rv-newsletter__btn">
                  Đăng ký <ArrowRight size={15} />
                </button>
              </form>
            )}
            <p className="rv-newsletter__note">Không spam. Hủy đăng ký bất cứ lúc nào.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Reviews() {
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
        {featuredTool && <FeaturedTool tool={featuredTool} />}

        <div className="rv-search-bar">
          <div className="container">
            <div className="rv-search-bar__wrap">
              <Search size={18} className="rv-search-bar__icon" />
              <input
                type="text"
                className="rv-search-bar__input"
                placeholder="Tìm công cụ theo tên hoặc danh mục..."
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
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
